"""MongoDB Pydantic Model. Based on https://github.com/tiangolo/fastapi/issues/1515"""
from __future__ import annotations

from datetime import datetime
from typing import Any, Callable, Dict, Iterator, Optional, Type, TypeVar

from bson.objectid import ObjectId
from bson.errors import InvalidId
from pydantic import BaseModel, BaseConfig

_T = TypeVar("_T")


class OID(str):
    @classmethod
    def __get_validators__(cls) -> Iterator[Callable[[Any], ObjectId]]:
        yield cls.validate

    @classmethod
    def validate(cls, v: Any) -> ObjectId:
        try:
            return ObjectId(str(v))
        except InvalidId as err:
            raise ValueError(f"Not a valid ObjectId: {v}") from err


class MongoModel(BaseModel):
    class Config(BaseConfig):
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),
            ObjectId: lambda oid: str(oid),  # pylint: disable=unnecessary-lambda
        }

    @classmethod
    def from_mongo(cls: Type[_T], data: Dict["str", Any]) -> _T:
        """Creates Model instance from a python dictionary."""
        return cls(**dict(data, id=data.pop("_id", None)))

    def mongo(self, **kwargs: Any) -> Dict[str, Any]:
        exclude_unset = kwargs.pop("exclude_unset", True)
        by_alias = kwargs.pop("by_alias", True)

        parsed = self.dict(
            exclude_unset=exclude_unset,
            by_alias=by_alias,
            **kwargs,
        )

        # Mongo uses `_id` as default key. We should stick to that as well.
        if "_id" not in parsed and "id" in parsed:
            parsed["_id"] = parsed.pop("id")

        return parsed
