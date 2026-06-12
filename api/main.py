from fastapi import FastAPI
import re

app = FastAPI()

def redact(text: str):
    # Email
    text = re.sub(r"\b[\w.-]+@[\w.-]+\.\w+\b", "[EMAIL]", text)

    # Phone
    text = re.sub(r"\b\d{10}\b", "[PHONE]", text)

    # Names (simple demo rule)
    text = re.sub(r"\bJohn\b", "[NAME]", text)

    return text


@app.get("/")
def home():
    return {"message": "HealthTech PHI Redaction API Running"}


@app.post("/redact")
def redact_text(data: dict):
    text = data.get("text", "")
    return {
        "original": text,
        "redacted": redact(text)
    }