from detector import detect_pii

text = """
John Smith
Email: john@gmail.com
Phone: 9876543210
"""

results = detect_pii(text)

for result in results:
    print(result.entity_type)