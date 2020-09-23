from typing import Dict, Literal, NewType

from pydantic.main import BaseModel


Digit = Literal["1", "2", "3", "4", "5", "6", "7", "8", "9"]
SignificantDigitStats = Dict[Digit, float]
Column = NewType("Column", str)


class ColumnStats(BaseModel):
    values: SignificantDigitStats
    obey: bool


BenfordStats = Dict[Column, ColumnStats]
BenfordObey = Dict[Column, bool]
