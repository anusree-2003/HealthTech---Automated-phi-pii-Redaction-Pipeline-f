// =======================================
// Detect PHI / PII
// =======================================

async function detectPII() {

    const text = document.getElementById("inputText").value;

    if (text.trim() === "") {
        showToast("Please enter clinical text");
        return;
    }

    document.getElementById("scanStatus").innerText = "Scanning...";
    document.getElementById("scanStatus").classList.add("loading");

    const startTime = performance.now();

    try {

        const response = await fetch("/redact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text
            })
        });

        const data = await response.json();

        const endTime = performance.now();

        const seconds = ((endTime - startTime) / 1000).toFixed(2);

        document.getElementById("scanTime").innerText =
            seconds + " s";

        displayResults(data);

        document.getElementById("scanStatus").innerText =
            "Completed";

        document.getElementById("scanStatus").classList.remove("loading");

        showToast("Scan completed successfully");

    }

    catch (error) {

        console.log(error);

        document.getElementById("scanStatus").innerText =
            "Error";

        document.getElementById("scanStatus").classList.remove("loading");

        showToast("Backend connection failed");

    }

}



// =======================================
// Display Results
// =======================================

function displayResults(data) {

    document.getElementById("outputText").value =
        data.redacted || "";

    document.getElementById("phiCount").innerText =
        data.entity_count || 0;

    document.getElementById("summaryCount").innerText =
        data.entity_count || 0;

    const table =
        document.getElementById("entityTable");

    table.innerHTML = "";

    let entityTypes = [];

    if (data.entities) {

        data.entities.forEach(entity => {

            let entityName =
                entity.type ||
                entity.entity ||
                entity.label ||
                "PHI";

            let entityValue =
                entity.value ||
                entity.text ||
                "";

            let confidence =
                entity.score ||
                entity.confidence ||
                0.90;

            entityTypes.push(entityName);

            let badgeClass = "badge";

            switch (entityName) {

                case "PERSON":
                    badgeClass += " badge-person";
                    break;

                case "EMAIL_ADDRESS":
                    badgeClass += " badge-email";
                    break;

                case "PHONE_NUMBER":
                    badgeClass += " badge-phone";
                    break;

                case "URL":
                    badgeClass += " badge-url";
                    break;
            }

            table.innerHTML += `

            <tr>

                <td>
                    <span class="${badgeClass}">
                        ${entityName}
                    </span>
                </td>

                <td>${entityValue}</td>

                <td>${(confidence * 100).toFixed(0)}%</td>

            </tr>

            `;

        });

    }

    updateSummary(entityTypes);

    updateRisk(data.entity_count);

}



// =======================================
// Security Summary
// =======================================

function updateSummary(entityTypes) {

    const summary =
        document.getElementById("summaryList");

    summary.innerHTML = "";

    let counts = {};

    entityTypes.forEach(item => {

        counts[item] = (counts[item] || 0) + 1;

    });

    for (let key in counts) {

        summary.innerHTML +=

        `<li>✔ ${key} : ${counts[key]}</li>`;

    }

}



// =======================================
// Risk Level
// =======================================

function updateRisk(count) {

    const risk =
        document.getElementById("riskLevel");

    if (count == 0) {

        risk.innerText = "Safe 🟢";

        risk.className = "low";

    }

    else if (count <= 2) {

        risk.innerText = "Low 🟢";

        risk.className = "low";

    }

    else if (count <= 5) {

        risk.innerText = "Medium 🟡";

        risk.className = "medium";

    }

    else {

        risk.innerText = "High 🔴";

        risk.className = "high";

    }

}

// =======================================
// Sample Text
// =======================================

function loadSample() {

    document.getElementById("inputText").value =

`Patient Name: John Smith
Email: john@gmail.com
Phone: 9876543210
Website: www.google.com`;

}



// =======================================
// Clear
// =======================================

function clearText() {

    document.getElementById("inputText").value = "";

    document.getElementById("outputText").value = "";

    document.getElementById("entityTable").innerHTML = "";

    document.getElementById("summaryList").innerHTML = "";

    document.getElementById("phiCount").innerText = "0";

    document.getElementById("summaryCount").innerText = "0";

    document.getElementById("scanTime").innerText = "0.00 s";

    document.getElementById("scanStatus").innerText = "Ready";

    document.getElementById("riskLevel").innerText = "Low 🟢";

    document.getElementById("riskLevel").className = "low";

}



// =======================================
// Copy Output
// =======================================

function copyOutput() {

    const output = document.getElementById("outputText");

    if (output.value.trim() === "") {

        showToast("Nothing to copy");

        return;

    }

    navigator.clipboard.writeText(output.value);

    showToast("Report copied successfully");

}



// =======================================
// Download Report
// =======================================

function downloadReport() {

    const report = document.getElementById("outputText").value;

    if (report.trim() === "") {

        showToast("No report available");

        return;

    }

    const blob = new Blob(

        [report],

        { type: "text/plain" }

    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "HealthTech_Redaction_Report.txt";

    link.click();

    showToast("Report downloaded");

}



// =======================================
// Toast Notification
// =======================================

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}



// =======================================
// Upload Document
// =======================================

const upload = document.getElementById("documentUpload");

if (upload) {

    upload.addEventListener("change", async function (event) {

        const file = event.target.files[0];

        if (!file) {

            return;

        }

        document.getElementById("fileName").innerText =

            "Selected File : " + file.name;

        document.getElementById("scanStatus").innerText =

            "Uploading...";

        const formData = new FormData();

        formData.append("file", file);

        try {

            const start = performance.now();

            const response = await fetch("/upload", {

                method: "POST",

                body: formData

            });

            const data = await response.json();

            const end = performance.now();

            document.getElementById("scanTime").innerText =

                ((end - start) / 1000).toFixed(2) + " s";

            document.getElementById("inputText").value =

                data.original || "";

            displayResults(data);

            document.getElementById("scanStatus").innerText =

                "Completed";

            showToast("Document scanned successfully");

        }

        catch (error) {

            console.log(error);

            document.getElementById("scanStatus").innerText =

                "Error";

            showToast("Upload failed");

        }

    });

}