document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.display');
    const operatorKeys = document.querySelectorAll('.key--operator');
    let previousInput = '';
    let currentInput = '';
    let operation = '';

    function updateDisplay() {
        display.textContent = currentInput || '0';
    }

    function setActiveOperatorKey() {
        operatorKeys.forEach(key => {
            key.classList.remove('active');
        });
        const activeOperatorKey = document.querySelector(`.key--operator[data-action="${operation}"]`);
        if (activeOperatorKey) {
            activeOperatorKey.classList.add('active');
        }
    }

    function handleNumberClick(number) {
        currentInput += number;
        updateDisplay();
        console.log('Current input:', currentInput);
    }

    function handleOperatorClick(op) {
        if (currentInput !== '') {
            if (previousInput !== '') {
                handleEqualClick(); // Perform calculation if previous input and operation exist
                previousInput = currentInput; // Store the result as the previous input
                currentInput = ''; // Reset the current input for the next number
            } else {
                previousInput = currentInput;
                currentInput = ''; // Reset the current input for the next number
            }
            operation = op;
            setActiveOperatorKey();
            console.log('Previous input:', previousInput);
            console.log('Operation:', operation);
        } else if (previousInput !== '') {
            operation = op; // If only previous input exists, update the operation
            setActiveOperatorKey();
            console.log('Operation:', operation);
        }
    }

    function handleEqualClick() {
        if (previousInput !== '' && currentInput !== '') {
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            switch (operation) {
                case 'add':
                    currentInput = prev + current;
                    break;
                case 'subtract':
                    currentInput = prev - current;
                    break;
                case 'multiply':
                    currentInput = prev * current;
                    break;
                case 'divide':
                    currentInput = prev / current;
                    break;
                case 'exponent' :
                    currentInput = Math.pow(prev, current)
                    break;
                case 'sqrt' :
                    currentInput = Math.pow(current, 1/prev)
                    break;
                default:
                    break;
            }
            previousInput = '';
            operation = '';
            setActiveOperatorKey();
            updateDisplay();
            console.log('Result:', currentInput);
        }
    }

    function handleDecimalClick() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
            console.log('Current input:', currentInput);
        }
    }

    function handleClearClick() {
        previousInput = '';
        currentInput = '';
        operation = '';
        setActiveOperatorKey();
        updateDisplay();
        console.log('Previous input:', previousInput);
        console.log('Current input:', currentInput);
        console.log('Operation:', operation);
    }

    document.querySelectorAll('.keys button').forEach(button => {
        button.addEventListener('click', function () {
            const action = this.dataset.action;
            const buttonContent = this.textContent;
            if (!action) {
                handleNumberClick(buttonContent);
            } else if (action === 'clear') {
                handleClearClick();
            } else if (action === 'decimal') {
                handleDecimalClick();
            } else if (action === 'calculate') {
                handleEqualClick();
            } else {
                handleOperatorClick(action);
            }
        });
    });

    // Listen for keyboard events
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (!isNaN(key) || key === '.') { // If the key is a number or decimal point
            handleNumberClick(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') { // If the key is an operator
            handleOperatorClick(key === '*' ? 'multiply' : key === '/' ? 'divide' : key === '+' ? 'add' : 'subtract');
        } else if (key === '=' || key === 'Enter') { // If the key is the equals sign or Enter key
            handleEqualClick();
        } else if (key === 'Escape') { // If the key is the Escape key
            handleClearClick();
        }
    });
});

