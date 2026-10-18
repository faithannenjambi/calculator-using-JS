const calculatorForm = document.getElementById("calculator-form");
const firstNumberInput = document.getElementById("first-number");
const secondNumberInput = document.getElementById("second-number");
const operationInput = document.getElementById("operation");
const resultOutput = document.getElementById("result");
const resetButton = document.getElementById("reset-btn");
const exitButton = document.getElementById("exit-btn");

const DEFAULT_MESSAGE = "Your answer will appear here.";

calculatorForm.addEventListener("submit", calculate);
resetButton.addEventListener("click", resetCalculator);
exitButton.addEventListener("click", exitCalculator);

// Return to the neutral state as soon as the user edits anything
[firstNumberInput, secondNumberInput, operationInput].forEach((field) => {
    field.addEventListener("input", () => {
        if (resultOutput.classList.contains("error")) {
            showMessage(DEFAULT_MESSAGE, "neutral");
        }
    });
});

function calculate(event) {
    event.preventDefault();

    const firstNumberText = firstNumberInput.value.trim();
    const secondNumberText = secondNumberInput.value.trim();
    const operation = operationInput.value;

    if (firstNumberText === "" || secondNumberText === "") {
        showMessage("Error: both number fields are required.", "error");
        return;
    }

    const firstNumber = Number(firstNumberText);
    const secondNumber = Number(secondNumberText);

    if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
        showMessage("Error: enter valid real numbers.", "error");
        return;
    }

    let result;

    switch (operation) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                showMessage("Error: division by zero is not allowed.", "error");
                return;
            }

            result = firstNumber / secondNumber;
            break;

        default:
            showMessage("Error: select a valid operation.", "error");
            return;
    }

    showMessage(formatResult(result), "success");
}

// Removes floating-point noise (e.g. 0.1 + 0.2 -> 0.3)
function formatResult(value) {
    return String(parseFloat(value.toPrecision(12)));
}

function resetCalculator() {
    calculatorForm.reset();
    showMessage(DEFAULT_MESSAGE, "neutral");
    firstNumberInput.focus();
}

function exitCalculator() {
    const confirmed = confirm("Do you want to exit the calculator?");

    if (!confirmed) {
        return;
    }

    calculatorForm.querySelectorAll("input, select, button").forEach((element) => {
        element.disabled = true;
    });

    showMessage(
        "Calculator session ended. You may now close this browser tab.",
        "neutral"
    );

    window.close();
}

// type: "neutral" | "success" | "error"
function showMessage(message, type) {
    resultOutput.textContent = message;
    resultOutput.classList.remove("error", "success");

    if (type === "error" || type === "success") {
        resultOutput.classList.add(type);
    }
}
