from io import BytesIO
from typing import Any, Counter, Dict, List, Optional, Union, cast

from fastapi.routing import APIRouter
from fastapi.param_functions import File
from fastapi.datastructures import UploadFile
from pandas import read_table

from app.models import DataItem, BenfordStats
from app.types import DIGITS
from app.helpers import merge_dicts

router = APIRouter()

INVALID_DATA_TRESHOLD = 0.8


def significant_digit(num: Any) -> Optional[str]:
    """Returns the most significant digit, ignoring zeros."""
    stripped = str(num).replace(".", "").lstrip(" 0")
    return stripped[0] if stripped.isnumeric() else None


def type_guard_and_parse(lst: List[Any]) -> Optional[List[str]]:
    total = len(lst)
    result = [digit for e in lst if (digit := significant_digit(e))]
    return result if (len(result) / total) > INVALID_DATA_TRESHOLD else None


def significant_digits_stats(digits: List[str]) -> Dict[str, float]:
    total = len(digits)
    multiset = Counter(digits)
    initial = {d: 0.0 for d in DIGITS}
    result = {k: v / total for k, v in sorted(multiset.items())}
    return merge_dicts(initial, result)


@router.post("/test_file/")
async def benford_test_file(file: UploadFile = File(...)) -> BenfordStats:
    content = cast(bytes, await file.read())
    df = read_table(BytesIO(content))
    return BenfordStats(
        stats={
            column: significant_digits_stats(lst)
            for column in df.columns
            if (lst := type_guard_and_parse(df[column].to_list()))
        }
    )


@router.post("/test_data/", response_model=BenfordStats)
async def benford_test_data(data: DataItem) -> BenfordStats:
    return BenfordStats(stats=significant_digits_stats(data.numbers))
