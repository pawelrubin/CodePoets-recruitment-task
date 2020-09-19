from io import BytesIO
from typing import Counter, Dict, List, Union

from fastapi import APIRouter, File, UploadFile, Form
from pandas import read_table
from pydantic import BaseModel

router = APIRouter()

Number = Union[float, int]


def significant_digits_stats(numbers: List[Number]) -> Dict[str, float]:
    total = len(numbers)
    multiset = Counter([p for i in numbers if (p := str(i)[0]) != "0"])
    print(multiset)
    return {k: v / total for k, v in sorted(multiset.items())}


@router.post("/test_file/")
async def benford_test_file(column: str = Form(...), file: UploadFile = File(...)):
    content = await file.read()
    data = read_table(BytesIO(content), usecols=[column])[column].tolist()
    stats = significant_digits_stats(data)
    return {"filename": file.filename, "column": column, "stats": stats}


class DataItem(BaseModel):
    numbers: List[Number]


@router.post("/test_data/")
async def benford_test_data(data: DataItem):
    return {"stats": significant_digits_stats(data.numbers)}