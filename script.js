const numbers = document.querySelectorAll(".number");
const calculatorScreen = document.querySelector(".calculator-screen");
const prevCalculatorScreen = document.querySelector(".calculator-prev-screen");
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".equal-sign");
const clearBtn = document.querySelector(".all-clear");
const decimal = document.querySelector(".decimal");
const percentage = document.querySelector(".percentage");

let prevNumber = "";
let calculationOperator = "";
let currentNumber = "0";
let calculationOperatorDisplay = "";
let calculationPercentage = "";
let result = "";

//  EventListener
percentage.addEventListener("click", () => {
  inputPercentage(currentNumber);
  updateScreen(currentNumber);
});

decimal.addEventListener("click", (event) => {
  inputDecimal(event.target.value);
  updateScreen(currentNumber);
});

clearBtn.addEventListener("click", () => {
  clearAll();
  prevScreen(prevNumber, calculationOperatorDisplay);
  updateScreen(currentNumber);
});

equalSign.addEventListener("click", () => {
  calculate();
  updateScreen(currentNumber);
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    if (currentNumber && prevNumber && calculationOperator) {
      calculate();
    }
    inputOperator(event.target.value, operator.childNodes[0].data);
    prevScreen(prevNumber, calculationOperatorDisplay);
    updateScreen(currentNumber);
  });
});

numbers.forEach((number) =>
  number.addEventListener("click", (event) => {
    inputNumber(event.target.value);
    updateScreen(currentNumber);
    console.log(currentNumber);
  })
);

//function

const inputPercentage = (number) => {
  result = number / 100;
  currentNumber = result
};

const inputOperator = (operator, operatorDisplay) => {
  if (calculationOperator === "") {
    prevNumber = currentNumber;
    calculationOperatorDisplay = operatorDisplay;
  }
  calculationOperator = operator;
  currentNumber = "";
};

const inputDecimal = (dot) => {
  if (currentNumber.includes(".")) {
    return;
  }
  currentNumber += dot;
};

const clearAll = () => {
  prevNumber = "";
  calculationOperator = "";
  currentNumber = "0";
  calculationOperatorDisplay = "";
};

const prevScreen = (number, operator) => {
  let numberOperator = (number += operator);
  prevCalculatorScreen.value = numberOperator;
};

const updateScreen = (number) => {
  calculatorScreen.value = number;
};

const inputNumber = (number) => {
  if (currentNumber === "0") {
    currentNumber = number;
  } else if (result) {
    prevNumber = result;
    result = "";
    currentNumber = result;
    currentNumber += number;
  } else {
    currentNumber += number;
  }
};

const calculate = () => {
  switch (calculationOperator) {
    case "+":
      result = parseFloat(prevNumber) + parseFloat(currentNumber);
      break;
    case "-":
      result = parseFloat(prevNumber) - parseFloat(currentNumber);
      break;
    case "*":
      result = parseFloat(prevNumber) * parseFloat(currentNumber);
      break;
    case "/":
      result = parseFloat(prevNumber) / parseFloat(currentNumber);
      break;
    default:
      break;
  }
  currentNumber = result;
  calculationOperator = "";
};

// Toggle theme
const theme = document.getElementById("theme");
const backgroundColor = document.getElementById("bg");
const bottomBackground = document.querySelector(".calculator-keys");
const button = document.querySelectorAll("button");
const author = document.querySelectorAll(".author")

theme.addEventListener("click", () => {
  theme.classList.toggle("dark-btn");
  theme.classList.toggle("fa-toggle-on");
  backgroundColor.classList.toggle("calculator-white");
  calculatorScreen.classList.toggle("calculator-screen-light");
  prevCalculatorScreen.classList.toggle("calculator-prev-screen-light");
  bottomBackground.classList.toggle("calculator-keys-light");
  decimal.classList.toggle("number-light");
  numbers.forEach((number) => number.classList.toggle("number-light"));
  button.forEach((btn) => btn.classList.toggle("button-light"));
  author.forEach(author=>(
    author.classList.toggle("author-light")
  ))
});
