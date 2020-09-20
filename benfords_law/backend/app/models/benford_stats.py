from typing import Dict

from pydantic import BaseModel


class BenfordStats(BaseModel):
    stats: Dict[str, Dict[str, float]]
