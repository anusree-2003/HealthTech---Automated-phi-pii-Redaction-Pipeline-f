from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "HealthTech PHI Redaction API Running"}