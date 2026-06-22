from presidio_analyzer import AnalyzerEngine

analyzer = AnalyzerEngine()

ALLOWED = [
    "PERSON",
    "EMAIL_ADDRESS",
    "PHONE_NUMBER",
    "URL"
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