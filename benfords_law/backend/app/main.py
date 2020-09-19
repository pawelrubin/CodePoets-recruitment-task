from fastapi import FastAPI

from .routes.benford_test import router as benford_router

app = FastAPI(openapi_url="/api/openapi.json", docs_url="/api/docs", redoc_url=None)

app.include_router(benford_router, prefix="/api/benford")


@app.get("/api/")
async def root():
    return {"message": "Hello World 2137"}
