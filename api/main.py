from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
from pydantic import BaseModel
from api.detector import detect_pii
from pypdf import PdfReader
import re


app = FastAPI(title="HealthTech PHI/PII Redaction System")


# Static files (CSS, JS)
app.mount("/static", StaticFiles(directory="static"), name="static")


# HTML Templates
templates = Jinja2Templates(directory="templates")



class TextRequest(BaseModel):
    text: str




# Redaction Function

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






# Home Page

@app.get("/")

def home(request: Request):

    return templates.TemplateResponse(

        request=request,

        name="index.html"

    )







# Text Detection API

@app.post("/redact")

def redact_text(data: TextRequest):


    text = data.text


    entities = detect_pii(text)


    redacted_text = redact(text)



    return {


        "original": text,

        "entities": entities,

        "redacted": redacted_text,

        "entity_count": len(entities)

    }







# Document Upload API (PDF + TXT)

@app.post("/upload")

async def upload_document(file: UploadFile = File(...)):


    text = ""



    # TXT File

    if file.filename.endswith(".txt"):


        content = await file.read()


        text = content.decode("utf-8")




    # PDF File

    elif file.filename.endswith(".pdf"):


        pdf = PdfReader(file.file)



        for page in pdf.pages:


            text += page.extract_text() or ""





    else:


        return {


            "error": "Only PDF and TXT files are supported"


        }






    entities = detect_pii(text)


    redacted_text = redact(text)



    return {


        "filename": file.filename,

        "original": text,

        "entities": entities,

        "redacted": redacted_text,

        "entity_count": len(entities)

    }