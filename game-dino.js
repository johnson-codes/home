document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.loop = false; // Ensure looping is controlled manually

    const dino = document.getElementById('dino');
    const obstacle = document.getElementById('obstacle');
    const scoreDisplay = document.getElementById('score');
    const controlButton = document.getElementById('controlButton');

    let score = 0;
    let isPlaying = false; // Set initial state to not playing
    let isJumping = false;
    let animationId;
    let isMusicPlaying = false;

    // Game control functions
    function toggleGame() {
        isPlaying = !isPlaying;
        controlButton.textContent = isPlaying ? 'Pause' : 'Start'; // Change to 'Start' when paused
        
        if (isPlaying) {
            if (!isMusicPlaying) {
                bgMusic.play();
                isMusicPlaying = true;
            } else {
                bgMusic.play(); // Continue playing from the current position
            }
            startGame();
        } else {
            pauseGame();
            bgMusic.pause(); // Only pause the music, do not reset the time
        }
    }

    function pauseGame() {
        cancelAnimationFrame(animationId);
        bgMusic.pause(); // Pause the music without resetting the time
    }

    function startGame() {
        moveObstacle();
    }

    // Jump function - simplified and more reliable
    function jump() {
        if (!isJumping && isPlaying) {
            isJumping = true;
            dino.classList.remove('jump'); // Remove first to reset animation
            void dino.offsetWidth; // Force reflow
            dino.classList.add('jump');
            
            setTimeout(() => {
                dino.classList.remove('jump');
                isJumping = false;
            }, 1200); // changed from 800 to 1200 to match new animation duration
        }
    }

    // Click and keyboard handlers
    dino.addEventListener('click', jump);
    controlButton.addEventListener('click', toggleGame);
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault(); // Prevent page scrolling
            jump();
        }
    });

    // Collision detection
    function checkCollision() {
        const dinoRect = dino.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();
        
        if (
            dinoRect.right > obstacleRect.left &&
            dinoRect.left < obstacleRect.right &&
            dinoRect.bottom > obstacleRect.top
        ) {
            isPlaying = false;
            alert(`Game Over! Score: ${score}`);
            score = 0;
            scoreDisplay.textContent = `Score: ${score}`;
            obstacle.style.left = '100%';
            controlButton.textContent = 'Start';
            cancelAnimationFrame(animationId);
            bgMusic.pause(); // Stop the music when the game is over
            bgMusic.currentTime = 0; // Reset the music to the start only on game over
        }
    }

    // Score counter - more efficient
    setInterval(() => {
        if (isPlaying) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }, 100);

    // Obstacle animation - using requestAnimationFrame for smooth movement
    function moveObstacle() {
        if (!isPlaying) return;

        const currentLeft = parseFloat(getComputedStyle(obstacle).left);
        
        if (currentLeft <= -20) {
            obstacle.style.left = '100%';
        } else {
            obstacle.style.left = (currentLeft - 5) + 'px';
        }

        checkCollision();
        animationId = requestAnimationFrame(moveObstacle);
    }
});
