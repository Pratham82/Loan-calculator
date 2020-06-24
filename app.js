//Submit button
document.getElementById("loan-form").addEventListener("submit", function (e) {
	e.preventDefault();
	document.getElementById("results").style.display = "none";
	document.getElementById("loading").style.display = "block";

	setTimeout(calculateResults, 1500);
});

function calculateResults(e) {
	console.log("calculating");

	// Get user inputs
	const amount = document.getElementById("amount");
	const interest = document.getElementById("interest");
	const years = document.getElementById("years");
	const monthlyPayments = document.getElementById("monthly-payment");
	const totalPayment = document.getElementById("total-payment");
	const totalInterest = document.getElementById("total-interest");

	// Calculations
	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	// Monthly payments
	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principal * x * calculatedInterest) / (x - 1);
	console.log(principal);

	if (isFinite(monthly)) {
		// toFixed used for setting the number of decimals
		monthlyPayments.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
		document.getElementById("results").style.display = "block";
		document.getElementById("loading").style.display = "none";
	} else {
		showError("Please check your numbers");
	}
}

function showError(error) {
	document.getElementById("results").style.display = "none";
	document.getElementById("loading").style.display = "none";
	const errorDiv = document.createElement("div");
	const card = document.querySelector(".card");
	const heading = document.querySelector(".heading ");

	errorDiv.className = "alert alert-danger";
	errorDiv.appendChild(document.createTextNode(error));

	//insert error above heading
	card.insertBefore(errorDiv, heading);

	//Clear error after specific time
	setTimeout(clearError, 1500);
}

function clearError() {
	document.querySelector(".alert").remove();
}
