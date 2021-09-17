'use strict'

/* Variables set in generation (default values included) */

var length = 4;
var colors = 8; //colors to use (in order): red, blue, yellow, green, purple, orange, grey, pink, brown, cyan, black, lime
var duplicatesAllowed = false;

/* Variables that change */

var round;
var tempColor;
var icrp; //In Code Right Place
var icwp; //In Code Wrong Place
var nic; //Not In Code
var i;

/* Arrays */

var code = [];
var guesses = [];

/* HTML stuff */
document.getElementById("codeLength").value = length;
document.getElementById("codeLengthLabel").innerText = length;
document.getElementById("colorVariety").value = colors;
document.getElementById("colorVarietyLabel").innerText = colors;
document.getElementById("icrpValue").innerText = 0;
document.getElementById("icwpValue").innerText = 0;
document.getElementById("nicValue").innerText = 0;

document.getElementById("check").style.display = "none";
document.getElementById("resultsParagraph").style.display = "none";
document.getElementById("resultsDisclaimer").style.display = "none";

/* Functions */

function generateCode() {
	/* Check if a code can be generated to avoid crashes */
	if (duplicatesAllowed == false && length > colors) {
		alert("A code cannot be generated because there aren't enough colors to use in the code. To fix this, either increase the number of colors, decrease the length of the code, or turn \"Duplicates allowed\" on.");
	} else {
		/* Generate randomized code */
		code = [];
		for (i = 0; i < length; i += 1) {
			tempColor = Math.floor(Math.random() * colors); //There might be a better way of doing this
			if (duplicatesAllowed == false) {
				while (code.includes(tempColor)) {
					tempColor = Math.floor(Math.random() * colors);
				}
			}
			code.push(tempColor);
		}
		setupGuesses();
		console.log(code); //in the final version it won't be this easy to check your code
	}
}

function setupGuesses() {
	/* Set up the HTML elements and other stuff that allow guesses to be made and checked */
	round = 0;
	guesses = [];
	document.getElementById("check").style.display = "";
	document.getElementById("resultsParagraph").style.display = "";
	if (duplicatesAllowed == true) {
		document.getElementById("resultsDisclaimer").style.display = "";
	} else {
		document.getElementById("resultsDisclaimer").style.display = "none";
	}
	document.getElementById("icrpValue").innerText = 0;
	document.getElementById("icwpValue").innerText = 0;
	document.getElementById("nicValue").innerText = 0;
	/* Delete old number boxes */
	for (i = 0; i < 12; i += 1) {
		var deleteInput = document.getElementById("input" + i);
		//console.log(deleteInput);
		if (deleteInput != null) {
			deleteInput.remove();
		}
	}
	/* Create new number boxes */
	for (i = 0; i < length; i += 1) {
		var createInput = document.createElement("input");
		createInput.type = "number";
		createInput.min = 0;
		createInput.max = colors - 1;
		createInput.id = "input" + i;
		document.body.insertBefore(createInput, inputSeparator);
	}
}

function checkGuess() {
	guesses[round] = [];
	icrp = 0;
	icwp = 0;
	nic = 0;
	/* Put the guess in the guesses array */
	for (i = 0; i < length; i += 1) {
		guesses[round].push(parseInt(document.getElementById("input" + i).value));
	}
	console.log(guesses[round]);
	/* Compare the guess to the code */
	for (i = 0; i < length; i += 1) {
		if (code.includes(guesses[round][i])) {
			if (code[i] == guesses[round][i]) {
				icrp += 1;
			} else {
				icwp += 1;
			}
		} else {
			nic += 1;
		}
	}
	round += 1;
	/* Display the result */
	document.getElementById("icrpValue").innerText = icrp;
	document.getElementById("icwpValue").innerText = icwp;
	document.getElementById("nicValue").innerText = nic;
	console.log("icrp = " + icrp);
	console.log("icwp = " + icwp);
	console.log("nic = " + nic);
}

/* Input Functions */

function codeLengthUpdate() {
	/* Update the label on the code length slider */
	length = parseInt(document.getElementById("codeLength").value);
	document.getElementById("codeLengthLabel").innerText = length;
}
function colorVarietyUpdate() {
	/* Update the label on the color number slider */
	colors = parseInt(document.getElementById("colorVariety").value);
	document.getElementById("colorVarietyLabel").innerText = colors;
}
function duplicatePermissionToggle() {
	/* Make the checkbox work */
	if (document.getElementById("duplicatePermission").checked == true) {
		duplicatesAllowed = true;
	} else {
		duplicatesAllowed = false;
	}
}

/* Controls */

document.getElementById("codeLength").addEventListener("input", codeLengthUpdate);
document.getElementById("colorVariety").addEventListener("input", colorVarietyUpdate);
document.getElementById("duplicatePermission").addEventListener("input", duplicatePermissionToggle);
document.getElementById('gen').addEventListener('click', generateCode);
document.getElementById('check').addEventListener('click', checkGuess);
