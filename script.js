const display = document.getElementById('display');
const buttons = document.querySelectorAll('[id*=tecla]');
const operators = document.querySelectorAll('[id*=operador]');

let newNumber = true;
let operator;
let previousNumber;

function updateDisplay(numero) {
    if(newNumber) {
        display.textContent = numero;
        newNumber = false;
    }
    else display.textContent += numero;
}

const insertNumber = (event) => {
    updateDisplay(event.target.textContent);
}

// Prototype são atributos e funções inerentes ao tipo

buttons.forEach((button) => button.addEventListener('click', insertNumber));

const selectOperator = (event) => {
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = display.textContent.replace(",",".");
}

operators.forEach((operator) => operator.addEventListener('click', selectOperator));

const calculate = () => {
    const actualNumber = display.textContent.replace(",",".");
    const result = eval(`${previousNumber}${operator}${actualNumber}`); //template string, utilizando craze
    newNumber = true;
    updateDisplay(result);
}

const equal = document.querySelector("#igual");

equal.addEventListener('click', calculate);

const clearDisplay = () => (display.textContent = "");

document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
  clearDisplay();
  newNumber = true;
  operator = undefined;
  previousNumber = undefined;
};

document.querySelector("#limparCalculo").addEventListener("click", clearCalc);

const removeLastNumber = () => 
    (display.textContent = display.textContent.slice(0,-1));

document.querySelector("#backspace").addEventListener("click", removeLastNumber);

const invertSignal = () => {
    newNumber = true;
    updateDisplay(display.textContent.replace(",",".") * -1);
}

document.querySelector("#inverter").addEventListener("click", invertSignal);

const existDecimal = () => display.textContent.indexOf(",") != -1;

const existValue = () => display.textContent.length > 0;

const insertDecimal = () => {
    if (!existDecimal()) {
        if(existValue()) {
            updateDisplay(",");
        }else{
            updateDisplay("0,");
        }
    }
}

document.querySelector("#decimal").addEventListener("click", insertDecimal);

const keyboardMap = {
    "0"         : "tecla0",
    "1"         : "tecla1",
    "2"         : "tecla2",
    "3"         : "tecla3",
    "4"         : "tecla4",
    "5"         : "tecla5",
    "6"         : "tecla6",
    "7"         : "tecla7",
    "8"         : "tecla8",
    "9"         : "tecla9",
    "/"         : "operadorDividir",
    "*"         : "operadorMultiplicar",
    "-"         : "operadorSubtrair",
    "+"         : "operadorAdicionar",
    "="         : "igual",
    "Enter"     : "igual",
    "Backspace" : "backspace",
    "c"         : "limparCalculo",
    "C"         : "limparCalculo",
    "Escape"    : "limparDisplay",
    ","         : "decimal"
}

const mappingKeyboard = (event) => {
    const calculatorKeys = event.key;

    const permitedKeys = () => Object.keys(keyboardMap).indexOf(calculatorKeys) != -1;

    if(permitedKeys())  document.getElementById(keyboardMap[calculatorKeys]).click();
}

document.addEventListener("keydown", mappingKeyboard);