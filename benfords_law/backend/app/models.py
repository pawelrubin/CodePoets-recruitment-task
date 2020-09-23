from pydantic import BaseModel, ValidationError, validator

from app.types import BenfordStats


class BenfordStatsResponse(BaseModel):
    stats: BenfordStats

    @validator("stats")
    def at_least_one_valid_column(cls, v: BenfordStats) -> BenfordStats:
        # pylint: disable=no-self-argument
        # https://github.com/samuelcolvin/pydantic/issues/568
        if len(v) == 0:
            raise ValidationError(
                "Must have at least one valid column.", cls  # type: ignore
            )
        return v
