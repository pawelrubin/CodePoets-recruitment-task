from typing import List, cast

from fastapi.routing import APIRouter
from app.database import db, Project

router = APIRouter()


@router.get("/all/")
async def get_all_projects() -> List[Project]:
    return [
        cast(Project, project)  # TODO: Improve types
        async for p in db.project.find()
        if (project := Project.from_mongo(p)) is not None
    ]
