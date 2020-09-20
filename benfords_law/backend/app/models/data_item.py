from typing import List

from pydantic import BaseModel

from app.types import Number


class DataItem(BaseModel):
    numbers: List[Number]
