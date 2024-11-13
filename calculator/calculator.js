let display = document.getElementById('display');

function playSound() {
    var sound = document.getElementById('button-sound');
    sound.play();
}

function appendToDisplay(value) {
    beep(); // Play beep sound
    var display = document.getElementById('display');
    if (display.innerText === "0") {
        display.innerText = value;
    } else {
        display.innerText += value;
    }
}

function clearDisplay() {
    beep(); // Play beep sound
    document.getElementById('display').innerText = "0";
}

function calculate() {
    beep(); // Play beep sound
    var display = document.getElementById('display');
    try {
        // Safely evaluate the expression
        let result = eval(display.innerText);
        // Handle division by zero and other potential issues
        if (!isFinite(result)) {
            display.innerText = "Error";
        } else {
            display.innerText = result;
        }
    } catch (e) {
        display.innerText = "Error";
    }
}

function backspace() {
    beep(); // Play beep sound
    var display = document.getElementById('display');
    if (display.innerText.length > 1) {
        display.innerText = display.innerText.slice(0, -1);
    } else {
        display.innerText = "0";
    }
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9().]/.test(key)) {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
