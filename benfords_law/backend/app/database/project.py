from datetime import datetime
from typing import Optional

from pydantic import Field

from app.database.mongo_model import MongoModel
from app.models import BenfordStats


class Project(MongoModel):
    stats: BenfordStats = Field(...)
    filename: str = Field(...)
    timestamp: datetime = Field(default_factory=datetime.now)
    author: Optional[str] = Field()
