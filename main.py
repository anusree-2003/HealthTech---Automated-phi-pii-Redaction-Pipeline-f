from fastapi import FastAPI
from pydantic import BaseModel
from detector import detect_pii

app = FastAPI(title="HealthTech PHI/PII Detection API")

class TextRequest(BaseModel):
    text: str

@app.get("/")
def home():
    return {
        "message": "HealthTech PHI/PII Detection API is running"
    }

@app.post("/detect")
def detect(data: TextRequest):
    entities = detect_pii(data.text)

    return {
        "status": "success",
        "entities": entities,
        "entity_count": len(entities)
    }