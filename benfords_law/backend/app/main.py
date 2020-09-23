from fastapi import FastAPI

from app.routes import BenfordRouter, ProjectRouter

app = FastAPI(openapi_url="/api/openapi.json", docs_url="/api/docs", redoc_url=None)

app.include_router(BenfordRouter, prefix="/api/benford")
app.include_router(ProjectRouter, prefix="/api/project")


@app.get("/api/")
async def root():
    return {"message": "Hello World"}
