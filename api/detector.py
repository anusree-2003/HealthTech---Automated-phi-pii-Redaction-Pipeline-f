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

    extracted = []

    email_ranges = []

    for r in results:
        if r.entity_type == "EMAIL_ADDRESS":
            email_ranges.append(
                (r.start, r.end)
            )

    for result in results:

        if result.entity_type not in ALLOWED:
            continue

        if result.entity_type == "URL":

            inside_email = False

            for s, e in email_ranges:
                if (
                    result.start >= s and
                    result.end <= e
                ):
                    inside_email = True

            if inside_email:
                continue

        extracted.append({
            "type": result.entity_type,
            "value": text[result.start:result.end],
            "score": round(result.score, 2)
        })

    return extracted