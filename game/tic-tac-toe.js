document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const resetButton = document.getElementById("resetButton");
    const statusDisplay = document.createElement("div");
    statusDisplay.classList.add("status");
    document.body.insertBefore(statusDisplay, board);

    // Create audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    let currentPlayer = "X";
    const cells = Array(25).fill(null);
    let gameActive = true;

    function createClickSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Frequency in hertz

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.05);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.05);
    }

    function createBoard() {
        board.innerHTML = "";
        cells.fill(null);
        cells.forEach((_, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.addEventListener("click", () => makeMove(index));
            board.appendChild(cell);
        });
        gameActive = true;
        currentPlayer = "X";
        updateStatus();
    }

    function makeMove(index) {
        if (gameActive && !cells[index]) {
            createClickSound();
            cells[index] = currentPlayer;
            const cell = board.children[index];
            cell.classList.add(currentPlayer.toLowerCase());
            if (checkWinner(index)) {
                gameActive = false;
                updateStatus(`Player ${currentPlayer} wins!`);
            } else if (cells.every(cell => cell !== null)) {
                gameActive = false;
                updateStatus("It's a draw!");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                updateStatus();
            }
        }
    }

    function checkWinner(index) {
        const winLines = [
            [0, 1, 2], [1, 2, 3], [2, 3, 4],                 // Rows
            [5, 6, 7], [6, 7, 8], [7, 8, 9],
            [10, 11, 12], [11, 12, 13], [12, 13, 14],
            [15, 16, 17], [16, 17, 18], [17, 18, 19],
            [20, 21, 22], [21, 22, 23], [22, 23, 24],
            [0, 5, 10], [5, 10, 15], [10, 15, 20],           // Columns
            [1, 6, 11], [6, 11, 16], [11, 16, 21],
            [2, 7, 12], [7, 12, 17], [12, 17, 22],
            [3, 8, 13], [8, 13, 18], [13, 18, 23],
            [4, 9, 14], [9, 14, 19], [14, 19, 24],
            [0, 6, 12], [1, 7, 13], [2, 8, 14],              // Diagonals
            [5, 11, 17], [6, 12, 18], [7, 13, 19],
            [10, 16, 22], [11, 17, 23], [12, 18, 24],
            [2, 6, 10], [3, 7, 11], [4, 8, 12],
            [7, 11, 15], [8, 12, 16], [9, 13, 17],
            [12, 16, 20], [13, 17, 21], [14, 18, 22]
        ];

        return winLines
            .filter(line => line.includes(index))
            .some(line => line.every(i => cells[i] === currentPlayer));
    }

    function updateStatus(message) {
        if (message) {
            statusDisplay.textContent = message;
        } else {
            statusDisplay.innerHTML = `Player <span class="player-${currentPlayer.toLowerCase()}">${currentPlayer}</span>'s turn`;
        }
    }

    resetButton.addEventListener("click", () => {
        createClickSound();
        createBoard();
    });

    createBoard();
});
