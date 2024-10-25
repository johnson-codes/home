document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const timerDuration = document.getElementById('timerDuration');
    const customTime = document.getElementById('customTime');

    let countdown;
    let remainingTime = 0;

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
        let seconds;
        if (timerDuration.value === 'custom') {
            seconds = parseInt(customTime.value);
        } else {
            seconds = parseInt(timerDuration.value);
        }
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

    timerDuration.addEventListener('change', function() {
        if (this.value === 'custom') {
            customTime.style.display = 'inline-block';
        } else {
            customTime.style.display = 'none';
        }
    });
});
