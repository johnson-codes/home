document.getElementById('convertButton').addEventListener('click', function() {
    const category = document.getElementById('category').value;
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    let result;

    switch (category) {
        case 'weight':
            result = convertWeight(inputValue);
            break;
        case 'time':
            result = convertTime(inputValue);
            break;
        case 'area':
            result = convertArea(inputValue);
            break;
        case 'length':
            result = convertLength(inputValue);
            break;
        case 'temperature':
            result = convertTemperature(inputValue);
            break;
        default:
            result = 'Invalid category';
    }

    document.getElementById('result').innerText = `Result: ${result}`;
});

function convertWeight(value) {
    // Example: Convert kilograms to pounds
    return value * 2.20462;
}

function convertTime(value) {
    // Example: Convert hours to minutes
    return value * 60;
}

function convertArea(value) {
    // Example: Convert square meters to square feet
    return value * 10.7639;
}

function convertLength(value) {
    // Example: Convert meters to feet
    return value * 3.28084;
}

function convertTemperature(value) {
    // Example: Convert Celsius to Fahrenheit
    return (value * 9/5) + 32;
}
