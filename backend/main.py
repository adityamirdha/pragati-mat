import io
import os
import random
from typing import Any, Dict, List, Optional
from fastapi import FastAPI, File, HTTPException, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import pandas as pd

from core.lexicon import extract_canonical_features
from core.matcher import MaterialMatcher

app = FastAPI(
    title="Pragati-Mat Engine",
    description="MoP&NG CPSE Material Standardization & Harmonization API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

matcher = MaterialMatcher()
DATASET_PATH = os.path.join(os.path.dirname(__file__), "data", "cpse_materials.csv")

def load_data() -> pd.DataFrame:
    if not os.path.exists(DATASET_PATH):
        raise HTTPException(status_code=404, detail="Dataset not found. Run generate_dataset.py first.")
    return pd.read_csv(DATASET_PATH).fillna("")

class ItemComparisonRequest(BaseModel):
    description_a: str
    description_b: str

class ExportRequest(BaseModel):
    approved_cluster_ids: List[int]

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "Pragati-Mat Core API"}

@app.get("/api/materials")
def get_materials(
    cpse: Optional[str] = None,
    limit: int = 50,
    offset: int = 0
):
    df = load_data()
    if cpse:
        df = df[df["cpse"].str.upper() == cpse.upper()]
    
    total = len(df)
    items = df.iloc[offset : offset + limit].to_dict(orient="records")
    return {"total": total, "items": items}

@app.post("/api/match-pair")
def match_pair(payload: ItemComparisonRequest):
    result = matcher.evaluate_pair(
        {"raw_description": payload.description_a},
        {"raw_description": payload.description_b}
    )
    return result

@app.get("/api/harmonize-batch")
def harmonize_batch(limit_clusters: int = 12, shuffle: bool = True):
    df = load_data()
    all_clusters = [int(cid) for cid in df["cluster_id"].unique()]
    
    if shuffle:
        random.shuffle(all_clusters)
        
    cluster_ids = all_clusters[:limit_clusters]
    reconciliation_records = []

    for cid in cluster_ids:
        group = df[df["cluster_id"] == cid]
        if len(group) >= 2:
            base_item = group.iloc[0].to_dict()
            compare_item = group.iloc[1].to_dict()

            eval_res = matcher.evaluate_pair(base_item, compare_item)
            reconciliation_records.append({
                "cluster_id": int(cid),
                "item_a": base_item,
                "item_b": compare_item,
                "confidence": eval_res["confidence"],
                "status": eval_res["status"],
                "reason": eval_res["reason"],
                "features_a": eval_res["features_a"],
                "features_b": eval_res["features_b"]
            })

    return {
        "clusters_evaluated": len(reconciliation_records),
        "matches": reconciliation_records
    }

@app.get("/api/surplus-analytics")
def get_surplus_analytics():
    df = load_data()
    grouped = df.groupby("cluster_id")
    
    total_potential_savings = 0
    exchange_candidates = []

    for cid, group in grouped:
        if len(group) > 1 and group["stock_qty"].sum() > 0:
            holding_cpse_count = group[group["stock_qty"] > 0]["cpse"].nunique()
            if holding_cpse_count > 1:
                stock_values = group["stock_qty"] * group["unit_price_inr"]
                cluster_locked_capital = int(stock_values.sum())
                total_potential_savings += cluster_locked_capital

                canonical_specs = extract_canonical_features(group.iloc[0]["raw_description"])
                exchange_candidates.append({
                    "cluster_id": int(cid),
                    "material_spec": canonical_specs["item_type"] or "INDUSTRIAL SPARE",
                    "dimension": canonical_specs["dimension"],
                    "class": canonical_specs["pressure_class"],
                    "total_surplus_units": int(group["stock_qty"].sum()),
                    "total_locked_capital_inr": cluster_locked_capital,
                    "holdings": group[["cpse", "location", "stock_qty", "unit_price_inr"]].to_dict(orient="records")
                })

    return {
        "total_clusters_with_cross_stock": len(exchange_candidates),
        "estimated_procurement_savings_inr": total_potential_savings,
        "exchange_opportunities": exchange_candidates[:15]
    }

