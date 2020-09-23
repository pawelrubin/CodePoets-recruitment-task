from functools import lru_cache
from io import BytesIO
from typing import Any, Counter, Dict, List, Optional, cast, get_args

from fastapi.routing import APIRouter
from fastapi.param_functions import File
from fastapi.datastructures import UploadFile
from fastapi.exceptions import HTTPException
from pandas import read_table

from app.models import BenfordStatsResponse
from app.types import Digit
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
    initial = {d: 0.0 for d in get_args(Digit)}
    result = {k: v / total for k, v in sorted(multiset.items())}
    return merge_dicts(initial, result)


@router.post("/test_file/")
async def benford_test_file(file: UploadFile = File(...)) -> BenfordStatsResponse:
    content = cast(bytes, await file.read())
    try:
        df = read_table(BytesIO(content))
    except Exception as err:
        raise HTTPException(status_code=400, detail=str(err)) from err
    return BenfordStatsResponse(
        stats={
            column: significant_digits_stats(lst)
            for column in df.columns
            if (lst := type_guard_and_parse(df[column].to_list()))
        }
    )


@lru_cache
def get_benford_assertion() -> Dict[str, float]:
    df = read_table("/app/data/census_2009b")
    # cast is okay since we know the structure of data
    parsed = cast(List[str], type_guard_and_parse(df["7_2009"].to_list()))
    return significant_digits_stats(parsed)


@router.get("/assert_stats/")
async def benford_test_data() -> Dict[str, float]:
    return get_benford_assertion()
