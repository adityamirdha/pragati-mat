import re
from typing import Optional, Dict

DIMENSION_MAP: Dict[str, str] = {
    '1/2"': '15MM', '1/2IN': '15MM', '0.5"': '15MM', 'DN15': '15MM', '15NB': '15MM',
    '3/4"': '20MM', '3/4IN': '20MM', '0.75"': '20MM', 'DN20': '20MM', '20NB': '20MM',
    '1"': '25MM', '1IN': '25MM', '1INCH': '25MM', 'DN25': '25MM', '25NB': '25MM',
    '1.5"': '40MM', '1-1/2"': '40MM', '1.5IN': '40MM', 'DN40': '40MM', '40NB': '40MM',
    '2"': '50MM', '2IN': '50MM', 'DN50': '50MM', '50NB': '50MM',
    '3"': '80MM', '3IN': '80MM', 'DN80': '80MM', '80NB': '80MM',
    '4"': '100MM', '4IN': '100MM', 'DN100': '100MM', '100NB': '100MM',
    '6"': '150MM', '6IN': '150MM', 'DN150': '150MM', '150NB': '150MM', '150MM': '150MM',
    '8"': '200MM', '8IN': '200MM', 'DN200': '200MM', '200NB': '200MM',
    '10"': '250MM', '10IN': '250MM', 'DN250': '250MM', '250NB': '250MM',
    '12"': '300MM', '12IN': '300MM', 'DN300': '300MM', '300NB': '300MM'
}

PRESSURE_MAP: Dict[str, str] = {
    '150#': 'CLASS 150', '150LB': 'CLASS 150', '150LBS': 'CLASS 150', 'CL150': 'CLASS 150', 'CLASS 150': 'CLASS 150', 'PN20': 'CLASS 150',
    '300#': 'CLASS 300', '300LB': 'CLASS 300', '300LBS': 'CLASS 300', 'CL300': 'CLASS 300', 'CLASS 300': 'CLASS 300', 'PN50': 'CLASS 300',
    '600#': 'CLASS 600', '600LB': 'CLASS 600', '600LBS': 'CLASS 600', 'CL600': 'CLASS 600', 'CLASS 600': 'CLASS 600', 'PN100': 'CLASS 600',
    '800#': 'CLASS 800', '800LB': 'CLASS 800', 'CL800': 'CLASS 800', 'CLASS 800': 'CLASS 800',
    '1500#': 'CLASS 1500', 'CL1500': 'CLASS 1500', 'CLASS 1500': 'CLASS 1500'
}

MATERIAL_MAP: Dict[str, str] = {
    'WCB': 'ASTM A216 WCB', 'ASTM A216 WCB': 'ASTM A216 WCB', 'CAST CS': 'ASTM A216 WCB',
    'A105': 'ASTM A105', 'ASTM A105': 'ASTM A105', 'FORGED CS': 'ASTM A105',
    'SS316': 'SS 316', 'AISI 316': 'SS 316', '316SS': 'SS 316',
    'SS304': 'SS 304', 'AISI 304': 'SS 304', '304SS': 'SS 304'
}

CONNECTION_MAP: Dict[str, str] = {
    'RF': 'RAISED FACE', 'FLGD RF': 'RAISED FACE', 'RAISED FACE': 'RAISED FACE',
    'BW': 'BUTT WELD', 'BW ENDS': 'BUTT WELD', 'BUTTWELD': 'BUTT WELD',
    'RTJ': 'RING TYPE JOINT', 'SW': 'SOCKET WELD'
}

ITEM_CATEGORIES = [
    'VALVE BALL', 'VALVE GATE', 'VALVE GLOBE', 'VALVE CHECK',
    'FLANGE WELD NECK', 'GASKET SPIRAL WOUND'
]

def extract_canonical_features(text: str) -> Dict[str, Optional[str]]:
    raw = text.upper()
    # Punctuation to space normalization
    normalized = re.sub(r'[,;\-\/]', ' ', raw)
    tokens = normalized.split()

    features = {
        "item_type": None,
        "dimension": None,
        "pressure_class": None,
        "material": None,
        "connection": None
    }

    # Item Type
    for cat in ITEM_CATEGORIES:
        if all(word in normalized for word in cat.split()):
            features["item_type"] = cat
            break

    # Dimension
    for variant, canonical in sorted(DIMENSION_MAP.items(), key=lambda x: len(x[0]), reverse=True):
        if variant in tokens or variant in normalized.split():
            features["dimension"] = canonical
            break

    # Pressure Class
    for variant, canonical in sorted(PRESSURE_MAP.items(), key=lambda x: len(x[0]), reverse=True):
        if variant in tokens or variant in normalized.split():
            features["pressure_class"] = canonical
            break

    # Metallurgy
    for variant, canonical in sorted(MATERIAL_MAP.items(), key=lambda x: len(x[0]), reverse=True):
        if variant in normalized:
            features["material"] = canonical
            break

    # Connection
    for variant, canonical in sorted(CONNECTION_MAP.items(), key=lambda x: len(x[0]), reverse=True):
        if variant in tokens or variant in normalized:
            features["connection"] = canonical
            break

    return features