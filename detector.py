from presidio_analyzer import AnalyzerEngine

analyzer = AnalyzerEngine()

def detect_pii(text):
    results = analyzer.analyze(
        text=text,
        language="en"
    )
    return results