console.log("Starting Health Insurance Risk Calculator.."); //Logs when application starts

function Range(a,b){ //Custom function to set a customizable range for risk categories
	if (b === undefined) {
		b = a;
		a = 1;
	}
	return [...Array(b-a+1).keys()].map(x => x+a);
}

let lowRisk = Range(0, 20); //These are the range thresholds for totalRisk
let medRisk = Range(21, 50);
let highRisk = Range(51, 75);

let ageRisk = 0; //Defined these outside of the function so they can be called globally
let bmiRisk = 0;
let pressureRisk = 0;
let historyRisk = 0;

function calculateRisk() { 
    let ageRisk = 0; //Reset the risks once again, to avoid overflow
    let bmiRisk = 0;
    let pressureRisk = 0;
    let historyRisk = 0;
    console.log("Calculating risk score.."); //Logs when the function starts

    let heightFeet = document.getElementById("heightFeet").selectedOptions[0].value;
    let heightInches = document.getElementById("heightInches").selectedOptions[0].value;

    let heightUS = parseInt(heightFeet * 12) + parseInt(heightInches); //Converts total height to inches
    let heightMetersSquared = (heightUS*0.0254) * (heightUS*0.0254); //Converts inches into meters squared
    let weight = (parseInt(document.getElementById("weightInput").value)) * 0.453592; //Converts weight (pounds) to kilos
    bmi = Math.round((weight / heightMetersSquared) * 10) / 10; //Calculates BMI and rounds to one decimal place

    if (document.getElementById("age").selectedOptions[0].value == "invalid") { //Validates age for no input
        document.getElementById("error1").innerHTML = "Please select an age.";
    } else {
        document.getElementById("error1").innerHTML = "";
    }

    if (document.getElementById("heightFeet").selectedOptions[0].value == "invalid") { //Validates height for no input
        document.getElementById("error2").innerHTML = "Please select a height.";
    } else if (document.getElementById("heightInches").selectedOptions[0].value == "invalid") {
        document.getElementById("error2").innerHTML = "Please select a height.";
    } else {
        document.getElementById("error2").innerHTML = "";
    }

    if (isNaN(weight)) {
        document.getElementById("error3").innerHTML = "Please enter a valid weight."; //Validates weight for negative and non-numerical inputs
    } else if (weight < 0) {
        document.getElementById("error3").innerHTML = "Please enter a valid weight.";
    } else {
        document.getElementById("error3").innerHTML = "";
    }

    if (document.getElementById("pressure").selectedOptions[0].value == "invalid") { //Validates blood pressure for no input
        document.getElementById("error4").innerHTML = "Please select a category.";
    } else {
        document.getElementById("error4").innerHTML = "";
    }

    ageRisk = parseInt(document.getElementById("age").selectedOptions[0].value); //Calculates risk score for age
    pressureRisk = parseInt(document.getElementById("pressure").selectedOptions[0].value); //Calculates risk score for blood pressure

    if (bmi >= 18.5 && bmi <= 24.9) { //Calculates risk score for BMI per the ranges
        bmiRisk = 0;
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        bmiRisk = 30;
    } else if (bmi >= 30.0) {
        bmiRisk = 75;
    }

    historyRisk = 0
    if (document.getElementById("history1").checked) { //Calculates risk score for history by incrementing for each box checked
        historyRisk += 10;
    }
    if (document.getElementById("history2").checked) {
        historyRisk += 10;
    }
    if (document.getElementById("history3").checked) {
        historyRisk += 10;
    }
    
    totalRisk = parseInt(ageRisk + pressureRisk + bmiRisk + historyRisk); //Calculates total risk score

    if (lowRisk.includes(totalRisk)) { //Displays remark based on threshold ranges
        document.getElementById("remark").innerHTML = "The patient has a low risk score of " + totalRisk;
        document.getElementById("signal").style.color = "green";
        document.getElementById("signal").innerHTML = "⬣";
    } else if (medRisk.includes(totalRisk)) {
        document.getElementById("remark").innerHTML = "The patient has a medium risk score of " + totalRisk;
        document.getElementById("signal").style.color = "gold";
        document.getElementById("signal").innerHTML = "⬣";
    } else if (highRisk.includes(totalRisk)) {
        document.getElementById("remark").innerHTML = "The patient has a high risk score of " + totalRisk;
        document.getElementById("signal").style.color = "orange";
        document.getElementById("signal").innerHTML = "⬣";
    } else {
        document.getElementById("remark").innerHTML = "The patient has an uninsurable risk score of " + totalRisk;
        document.getElementById("signal").style.color = "red";
        document.getElementById("signal").innerHTML = "⬣";
    }

    detailed.disabled = false; //Enables the See Detailed Results button to be pressed
}

function detailedResults() { //Gets called onClick in index.html
    console.log("Displaying detailed results.."); //Logs when function starts
    
    document.getElementById("desc").innerHTML = "Here are the scores for each risk category:";
    document.getElementById("detailAge").innerHTML = "Age: " + ageRisk; //These display the detailed list for each question
    document.getElementById("detailBMI").innerHTML = "BMI: " + bmiRisk + " (Their BMI is " + bmi + ")";
    document.getElementById("detailPressure").innerHTML = "Blood Pressure: " + pressureRisk; 
    document.getElementById("detailHistory").innerHTML = "Family History: " + historyRisk; 
}