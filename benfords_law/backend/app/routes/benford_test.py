from io import BytesIO
from typing import Any, Counter, Dict, List, Union, cast

from fastapi.routing import APIRouter
from fastapi.param_functions import File
from fastapi.datastructures import UploadFile
from pandas import read_table

from app.models import DataItem, BenfordStats
from app.types import Number

router = APIRouter()


def type_guard(lst: List[Any]) -> bool:
    return all(str(e).isnumeric() for e in lst)


def significant_digits_stats(numbers: List[Union[Number, str]]) -> Dict[str, float]:
    total = len(numbers)
    multiset = Counter([str(int(i)) for i in numbers])
    return {k: v / total for k, v in sorted(multiset.items())}


@router.post("/test_file/")
async def benford_test_file(file: UploadFile = File(...)) -> BenfordStats:
    content = cast(bytes, await file.read())
    df = read_table(BytesIO(content))
    return BenfordStats(
        stats={
            column: significant_digits_stats(lst)
            for column in df.columns
            if type_guard(lst := df[column].to_list())
        }
    )


@router.post("/test_data/", response_model=BenfordStats)
async def benford_test_data(data: DataItem) -> BenfordStats:
    return BenfordStats(stats=significant_digits_stats(data.numbers))
