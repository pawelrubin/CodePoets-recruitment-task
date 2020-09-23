from typing import Dict, Literal, NewType


Digit = Literal["1", "2", "3", "4", "5", "6", "7", "8", "9"]
SignificantDigitStats = Dict[Digit, float]
Column = NewType("Column", str)
BenfordStats = Dict[Column, SignificantDigitStats]
