let serverURL = "https://health-insurance-risk-server.azurewebsites.net"
console.log("Starting...");

ping();

async function ping() {
    fetch (serverURL + '/api/ping')
}

// Age risk function
async function ageRisk() {
    const ageOption = parseInt(document.getElementById("age").selectedOptions[0].value);

    // validate input
    if (isNaN(ageOption)) {
        document.getElementById("error1").innerHTML = "Please select an age.";
        throw new Error("Age is invalid");
    } else {
        document.getElementById("error1").innerHTML = "";
    }

    const response = await fetch(serverURL + `/age-risk?ageOption=${ageOption}`);
    const data = await response.json();
    const ageRisk = data.ageRisk;
    console.log("Age Risk :", ageRisk);
    return ageRisk;
}

// BMI risk function
async function BMIRisk() {
    const heightFeet = parseInt(document.getElementById("heightFeet").value);
    const heightInches = parseInt(document.getElementById("heightInches").value);
    const weight = parseInt(document.getElementById("weightInput").value);

    // validate input 
    if (isNaN(heightFeet) || isNaN(heightInches)) {
        document.getElementById("error2").innerHTML = "Please select a height.";
        throw new Error("Height is invalid");
    } else {
        document.getElementById("error2").innerHTML = "";
    }

    if (isNaN(weight)) {
        document.getElementById("error3").innerHTML = "Please enter a valid weight.";
        throw new Error("Weight is invalid");
    } else {
        document.getElementById("error3").innerHTML = "";
    }

    const params = `?heightFeet=${heightFeet}&heightInches=${heightInches}&weight=${weight}`;

    const response = await fetch(serverURL + `/bmi-risk${params}`);
    const data = await response.json();
    const bmiRisk = data.bmiRisk;
    console.log("BMI Risk:", bmiRisk);
    return bmiRisk;
}

// Pressure risk function
async function pressureRisk() {
    const pressureOption = parseInt(document.getElementById("pressure").selectedOptions[0].value);

    // validate input
    if (isNaN(pressureOption)) {
        document.getElementById("error4").innerHTML = "Please select a category.";
        throw new Error("Blood pressure category is invalid");
    } else {
        document.getElementById("error4").innerHTML = "";
    }

    const response = await fetch(serverURL + `/pressure-risk?pressureOption=${pressureOption}`);
    const data = await response.json();
    const pressureRisk = data.pressureRisk;
    console.log("Pressure Risk :", pressureRisk);
    return pressureRisk;
}

// History risk function
async function historyRisk() {
    const diabetesChecked = document.getElementById('history1').checked.toString();
    const cancerChecked = document.getElementById('history2').checked.toString();
    const alzheimersChecked = document.getElementById('history3').checked.toString();
    
    const params = `?diabetesChecked=${diabetesChecked}&cancerChecked=${cancerChecked}&alzheimersChecked=${alzheimersChecked}`;

    const response = await fetch(serverURL + `/history-risk${params}`);
    const data = await response.json();
    const historyRisk = data.historyRisk;
    console.log("History Risk:", historyRisk);
    return historyRisk;
}

async function calculateRisk() {
        // Wait for all risk functions to complete before totaling
        const [ageRiskResult, bmiRiskResult, pressureRiskResult, historyRiskResult] = await Promise.all([
            ageRisk(),
            BMIRisk(),
            pressureRisk(),
            historyRisk()
        ]);

        console.log("All risk functions completed. Age Risk:", ageRiskResult, "BMI Risk:", bmiRiskResult, "Pressure Risk:", pressureRiskResult, "History Risk:", historyRiskResult);
        
        // These are the results of each risk category, being passed as params to the calculate risk route to get the total
        const params = `?ageRiskResult=${ageRiskResult}&bmiRiskResult=${bmiRiskResult}&pressureRiskResult=${pressureRiskResult}&historyRiskResult=${historyRiskResult}`;
        
        // Fetch totalRisk from server route
        const response = await fetch(serverURL + `/calculate-risk${params}`);
        const data = await response.json();
        const totalRisk = data.totalRisk;
        var remark = data.remark;

        console.log("Total Risk:", totalRisk);
        console.log(remark);

        document.getElementById("totalRisk").innerText = "Total Risk: " + totalRisk
        document.getElementById("remark").innerText = remark
    }