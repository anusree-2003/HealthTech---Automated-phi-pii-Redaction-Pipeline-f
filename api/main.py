from fastapi import FastAPI
from pydantic import BaseModel
from api.detector import detect_pii
import re

app = FastAPI()


class TextRequest(BaseModel):
    text: str


# Week 1 - Regex Redaction
def redact(text: str):

    # Email
    text = re.sub(
        r"\b[\w.-]+@[\w.-]+\.\w+\b",
        "[EMAIL]",
        text
    )

    # Phone Number
    text = re.sub(
        r"\b\d{10}\b",
        "[PHONE]",
        text
    )

    # Demo Name Rule
    text = re.sub(
        r"\bJohn\b",
        "[NAME]",
        text
    )

    return text


@app.get("/")
def home():
    return {
        "message": "HealthTech PHI Redaction API Running"
    }


@app.post("/redact")
def redact_text(data: TextRequest):

    text = data.text

    # Week 2 Integration with Member 2 NLP Module
    entities = detect_pii(text)

    redacted_text = redact(text)

    return {
        "original": text,
        "entities": entities,
        "redacted": redacted_text,
        "entity_count": len(entities)
    }