@app.post("/api/upload-catalog")
async def upload_catalog(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only standard CSV files are accepted.")

    contents = await file.read()
    try:
        upload_df = pd.read_csv(io.BytesIO(contents)).fillna("")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read CSV: {str(e)}")

    desc_col = None
    for candidate in ["raw_description", "description", "item_description", "material_desc", "item_details", "MAKTX"]:
        matches = [col for col in upload_df.columns if col.strip().lower() == candidate.lower()]
        if matches:
            desc_col = matches[0]
            break

    if not desc_col:
        raise HTTPException(
            status_code=400,
            detail=f"Could not find description column. Provided headers: {list(upload_df.columns)}"
        )

    parsed_items = []
    for idx, row in upload_df.iterrows():
        raw_text = str(row[desc_col]).strip()
        if not raw_text:
            continue
        specs = extract_canonical_features(raw_text)
        parsed_items.append({
            "line_no": idx + 1,
            "raw_description": raw_text,
            "cpse": row.get("cpse", "EXTERNAL_IMPORT"),
            "location": row.get("location", "Plant Yard"),
            "specs": specs
        })

    discovered_pairs = []
    for i in range(len(parsed_items)):
        for j in range(i + 1, min(i + 15, len(parsed_items))):
            match_res = matcher.evaluate_pair(parsed_items[i], parsed_items[j])
            if match_res["status"] in ["AUTO_MATCHED", "REVIEW_REQUIRED"]:
                discovered_pairs.append({
                    "item_a": parsed_items[i],
                    "item_b": parsed_items[j],
                    "confidence": match_res["confidence"],
                    "status": match_res["status"],
                    "reason": match_res["reason"]
                })

    return {
        "filename": file.filename,
        "total_rows_parsed": len(parsed_items),
        "potential_duplicates_found": len(discovered_pairs),
        "preview_items": parsed_items[:6],
        "matches": discovered_pairs[:10]
    }

@app.post("/api/export-master")
def export_master(payload: ExportRequest):
    """
    Generates an official MoP&NG Standard Unified Material Master CSV for approved items.
    """
    df = load_data()
    
    # If specific clusters approved, filter to them; otherwise export all active harmonized clusters
    if payload.approved_cluster_ids:
        target_df = df[df["cluster_id"].isin(payload.approved_cluster_ids)]
    else:
        target_df = df

    rows = []
    for cid, group in target_df.groupby("cluster_id"):
        rep = group.iloc[0]
        specs = extract_canonical_features(rep["raw_description"])
        
        # Build clean canonical title
        canonical_name = f"{specs['item_type'] or 'EQUIPMENT'} | {specs['dimension'] or 'N/A'} | {specs['pressure_class'] or 'N/A'} | {specs['material'] or 'N/A'} | {specs['connection'] or 'N/A'}"
        
        legacy_keys = "; ".join(group["item_id"].tolist())
        descriptions = " // ".join(group["raw_description"].tolist())
        total_qty = int(group["stock_qty"].sum())

        rows.append({
            "Unified_Material_Code": f"UMM-{rep['target_unspsc']}-{cid:05d}",
            "UNSPSC_Code": rep["target_unspsc"],
            "Standard_Canonical_Nomenclature": canonical_name,
            "Item_Category": specs["item_type"] or "GENERAL",
            "Normalized_Size": specs["dimension"] or "N/A",
            "Pressure_Rating": specs["pressure_class"] or "N/A",
            "Material_Grade": specs["material"] or "N/A",
            "End_Connection": specs["connection"] or "N/A",
            "CPSE_Legacy_Keys_Mapped": legacy_keys,
            "Aggregate_Inventory_Holdings": total_qty,
            "Source_Descriptions_Reconciled": descriptions
        })

    export_df = pd.DataFrame(rows)
    stream = io.StringIO()
    export_df.to_csv(stream, index=False)
    
    response = StreamingResponse(
        iter([stream.getvalue()]),
        media_type="text/csv"
    )
    response.headers["Content-Disposition"] = "attachment; filename=Pragati_Mat_Unified_Master.csv"
    return response