// DOM references
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

// An array to store our running calculation
let calculation = [];

// An array has commas by default, we remove them and store the result array into our total variable.
let total;

function calculate(button) {
    const value = button.textContent;

    if(value === 'AC') {
        calculation = [];
        total = 0;
        display.textContent = '0';
    } else if(value === '=') {
        let result = eval(total);
        if(result === 'Infinity') {
            display.textContent = 'Naw'
        }
        display.textContent = result;
    } else {
        calculation.push(value)
        total = calculation.join('')
        display.textContent = total
        console.log(total);

    }
}

buttons.forEach(button => button.addEventListener('click', () => calculate(button)));



