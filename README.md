🏥 HealthTech - Automated PHI/PII Redaction Pipeline

A secure healthcare privacy protection system that automatically detects and redacts Protected Health Information (PHI) and Personally Identifiable Information (PII) from clinical text and uploaded healthcare documents before sharing them with AI models or external systems.

📖 Project Overview

Healthcare organizations handle large volumes of sensitive patient information that must be protected to comply with privacy regulations such as HIPAA. This project provides an automated PHI/PII redaction pipeline that detects confidential information using Microsoft Presidio and Regex, replacing sensitive data with secure placeholders while preserving the clinical meaning of the document.

The application also includes an interactive dashboard, analytics, document upload, scan history, and downloadable reports.

🎯 Project Objectives
Detect sensitive PHI/PII from healthcare documents.
Automatically redact confidential information.
Protect patient privacy before data is shared with AI systems.
Provide real-time analytics and security insights.
Improve healthcare data security using AI-assisted privacy protection.
🏗️ System Architecture

(Insert architecture image here)

![System Architecture](images/architecture.jpg)
🔄 System Workflow
User
   │
   ▼
Upload PDF/TXT or Enter Clinical Notes
   │
   ▼
FastAPI Backend
   │
   ├── Regex Detection
   └── Microsoft Presidio NLP
            │
            ▼
      PHI/PII Detection
            │
            ▼
     Sensitive Data Redaction
            │
            ▼
 Dashboard + Analytics + Reports
✨ Features
🔒 PHI & PII Detection
🛡 Automatic Data Redaction
📄 TXT Upload
📑 PDF Upload
📊 Analytics Dashboard
📈 PHI Analytics Chart
📋 Entity Detection Table
📜 Scan History
📄 Download Report
📋 Copy Output
⚠ Risk Level Indicator
⏱ Scan Time Monitoring
✅ Scan Status Updates
📱 Responsive Dashboard UI
🛠 Technologies Used
Backend
Python
FastAPI
Microsoft Presidio
Regex
Frontend
HTML5
CSS3
JavaScript
Chart.js
Development Tools
Git
GitHub
VS Code
📂 Project Structure
HealthTech/
│
├── api/
│   ├── main.py
│   └── detector.py
│
├── static/
│   ├── css/
│   └── js/
│
├── templates/
│   └── index.html
│
├── uploads/
│
├── images/
│   ├── architecture.jpg
│   ├── dashboard.png
│   ├── analytics.png
│   ├── output.png
│   └── upload.png
│
├── requirements.txt
└── README.md
🚀 Installation

Clone the repository

git clone https://github.com/anusree-2003/HealthTech---Automated-phi-pii-Redaction-Pipeline-f.git

Navigate to the project

cd HealthTech---Automated-phi-pii-Redaction-Pipeline-f

Install dependencies

pip install -r requirements.txt

Run the application

uvicorn api.main:app --reload

Open your browser:

http://127.0.0.1:8000
📊 Dashboard Modules
Dashboard
Document Upload
Detect & Redact
Analytics
Scan History
Security Summary
Reports
📷 Application Screenshots
Dashboard
![Dashboard](images/dashboard.png)
Analytics
![Analytics](images/analytics.png)
Redacted Output
![Output](images/output.png)
Document Upload
![Upload](images/upload.png)
🔄 Working Flow
User uploads a TXT/PDF file or enters clinical notes.
FastAPI receives the request.
Microsoft Presidio and Regex detect PHI/PII entities.
Sensitive information is securely redacted.
The dashboard displays the analytics, detected entities, scan history, and redacted output.
Users can download or copy the generated report.
👥 Team Responsibilities
Member	Responsibility
Member 1 (Anusree)	Backend API Development, Dashboard Integration, Analytics, Scan History, TXT/PDF Upload
Member 2	NLP-based PHI/PII Detection
Member 3	Pseudonymization & Storage
Member 4	Testing & Documentation
👩‍💻 My Contribution (Member 1)
Developed the FastAPI backend integration.
Connected frontend with backend APIs.
Implemented the interactive dashboard.
Added analytics using Chart.js.
Developed scan history functionality.
Integrated TXT and PDF upload.
Implemented report download and copy features.
Performed integration testing and bug fixes.
🎯 Project Outcome

The HealthTech PHI/PII Redaction Pipeline successfully detects and redacts sensitive healthcare information from clinical text and uploaded documents. The system provides an intuitive dashboard with analytics, scan history, risk assessment, and downloadable reports, helping protect patient privacy before healthcare data is processed by AI applications.

📌 Future Enhancements
Reversible pseudonymization
Database integration
OCR support for scanned documents
User authentication
Cloud deployment
Enhanced HIPAA compliance
Multi-user support
📜 License

This project was developed as part of a Cyber Security Internship for educational and learning purposes.

🙏 Acknowledgements

We sincerely thank our internship mentors, team members, and the organization for their continuous guidance and support throughout the successful development of this project.
