from functools import lru_cache
import math
from io import BytesIO
from logging import getLogger
from typing import Any, Counter, Dict, List, Optional, cast, get_args

from pandas import read_csv, read_table, read_excel, DataFrame

from app.helpers import merge_dicts
from app.types import Digit, SignificantDigitStats

INVALID_DATA_TRESHOLD = 0.8
CHI_SQUARED_CRITICAL = 0.1551


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


def does_obey_benford(stats: SignificantDigitStats) -> bool:
    return (
        sum(
            math.pow(a - b, 2) / b
            for a, b in zip(stats.values(), get_benford_assertion().values())
        )
        < CHI_SQUARED_CRITICAL
    )


def get_data_frame(content: bytes) -> Optional[DataFrame]:
    """
    Returns DataFrame object based on the biggest number of columns.

    This is due to pandas inability to automatically distinguish
    between data formats.
    """

    def try_strategy(strategy) -> Optional[DataFrame]:
        try:
            return strategy(BytesIO(content))
        except Exception as err:
            getLogger("fastapi").error(err)
            return None

    df_table = try_strategy(read_table)
    df_csv = try_strategy(read_csv)
    df_excel = try_strategy(read_excel)
    by_length = sorted(
        [df_table, df_csv, df_excel],
        key=lambda df: len(df.columns) if df is not None else 0,
        reverse=True,
    )
    return by_length[0] if len(by_length) > 0 else None


@lru_cache
def get_benford_assertion() -> Dict[str, float]:
    df = read_table("/app/data/census_2009b")
    # cast is okay since we know the structure of data
    parsed = cast(List[str], type_guard_and_parse(df["7_2009"].to_list()))
    return significant_digits_stats(parsed)
