from fastapi import FastAPI

app = FastAPI(openapi_url="/api/openapi.json", docs_url="/api/docs", redoc_url=None)


@app.get("/api/")
async def root():
    return {"message": "Hello World 2137"}
