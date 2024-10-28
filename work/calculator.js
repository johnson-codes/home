let display = document.getElementById('display');

function playSound() {
    var sound = document.getElementById('button-sound');
    sound.play();
}

function appendToDisplay(value) {
    var display = document.getElementById('display');
    if (display.innerText === "0") {
        display.innerText = value; // Replace the initial '0'
    } else {
        display.innerText += value; // Append value
    }
    playSound(); // Play beep sound
}

function clearDisplay() {
    document.getElementById('display').innerText = "0";
    playSound(); // Play beep sound
}

function calculate() {
    var display = document.getElementById('display');
    try {
        display.innerText = eval(display.innerText); // Evaluate the expression
    } catch (e) {
        display.innerText = "Error"; // Display error on invalid input
    }
    playSound(); // Play beep sound
}

function backspace() {
    var display = document.getElementById('display');
    display.innerText = display.innerText.slice(0, -1);
    if (display.innerText === "") {
        display.innerText = "0"; // Ensure there's always at least '0' displayed
    }
    playSound(); // Play beep sound
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
