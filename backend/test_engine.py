import pandas as pd
from core.matcher import MaterialMatcher

matcher = MaterialMatcher()
df = pd.read_csv("data/cpse_materials.csv")

# Test 1: Ground-truth cluster match (ONGC vs IOCL)
sample_cluster = df[df["cluster_id"] == 1]
item_ongc = sample_cluster[sample_cluster["cpse"] == "ONGC"].iloc[0].to_dict()
item_iocl = sample_cluster[sample_cluster["cpse"] == "IOCL"].iloc[0].to_dict()

result_true = matcher.evaluate_pair(item_ongc, item_iocl)
print("\n--- TEST 1: Identical Physical Item Across CPSEs ---")
print(f"Item A: {item_ongc['raw_description']}")
print(f"Item B: {item_iocl['raw_description']}")
print(f"Extracted A: {result_true['features_a']}")
print(f"Extracted B: {result_true['features_b']}")
print(f"Confidence: {result_true['confidence']}% | Status: {result_true['status']}")
print(f"Reason: {result_true['reason']}")

# Test 2: Hard-guard trap test (Force dimension conflict)
trap_item = item_iocl.copy()
trap_item["raw_description"] = "VALVE GLOBE, 4\", 600#, AISI 316, BW ENDS"

result_trap = matcher.evaluate_pair(item_ongc, trap_item)
print("\n--- TEST 2: Hard-Guard Trap (Mismatched Dimension 3\" vs 4\") ---")
print(f"Item A: {item_ongc['raw_description']}")
print(f"Item B: {trap_item['raw_description']}")
print(f"Confidence: {result_trap['confidence']}% | Status: {result_trap['status']}")
print(f"Reason: {result_trap['reason']}")