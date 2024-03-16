let serverURL = "http://localhost:3000" // For testing purposes, replace with Azure host
console.log("Starting...");

async function calculateRisk() {
    ageRisk();
    BMIRisk();
    pressureRisk();
    historyRisk();
}

// Age risk function
async function ageRisk() {
    // Get the value of which age option is selected from index.html
    const ageOption = parseInt(document.getElementById("age").selectedOptions[0].value);

    // Fetch from the server /age-risk, and get ageRisk returned
    fetch(serverURL + `/age-risk?ageOption=${ageOption}`) // ageOption is the paramater to pass to the server
    .then(response => response.json())
    .then(data => {
        const ageRisk = data.ageRisk;
        console.log("Age Risk :", ageRisk);
        return ageRisk;
    })
}

// BMI risk function
async function BMIRisk() {
    // Get the values for height and weight from inputs in index.html
    const heightFeet = parseInt(document.getElementById("heightFeet").value);
    const heightInches = parseInt(document.getElementById("heightInches").value);
    const weight = parseInt(document.getElementById("weightInput").value);
    
    // Params passes in the values from the user's input by adding it to the route to the server
    const params = `?heightFeet=${heightFeet}&heightInches=${heightInches}&weight=${weight}`;

    // Fetch from the server /bmi-risk, and get bmiRisk returned
    fetch(serverURL + `/bmi-risk${params}`)
        .then(response => response.json())
        .then(data => {
            const bmiRisk = data.bmiRisk;
            console.log("BMI Risk:", bmiRisk);
            return bmiRisk;
        });
}

// Pressure risk function
async function pressureRisk() {
    // Get the value selected for blood pressure category
    const pressureOption = parseInt(document.getElementById("pressure").selectedOptions[0].value);

    // Fetch from the server /pressure-risk, and get pressureRisk returned
    fetch(serverURL + `/pressure-risk?pressureOption=${pressureOption}`)
    .then(response => response.json())
    .then(data => {
        const pressureRisk = data.pressureRisk;
        console.log("Pressure Risk :", pressureRisk);
        return pressureRisk;
    })
}

// History risk function
async function historyRisk() {
    // Get the boolean for if each family history box is checked and convert to string
    const diabetesChecked = document.getElementById('history1').checked.toString();
    const cancerChecked = document.getElementById('history2').checked.toString();
    const alzheimersChecked = document.getElementById('history3').checked.toString();
    
    // Set those strings to the paramaters to pass to the server
    const params = `?diabetesChecked=${diabetesChecked}&cancerChecked=${cancerChecked}&alzheimersChecked=${alzheimersChecked}`;

    // Fetch from the server /history-risk, and get historyRisk returned
    fetch(serverURL + `/history-risk${params}`)
        .then(response => response.json())
        .then(data => {
            const historyRisk = data.historyRisk;
            console.log("History Risk:", historyRisk);
            return historyRisk;
        });
}