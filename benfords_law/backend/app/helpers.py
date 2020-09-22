from typing import Dict, TypeVar


_KT = TypeVar("_KT")
_VT = TypeVar("_VT")


def merge_dicts(d1: Dict[_KT, _VT], d2: Dict[_KT, _VT]) -> Dict[_KT, _VT]:
    return {**d1, **d2}
