from anonymizer import redact_text

text= """
john smith
phone: 9876543210
"""

result = redact_text(text)
print(result)