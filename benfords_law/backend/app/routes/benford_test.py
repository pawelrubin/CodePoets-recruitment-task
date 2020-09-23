from logging import getLogger
from typing import Dict, cast

from fastapi.routing import APIRouter
from fastapi.param_functions import File
from fastapi.datastructures import UploadFile
from fastapi.exceptions import HTTPException
from pydantic import ValidationError

from app.database import db, Project
from app.models import BenfordStatsResponse
from app.types import ColumnStats
from .utils import (
    does_obey_benford,
    significant_digits_stats,
    type_guard_and_parse,
    get_benford_assertion,
    get_data_frame,
)

router = APIRouter()


@router.post("/test_file/")
async def benford_test_file(file: UploadFile = File(...)) -> BenfordStatsResponse:
    content = cast(bytes, await file.read())
    try:
        if (df := get_data_frame(content)) is None:
            raise ValueError("Could not parse your file.")
        stats = {}
        for column in df.columns:
            if (lst := type_guard_and_parse(df[column].to_list())) :
                # PyMongo does not allow for `.` in keys.
                digit_stats = significant_digits_stats(lst)
                stats[column.replace(".", ",")] = ColumnStats(
                    values=digit_stats, obey=does_obey_benford(digit_stats)
                )
        response = BenfordStatsResponse(stats=stats)
        project = Project(stats=stats, filename=file.filename)
        await db.project.insert_one(project.mongo())
    except (Exception, ValueError, ValidationError) as err:
        getLogger("fastapi").error(err)
        raise HTTPException(status_code=400, detail=str(err)) from err

    return response


@router.get("/assert_stats/")
async def benford_test_data() -> Dict[str, float]:
    return get_benford_assertion()
