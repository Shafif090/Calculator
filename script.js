document.addEventListener("DOMContentLoaded", function () {
  const display = document.querySelector(".display");
  const buttons = document.querySelectorAll(".buttons button");
  let currentInput = "0";
  let previousInput = "";
  let operator = "";

  buttons.forEach((button) => {
    button.addEventListener("click", () => handleButtonClick(button.textContent));
  });

  function handleButtonClick(value) {
    if (isNumberButton(value)) {
      updateInput(value);
    } else if (isOperator1Button(value)) {
      handleOperatorClick(value);
    } else if (isOperator2Button(value)) {
      handleOperator2Click(value);
    } else if (value === "=") {
      performCalculation();
    }
    updateDisplay();
  }

  function isNumberButton(value) {
    return /^\d$/.test(value) || value === ".";
  }

  function isOperator1Button(value) {
    return value.match(/[+\-×÷]/);
  }

  function isOperator2Button(value) {
    return value === "AC" || value === "+/-" || value === "%";
  }

  function handleOperatorClick(op) {
    if (currentInput !== "") {
      if (previousInput !== "") {
        calculate();
      } else {
        previousInput = currentInput;
      }
      operator = op;
      currentInput = "";
      updateDisplay();
    }
  }

  function handleOperator2Click(op) {
    if (op === "AC") {
      clearCalculator();
    } else if (op === "+/-") {
      toggleSign();
    } else if (op === "%") {
      calculatePercentage();
    }
  }

  function clearCalculator() {
    currentInput = "0";
    previousInput = "";
    operator = "";
  }

  function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
  }

  function calculatePercentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
  }

  function updateInput(value) {
    if (value === "." && currentInput.includes(".")) return;
    if (currentInput === "0" || currentInput === "-0") {
      currentInput = value;
    } else {
      currentInput += value;
    }
  }

  function performCalculation() {
    if (operator && currentInput && previousInput) {
      calculate();
    }
  }

  function calculate() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    if (!isNaN(num1) && !isNaN(num2)) {
      switch (operator) {
        case "+":
          currentInput = (num1 + num2).toString();
          break;
        case "-":
          currentInput = (num1 - num2).toString();
          break;
        case "×":
          currentInput = (num1 * num2).toString();
          break;
        case "÷":
          if (num2 !== 0) {
            currentInput = (num1 / num2).toString();
          } else {
            currentInput = "Error";
          }
          break;
        default:
          break;
      }
    }

    previousInput = "";
    operator = "";
  }

  function updateDisplay() {
    let displayText = "";

    if (previousInput && operator) {
      displayText += `${previousInput} ${operator} `;
    }

    displayText += currentInput;

    display.innerText = displayText;
  }

  updateDisplay();
});
