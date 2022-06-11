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
  currentNumber = result;
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
const author = document.querySelectorAll(".author");
const dark = document.getElementById("dark");
const light = document.getElementById("light");
const toggle = document.querySelector(".toggle");

dark.addEventListener("click", () => {
  dark.classList.add("active-dark");
  dark.classList.remove("nonactive-dark");
  light.classList.add("nonactive-light");
  light.classList.remove("active-ligth");
  toggle.classList.remove("toggle-light");

  numbers.forEach((number) => number.classList.remove("number-light"));
  button.forEach((btn) => btn.classList.remove("button-light"));
  author.forEach((author) => author.classList.remove("author-light"));
  bottomBackground.classList.remove("calculator-keys-light");
  backgroundColor.classList.remove("calculator-white");
  calculatorScreen.classList.remove("calculator-screen-light");
  prevCalculatorScreen.classList.remove("calculator-prev-screen-light");
  decimal.classList.remove("number-light");
});

light.addEventListener("click", () => {
  dark.classList.remove("active-dark");
  dark.classList.add("nonactive-dark");
  light.classList.add("active-light");
  light.classList.remove("nonactive-light");
  numbers.forEach((number) => number.classList.add("number-light"));
  button.forEach((btn) => btn.classList.add("button-light"));
  author.forEach((author) => author.classList.add("author-light"));
  bottomBackground.classList.add("calculator-keys-light");
  backgroundColor.classList.add("calculator-white");
  calculatorScreen.classList.add("calculator-screen-light");
  prevCalculatorScreen.classList.add("calculator-prev-screen-light");
  toggle.classList.add("toggle-light");
  decimal.classList.add("number-light");
});
