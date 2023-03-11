// DOM references
const display = document.getElementById('display');
const AC = document.getElementById('AC-button');
const twoButton = document.getElementById('two-button');
const plusButton = document.getElementById('plus-button');
const totalButton = document.getElementById('total-button');
// Variables being used

let previousValue = 0;
let currentValue = 0; 
let operator = '';
let total = 0;

// Clear Screen function.
// display 0 and reset all variables
AC.onclick = function clearDisplay() {
display.textContent = '0';
previousValue = 0;
currentValue = 0;
operator = '';
total = 0;
}

// Plus button click function.
function plusButtonClick() {
    if (operator === '') {
        previousValue = parseFloat(currentValue);
    } else {
        performOperation();
    }
    operator = '+';
    currentValue = 0;
}

// Equals button click function.
function equalsButtonClick() {
    performOperation();
    operator = '';
    currentValue = total;
    display.textContent = total;
}

// Addition function.
function performOperation() {
    switch (operator) {
        case '+':
            total = previousValue + parseFloat(currentValue);
            break;
        default:
            break;
    }
}

// Event listeners for number buttons.
document.querySelectorAll('.number').forEach((button) => {
    button.addEventListener('click', () => {
        currentValue = parseFloat(currentValue.toString() + button.textContent);
        display.textContent = currentValue;
    });
});

// Event listener for plus button.
plusButton.onclick = plusButtonClick;

// Event listener for equals button.
equalsButton.onclick = equalsButtonClick;






