async function detectPII(){

    const text = document.getElementById("inputText").value;


    if(text.trim() === ""){

        alert("Please enter clinical text");

        return;

    }



    document.getElementById("scanStatus").innerText = "Scanning...";


    const startTime = performance.now();



    try{


        const response = await fetch("/redact",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },


            body:JSON.stringify({

                text:text

            })

        });




        const data = await response.json();




        displayResults(data);



        const endTime = performance.now();


        console.log(

            "Scan Time:",
            ((endTime-startTime)/1000).toFixed(2),
            "sec"

        );



    }



    catch(error){


        console.log(error);


        alert("Backend connection failed");


        document.getElementById("scanStatus").innerText =
        "Error";


    }


}







// Display Detection Results

function displayResults(data){



    // Redacted Output

    document.getElementById("outputText").value =

    data.redacted || "";






    // PHI Count

    document.getElementById("phiCount").innerText =

    data.entity_count || 0;






    // Entity Table

    const table =

    document.getElementById("entityTable");


    table.innerHTML="";



    let entityTypes=[];





    if(data.entities){



        data.entities.forEach(entity=>{


            let entityName =

            entity.entity ||

            entity.label ||

            entity.type ||

            "PHI";




            let entityValue =

            entity.value ||

            entity.text ||

            "";





            entityTypes.push(entityName);






            table.innerHTML += `

            <tr>

            <td>${entityName}</td>

            <td>${entityValue}</td>

            <td>${entity.confidence || "95%"}</td>

            </tr>

            `;



        });


    }







    // Security Summary

    const summary =

    document.getElementById("summaryList");



    summary.innerHTML="";



    [...new Set(entityTypes)].forEach(item=>{


        summary.innerHTML +=

        `<li>• ${item}</li>`;


    });







    document.getElementById("scanStatus").innerText =

    "Completed";


}








function loadSample(){


    document.getElementById("inputText").value =

`Patient Name: John Smith

Email: john@gmail.com

Phone: 9876543210

Website: www.google.com`;


}








function clearText(){


    document.getElementById("inputText").value="";


    document.getElementById("outputText").value="";


    document.getElementById("entityTable").innerHTML="";


    document.getElementById("phiCount").innerText="0";


    document.getElementById("summaryList").innerHTML="";


    document.getElementById("scanStatus").innerText="Ready";


}








function copyOutput(){


    const output =

    document.getElementById("outputText");



    navigator.clipboard.writeText(output.value);



    alert("Copied successfully");


}








function downloadReport(){


    const text =

    document.getElementById("outputText").value;



    const file = new Blob(

        [text],

        {type:"text/plain"}

    );



    const link =

    document.createElement("a");



    link.href =

    URL.createObjectURL(file);



    link.download =

    "PHI_Redaction_Report.txt";



    link.click();


}









// Healthcare Document Upload (PDF + TXT)

const upload = document.getElementById("documentUpload");



if(upload){



upload.addEventListener("change", async function(event){



    const file = event.target.files[0];



    if(!file){

        return;

    }



    document.getElementById("fileName").innerText =

    "Selected File: " + file.name;





    const formData = new FormData();



    formData.append("file", file);






    try{



        const response = await fetch("/upload",{


            method:"POST",


            body:formData


        });





        const data = await response.json();





        // Put extracted text

        document.getElementById("inputText").value =

        data.original || "";






        // Show results

        displayResults(data);




    }



    catch(error){



        console.log(error);


        alert("Document upload failed");


    }





});


}