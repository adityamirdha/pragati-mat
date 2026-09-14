from typing import Dict, Any, List, Optional
from rapidfuzz import fuzz
from core.lexicon import extract_canonical_features

class MaterialMatcher:
    def __init__(self):
        self.weights = {
            "item_type": 0.35,
            "dimension": 0.25,
            "pressure_class": 0.20,
            "material": 0.15,
            "connection": 0.05
        }

    def evaluate_pair(self, item_a: Dict[str, Any], item_b: Dict[str, Any]) -> Dict[str, Any]:
        raw_desc_a = item_a.get("raw_description", "")
        raw_desc_b = item_b.get("raw_description", "")

        feat_a = extract_canonical_features(raw_desc_a)
        feat_b = extract_canonical_features(raw_desc_b)

        # 1. DETERMINISTIC HARD GUARDS (Zero Tolerance for Engineering Conflicts)
        if feat_a["item_type"] and feat_b["item_type"] and feat_a["item_type"] != feat_b["item_type"]:
            return self._build_result(0.0, "REJECTED", "Critical Mismatch: Item types are incompatible.", feat_a, feat_b)

        if feat_a["dimension"] and feat_b["dimension"] and feat_a["dimension"] != feat_b["dimension"]:
            return self._build_result(0.0, "REJECTED", f"Dimension Conflict: {feat_a['dimension']} vs {feat_b['dimension']}", feat_a, feat_b)

        if feat_a["pressure_class"] and feat_b["pressure_class"] and feat_a["pressure_class"] != feat_b["pressure_class"]:
            return self._build_result(0.0, "REJECTED", f"Pressure Conflict: {feat_a['pressure_class']} vs {feat_b['pressure_class']}", feat_a, feat_b)

        if feat_a["material"] and feat_b["material"] and feat_a["material"] != feat_b["material"]:
            return self._build_result(0.0, "REJECTED", f"Material Conflict: {feat_a['material']} vs {feat_b['material']}", feat_a, feat_b)

        # 2. ATTRIBUTE MATCH CALCULATION
        matched_weight = 0.0
        active_weight = 0.0
        critical_all_match = True

        for attr, weight in self.weights.items():
            val_a = feat_a.get(attr)
            val_b = feat_b.get(attr)

            if val_a and val_b:
                active_weight += weight
                if val_a == val_b:
                    matched_weight += weight
                else:
                    if attr != "connection":
                        critical_all_match = False
            elif val_a or val_b:
                # One item is missing an attribute
                active_weight += weight
                if attr in ["dimension", "pressure_class", "material"]:
                    critical_all_match = False

        attribute_score = (matched_weight / active_weight) if active_weight > 0 else 0.0
        raw_fuzzy = fuzz.token_sort_ratio(raw_desc_a, raw_desc_b) / 100.0

        # 3. CONFIDENCE DETERMINATION
        if critical_all_match and attribute_score >= 0.95:
            # 100% match on all key specs: syntax variations (hyphens/commas) should not penalize
            final_confidence = 96.0 + (raw_fuzzy * 4.0)
        elif attribute_score > 0.70:
            final_confidence = (attribute_score * 85.0) + (raw_fuzzy * 15.0)
        else:
            final_confidence = (attribute_score * 50.0) + (raw_fuzzy * 50.0)

        final_confidence = round(min(100.0, final_confidence), 2)

        # 4. CONFIDENCE ROUTING TIERS
        if final_confidence >= 90.0:
            status = "AUTO_MATCHED"
            reason = "High precision match across all critical engineering attributes."
        elif final_confidence >= 65.0:
            status = "REVIEW_REQUIRED"
            reason = "Partial attribute overlap. Requires human catalog manager verification."
        else:
            status = "UNIQUE"
            reason = "Low attribute similarity. Distinct material specifications."

        return self._build_result(final_confidence, status, reason, feat_a, feat_b)

    def _build_result(self, confidence: float, status: str, reason: str, feat_a: dict, feat_b: dict) -> Dict[str, Any]:
        return {
            "confidence": confidence,
            "status": status,
            "reason": reason,
            "features_a": feat_a,
            "features_b": feat_b
        }