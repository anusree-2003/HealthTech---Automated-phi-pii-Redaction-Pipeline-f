def redact_text(text):

    text = text.replace(
        "john smith",
        "PATIENT_001"
    )

    text = text.replace(
        "9876543210",
        "PHONE_001"
    )

    return text