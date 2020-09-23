from typing import Dict

from fastapi import FastAPI

from app.routes import BenfordRouter, ProjectRouter

app = FastAPI(openapi_url="/api/openapi.json", docs_url="/api/docs", redoc_url=None)

app.include_router(BenfordRouter, prefix="/api/benford")
app.include_router(ProjectRouter, prefix="/api/project")


@app.get("/api/")
async def root() -> Dict[str, str]:
    return {"message": "Hello World"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
