// Select elements
const calculation = document.querySelector('.calculation');
const result = document.querySelector('.result');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let previousInput = '';
let operationPerformed = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    // Clear all inputs and reset the calculator
    if (value === 'clear') {
      currentInput = '';
      operator = '';
      previousInput = '';
      calculation.textContent = '';
      result.textContent = '';
      operationPerformed = false; // Reset operationPerformed flag
    } 
    // Delete the last input character
    else if (value === 'del') {
      currentInput = currentInput.slice(0, -1);
      calculation.textContent = previousInput + ' ' + operator + ' ' + currentInput;
    } 
    // Handle operator inputs
    else if (['+', '-', '*', '/', '%'].includes(value)) {
      if (currentInput !== '') {
        previousInput = currentInput;
        currentInput = '';
        operator = value;
        calculation.textContent = previousInput + ' ' + operator;
      }
    } 
    // Perform the calculation
    else if (value === '=') {
      if (previousInput !== '' && currentInput !== '') {
        try {
          currentInput = eval(previousInput + operator + currentInput);
          result.textContent = currentInput;
          operationPerformed = true;
        } catch (error) {
          result.textContent = 'Error';
        }
      }
    } 
    // Handle number and dot inputs
    else {
      if (operationPerformed) {
        currentInput = value;
        operationPerformed = false;
      } else {
        currentInput += value;
      }
      calculation.textContent = previousInput + ' ' + operator + ' ' + currentInput;
    }
  });
});