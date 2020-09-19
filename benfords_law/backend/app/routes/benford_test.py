from fastapi import APIRouter, File, UploadFile, Form

router = APIRouter()


@router.post("/test/")
async def benford_test(column: str = Form(...), file: UploadFile = File(...)):
    return {"filename": file.filename, "column": column}
