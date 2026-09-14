import os
import pandas as pd
from typing import List, Dict, Tuple
from core.matcher import MaterialMatcher

def run_benchmark():
    dataset_path = os.path.join(os.path.dirname(__file__), "data", "cpse_materials.csv")
    if not os.path.exists(dataset_path):
        print(f"Error: Dataset not found at {dataset_path}")
        return

    df = pd.read_csv(dataset_path)
    matcher = MaterialMatcher()

    print("\n=======================================================")
    print("      PRAGATI-MAT DUAL-STAGE BENCHMARK EVALUATOR       ")
    print("=======================================================")
    print(f"Total Records Ingested: {len(df)}")
    print(f"Unique Ground-Truth Clusters: {df['cluster_id'].nunique()}\n")

    # 1. EVALUATE TRUE POSITIVES (Items from same cluster across CPSEs)
    tp = 0
    fn = 0
    total_positive_pairs = 0

    grouped = df.groupby("cluster_id")
    for cid, group in grouped:
        records = group.to_dict(orient="records")
        for i in range(len(records)):
            for j in range(i + 1, len(records)):
                total_positive_pairs += 1
                res = matcher.evaluate_pair(records[i], records[j])
                if res["status"] == "AUTO_MATCHED":
                    tp += 1
                else:
                    fn += 1

    # 2. EVALUATE FALSE POSITIVES (Items from DIFFERENT clusters - Hard Guard Trap)
    fp = 0
    tn = 0
    total_negative_pairs = 0

    clusters = list(grouped.groups.keys())
    # Cross-evaluate across adjacent distinct clusters
    for i in range(min(50, len(clusters) - 1)):
        group_a = df[df["cluster_id"] == clusters[i]].to_dict(orient="records")
        group_b = df[df["cluster_id"] == clusters[i + 1]].to_dict(orient="records")

        for item_a in group_a:
            for item_b in group_b:
                total_negative_pairs += 1
                res = matcher.evaluate_pair(item_a, item_b)
                if res["status"] == "AUTO_MATCHED":
                    fp += 1
                else:
                    tn += 1

    # 3. COMPUTE SCIENTIFIC METRICS
    precision = (tp / (tp + fp)) * 100 if (tp + fp) > 0 else 0.0
    recall = (tp / (tp + fn)) * 100 if (tp + fn) > 0 else 0.0
    f1_score = (2 * precision * recall) / (precision + recall) if (precision + recall) > 0 else 0.0
    false_positive_rate = (fp / (fp + tn)) * 100 if (fp + tn) > 0 else 0.0

    print("--- BENCHMARK RESULTS ---")
    print(f"Identical Pairs Evaluated (Ground Truth Match): {total_positive_pairs}")
    print(f"Conflicting Pairs Evaluated (Safety Hard Guards): {total_negative_pairs}")
    print("-------------------------------------------------------")
    print(f"True Positives (Auto-Matched)      : {tp}")
    print(f"False Negatives (Sent to Review)   : {fn}")
    print(f"False Positives (Critical Error)   : {fp}")
    print(f"True Negatives (Correctly Guarded) : {tn}")
    print("-------------------------------------------------------")
    print(f"Engine Precision                   : {precision:.2f}%")
    print(f"Engine Recall                      : {recall:.2f}%")
    print(f"Harmonization F1-Score             : {f1_score:.2f}%")
    print(f"Critical False Positive Rate       : {false_positive_rate:.2f}% (Target: 0.00%)")
    print("=======================================================\n")

if __name__ == "__main__":
    run_benchmark()