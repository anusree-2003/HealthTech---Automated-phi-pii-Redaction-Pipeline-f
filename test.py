from detector import detect_pii

samples = [

# """
# Patient: John Smith
# Email: john@gmail.com
# Phone: 9876543210
# """
"""
Patient: John Smith
PAN: ABCDE1234F
Aadhaar: 1234 5678 9012
Email: john@gmail.com
""" ,

"""
Patient: Alex
Email: alex123@gmail.com
Website: www.hospital.com
"""
]

for i,text in enumerate(samples):

    print("\nTEST",i+1)

    results=detect_pii(text)

    for r in results:
        print(r)