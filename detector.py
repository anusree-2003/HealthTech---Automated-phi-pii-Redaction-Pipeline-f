from presidio_analyzer import(
AnalyzerEngine,
Pattern,
PatternRecognizer
)
analyzer = AnalyzerEngine()
pan_pattern = Pattern(
    name="PAN",
    regex=r"[A-Z]{5}[0-9]{4}[A-Z]",
    score=0.9
)

pan_recognizer = PatternRecognizer(
    supported_entity="PAN_NUMBER",
    patterns=[pan_pattern]
)

analyzer.registry.add_recognizer(
    pan_recognizer
)

aadhaar_pattern = Pattern(
    name="AADHAAR",
    regex=r"\b\d{4}\s\d{4}\s\d{4}\b",
    score=0.9
)

aadhaar_recognizer = PatternRecognizer(
    supported_entity="AADHAAR_NUMBER",
    patterns=[aadhaar_pattern]
)

analyzer.registry.add_recognizer(
    aadhaar_recognizer
)

ALLOWED = [
    "PERSON",
    "EMAIL_ADDRESS",
    "PHONE_NUMBER",
    "URL",
    "PAN_NUMBER",
    "AADHAAR_NUMBER"
]

def detect_pii(text):

    results = analyzer.analyze(
        text=text,
        language="en"
    )

    extracted=[]

    for result in results:

        if result.entity_type not in ALLOWED:
            continue

        value = text[
            result.start:result.end
        ]

        if (
           result.entity_type == "URL"
           and "@" in value
        ):
           continue

        if (
           result.entity_type == "URL"
           and value.endswith(".com")
           and "www." not in value
      ):
           continue

        value = value.split("\n")[0].strip()

        extracted.append({
            "type": result.entity_type,
            "value": value,
            "score": round(
                result.score,
                2
            )
        })

    return extracted