# 🏥 HealthTech - Automated PHI/PII Redaction Pipeline

A secure healthcare privacy protection system that automatically detects and redacts Protected Health Information (PHI) and Personally Identifiable Information (PII) from clinical text and uploaded documents before sharing with AI models or external systems.

---

# 📖 Project Overview

Healthcare organizations often process sensitive patient information that must be protected before being shared with AI applications. This project provides an automated PHI/PII redaction pipeline that identifies confidential information and replaces it with secure placeholders while preserving the overall clinical context.

The application includes an interactive dashboard, document upload support, analytics visualization, scan history, and downloadable reports.

---

# 🏗️ System Architecture

> *(Add your architecture diagram here)*

![System Architecture](images/architecture.jpg)

### Workflow

```
              User
                │
                ▼
      HealthTech Dashboard
      (HTML • CSS • JavaScript)
                │
                ▼
         FastAPI Backend
                │
     ┌──────────┴──────────┐
     │                     │
     ▼                     ▼
 Regex Detection    Microsoft Presidio
     │                     │
     └──────────┬──────────┘
                ▼
       PHI/PII Detection
                │
                ▼
      Sensitive Data Redaction
                │
                ▼
      Secure Redacted Output
                │
                ▼
 Dashboard Analytics & Reports
```

---

# ✨ Features

- 🔒 PHI & PII Detection
- 🛡️ Automatic Data Redaction
- 📄 TXT File Upload
- 📑 PDF File Upload
- 📊 Analytics Dashboard
- 📈 PHI Analytics Chart
- 📋 Entity Detection Table
- 📜 Recent Scan History
- 📄 Download Redacted Report
- 📋 Copy Redacted Output
- ⚠️ Risk Level Indicator
- ⏱️ Scan Time Monitoring
- ✅ Scan Status Updates
- 📱 Responsive Dashboard UI

---

# 🛠️ Technologies Used

### Backend

- Python
- FastAPI
- Microsoft Presidio
- Regex

### Frontend

- HTML5
- CSS3
- JavaScript
- Chart.js

### Tools

- Git
- GitHub
- VS Code

---

# 📂 Project Structure

```
HealthTech/
│
├── api/
│   ├── main.py
│   ├── detector.py
│
├── static/
│   ├── css/
│   │     └── style.css
│   ├── js/
│   │     └── script.js
│
├── templates/
│     └── index.html
│
├── uploads/
│
├── images/
│     ├── architecture.jpg
│     ├── dashboard.png
│     ├── analytics.png
│     └── output.png
│
├── requirements.txt
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/anusree-2003/HealthTech---Automated-phi-pii-Redaction-Pipeline-f.git
```

## Navigate to Project

```bash
cd HealthTech---Automated-phi-pii-Redaction-Pipeline-f
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Run the Server

```bash
uvicorn api.main:app --reload
```

Open your browser:

```
http://127.0.0.1:8000
```

---

# 📊 Dashboard Modules

- Dashboard
- Document Upload
- Detect & Redact
- Analytics
- Scan History
- Reports
- Risk Level
- Security Summary

---

# 📷 Application Screenshots

## Dashboard

![Dashboard](images/dashboard.png)

---

## PHI Analytics

![Analytics](images/analytics.png)

---

## Redacted Output

![Output](images/output.png)

---

## Document Upload

![Upload](images/upload.png)

---

# 🔄 Working Flow

1. User enters text or uploads a TXT/PDF document.
2. FastAPI receives the request.
3. Microsoft Presidio and Regex detect PHI/PII entities.
4. Sensitive information is automatically redacted.
5. The dashboard displays:
   - Redacted output
   - Entity table
   - Analytics chart
   - Risk level
   - Scan history
6. Users can copy or download the generated report.

---

# 🎯 Project Outcome

Successfully developed a healthcare privacy protection system capable of detecting and redacting sensitive patient information while providing an interactive dashboard, analytics visualization, document upload support, scan history, and downloadable reports.

---

# 👥 Team Members

| Member | Responsibility |
|---------|----------------|
| **Anusree** | Backend API Development, Dashboard Integration, Analytics, Scan History, PDF/TXT Upload |
| Member 2 | NLP Entity Detection |
| Member 3 | Pseudonymization & Storage |
| Member 4 | Testing & Documentation |

---

# 📌 Future Enhancements

- Reversible pseudonymization
- Database integration
- User authentication
- OCR support for scanned documents
- REST API authentication
- Export reports in multiple formats
- Cloud deployment

---

# 📜 License

This project was developed as part of a **Cyber Security Internship** for educational and learning purposes.

---

## ⭐ If you found this project useful, consider giving it a star on GitHub!
