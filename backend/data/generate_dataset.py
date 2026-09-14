import csv
import random
from typing import List, Dict

CATEGORIES = [
    {"type": "VALVE BALL", "unspsc": "40141607", "base_price": 45000},
    {"type": "VALVE GATE", "unspsc": "40141611", "base_price": 60000},
    {"type": "VALVE GLOBE", "unspsc": "40141612", "base_price": 52000},
    {"type": "VALVE CHECK", "unspsc": "40141604", "base_price": 38000},
    {"type": "FLANGE WELD NECK", "unspsc": "40173308", "base_price": 12000},
    {"type": "GASKET SPIRAL WOUND", "unspsc": "31181504", "base_price": 3500},
]

DIMENSIONS = [
    {"canon": "15MM", "ongc": "1/2IN", "iocl": '1/2"', "bpcl": "DN15"},
    {"canon": "25MM", "ongc": "1IN", "iocl": '1"', "bpcl": "25NB"},
    {"canon": "50MM", "ongc": "2IN", "iocl": '2"', "bpcl": "50NB"},
    {"canon": "80MM", "ongc": "3IN", "iocl": '3"', "bpcl": "DN80"},
    {"canon": "100MM", "ongc": "4IN", "iocl": '4"', "bpcl": "100NB"},
    {"canon": "150MM", "ongc": "6IN", "iocl": '6"', "bpcl": "150MM"},
    {"canon": "200MM", "ongc": "8IN", "iocl": '8"', "bpcl": "200NB"},
]

PRESSURE_CLASSES = [
    {"canon": "CLASS 150", "ongc": "CL150", "iocl": "150#", "bpcl": "150LBS"},
    {"canon": "CLASS 300", "ongc": "CL300", "iocl": "300#", "bpcl": "300LBS"},
    {"canon": "CLASS 600", "ongc": "CL600", "iocl": "600#", "bpcl": "600LBS"},
    {"canon": "CLASS 800", "ongc": "CL800", "iocl": "800#", "bpcl": "800LB"},
]

MATERIALS = [
    {"canon": "ASTM A216 WCB", "ongc": "WCB", "iocl": "ASTM A216 WCB", "bpcl": "CAST CS"},
    {"canon": "ASTM A105", "ongc": "A105", "iocl": "ASTM A105", "bpcl": "FORGED CS"},
    {"canon": "SS 316", "ongc": "SS316", "iocl": "AISI 316", "bpcl": "316SS"},
    {"canon": "SS 304", "ongc": "SS304", "iocl": "304SS", "bpcl": "SS304"},
]

ENDS = [
    {"canon": "RAISED FACE", "ongc": "RF", "iocl": "FLGD RF", "bpcl": "RAISED FACE"},
    {"canon": "BUTT WELD", "ongc": "BW", "iocl": "BW ENDS", "bpcl": "BUTTWELD"},
]

LOCATIONS = {
    "ONGC": ["Hazira Plant", "Mumbai High Offshore", "Uran Trombay", "Ankleshwar"],
    "IOCL": ["Gujarat Refinery", "Panipat Refinery", "Mathura Refinery", "Paradip"],
    "BPCL": ["Mumbai Refinery", "Kochi Refinery", "Bina Refinery"]
}

def generate_records(num_clusters: int = 250) -> List[Dict]:
    dataset = []
    global_id = 100001

    for cluster_id in range(1, num_clusters + 1):
        cat = random.choice(CATEGORIES)
        dim = random.choice(DIMENSIONS)
        press = random.choice(PRESSURE_CLASSES)
        mat = random.choice(MATERIALS)
        conn = random.choice(ENDS)

        # 1. ONGC Catalog Style (Truncated, Hyphenated, Abbreviated)
        type_token = cat["type"].replace(" ", "-")
        ongc_desc = f"{type_token}-{conn['ongc']}-{dim['ongc']}-{press['ongc']}-{mat['ongc']}"
        dataset.append({
            "item_id": f"ONGC-{global_id}",
            "cpse": "ONGC",
            "cluster_id": cluster_id,
            "raw_description": ongc_desc,
            "location": random.choice(LOCATIONS["ONGC"]),
            "stock_qty": random.randint(0, 150),
            "unit_price_inr": cat["base_price"] + random.randint(-2000, 3000),
            "target_unspsc": cat["unspsc"]
        })
        global_id += 1

        # 2. IOCL Catalog Style (Verbose, Comma-Separated, Detailed)
        iocl_desc = f"{cat['type']}, {dim['iocl']}, {press['iocl']}, {mat['iocl']}, {conn['iocl']}"
        dataset.append({
            "item_id": f"IOCL-{global_id}",
            "cpse": "IOCL",
            "cluster_id": cluster_id,
            "raw_description": iocl_desc,
            "location": random.choice(LOCATIONS["IOCL"]),
            "stock_qty": random.randint(0, 150),
            "unit_price_inr": cat["base_price"] + random.randint(-2000, 3000),
            "target_unspsc": cat["unspsc"]
        })
        global_id += 1

        # 3. BPCL Catalog Style (Space-Separated, Metric Mixed)
        bpcl_desc = f"{cat['type']} {dim['bpcl']} {press['bpcl']} {mat['bpcl']} {conn['bpcl']}"
        dataset.append({
            "item_id": f"BPCL-{global_id}",
            "cpse": "BPCL",
            "cluster_id": cluster_id,
            "raw_description": bpcl_desc,
            "location": random.choice(LOCATIONS["BPCL"]),
            "stock_qty": random.randint(0, 150),
            "unit_price_inr": cat["base_price"] + random.randint(-2000, 3000),
            "target_unspsc": cat["unspsc"]
        })
        global_id += 1

    return dataset

if __name__ == "__main__":
    records = generate_records(num_clusters=250)
    output_path = "backend/data/cpse_materials.csv"
    with open(output_path, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=records[0].keys())
        writer.writeheader()
        writer.writerows(records)
    print(f"Generated {len(records)} items across 250 ground-truth clusters at {output_path}")