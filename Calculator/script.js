document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.calculator_display')
    let previousInput = ''
    let currentInput = ''
    let operation = ''

    function updateDisplay() {
        display.textContent = currentInput || '0'
        console.log(currentInput)
    }

    function handleNumberClick(number) {
        currentInput += number;
        updateDisplay()
    }

    function handleOperatorClick(operator) {
        if (currentInput !== '') {
            if (previousInput !== '') {
            handleEqualClick()
                previousInput = currentInput
                currentInput = ''
                console.log(previousInput)
            } else {
                previousInput = currentInput
                currentInput = ''
                console.log(previousInput)
            }
            operation = operator
        } else if (previousInput !== '') {
            operation = operator
        }
    }

    function handleEqualClick() {
        if (previousInput !== '' && currentInput !== '') {
            const prev = parseFloat(previousInput)
            const current = parseFloat(currentInput)
            switch (operation) {
                case 'add':
                    currentInput = prev + current
                    break
                case 'subtract':
                    currentInput = prev - current
                    break
                case 'multiply':
                    currentInput = prev * current
                    break
                case 'divide':
                    currentInput = prev / current
                    break
                default:
                    break
            }
            previousInput = ''
            operation = ''
            updateDisplay()
        }
    }

    function handleDecimalClick() {
        if (currentInput.includes('.')) {
            currentInput += '.'
            updateDisplay()
            console.log(currentInput)
        }
    }

    function handleClearClick() {
        previousInput = ''
        currentInput = ''
        operation = ''
        updateDisplay()
        console.log(previousInput)
        console.log(currentInput)
    }

    document.querySelectorAll('.calculator_keys button').forEach(button => {
        button.addEventListener('click', function () {
            const action = this.dataset.action
            const buttonContent = this.textContent
            if (!action) {
                handleNumberClick(buttonContent)
            } else if (action === 'clear') {
                handleClearClick()
            } else if (action === 'decimal') {
                handleDecimalClick()
            } else if (action === 'calculate') {
                handleEqualClick()
            } else {
                handleOperatorClick(action)
            }
            console.log(operation)
        })
    })
})