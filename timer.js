document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const selectedDuration = document.getElementById('selectedDuration');
    const durationOptions = document.getElementById('durationOptions');

    let countdown;
    let remainingTime = 0;

    // Populate the custom select with 60 options
    for (let i = 1; i <= 60; i++) {
        const option = document.createElement('div');
        option.textContent = `${i} min`;
        option.setAttribute('data-value', i * 60); // Store seconds as data attribute
        durationOptions.appendChild(option);
    }

    // Show/hide options
    selectedDuration.addEventListener('click', () => {
        durationOptions.style.display = durationOptions.style.display === 'block' ? 'none' : 'block';
    });

    // Handle option selection
    durationOptions.addEventListener('click', (e) => {
        if (e.target !== durationOptions) {
            selectedDuration.textContent = e.target.textContent;
            durationOptions.style.display = 'none';
        }
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', (e) => {
        if (!e.target.matches('.custom-select-selected')) {
            durationOptions.style.display = 'none';
        }
    });

    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
        timerDisplay.textContent = display;
    }

    function timer(seconds) {
        clearInterval(countdown);

        const now = Date.now();
        const then = now + seconds * 1000;

        displayTimeLeft(seconds);

        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);

            if (secondsLeft < 0) {
                clearInterval(countdown);
                timerDisplay.textContent = "Time's up!";
                startBtn.disabled = false;
                return;
            }

            displayTimeLeft(secondsLeft);
        }, 1000);
    }

    function startTimer() {
        const selectedOption = durationOptions.querySelector(`div[data-value="${selectedDuration.textContent.split(' ')[0] * 60}"]`);
        const seconds = parseInt(selectedOption.getAttribute('data-value'));
        if (seconds > 0) {
            timer(seconds);
            startBtn.disabled = true;
        }
    }

    function resetTimer() {
        clearInterval(countdown);
        timerDisplay.textContent = '00:00';
        startBtn.disabled = false;
    }

    startBtn.addEventListener('click', startTimer);
    resetBtn.addEventListener('click', resetTimer);
});
