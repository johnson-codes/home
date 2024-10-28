document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const dino = document.getElementById('dino');
    const obstacle = document.getElementById('obstacle');
    const tallCactus = document.getElementById('tallCactus');
    const scoreDisplay = document.getElementById('score');
    const controlButton = document.getElementById('controlButton');

    let score = 0;
    let isPlaying = false;
    let isJumping = false;
    let animationId;
    let isMusicPlaying = false;
    let currentObstacle = null;
    let isObstacleMoving = false;

    // Hide both obstacles initially
    obstacle.style.display = 'none';
    tallCactus.style.display = 'none';

    // Game control functions
    function toggleGame() {
        isPlaying = !isPlaying;
        controlButton.textContent = isPlaying ? 'Pause' : 'Start';
        
        if (isPlaying) {
            if (!isMusicPlaying) {
                bgMusic.play();
                isMusicPlaying = true;
            }
            startGame();
        } else {
            pauseGame();
            bgMusic.pause();
        }
    }

    function pauseGame() {
        cancelAnimationFrame(animationId);
        bgMusic.pause();
    }

    function startGame() {
        if (!currentObstacle) {
            spawnNewObstacle();
        }
        moveObstacle();
    }

    function spawnNewObstacle() {
        // Hide both obstacles first
        obstacle.style.display = 'none';
        tallCactus.style.display = 'none';

        // Select obstacle based on score
        if (score < 300) {
            currentObstacle = obstacle;
        } else if (score >= 300 && score < 500) {
            currentObstacle = Math.random() < 0.5 ? obstacle : tallCactus;
        } else {
            currentObstacle = tallCactus;
        }

        // Show and position the selected obstacle
        currentObstacle.style.display = 'block';
        currentObstacle.style.left = '100%';
        isObstacleMoving = true;
    }

    // Jump function - simplified and more reliable
    function jump() {
        if (!isJumping && isPlaying) {
            isJumping = true;
            dino.classList.remove('jump');
            void dino.offsetWidth; // Force reflow
            dino.classList.add('jump');
            
            setTimeout(() => {
                dino.classList.remove('jump');
                isJumping = false;
            }, 1200);
        }
    }

    // Click and keyboard handlers
    dino.addEventListener('click', jump);
    controlButton.addEventListener('click', toggleGame);
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            jump();
        }
    });

    // Collision detection
    function checkCollision() {
        if (!currentObstacle) return;
        
        const dinoRect = dino.getBoundingClientRect();
        const obstacleRect = currentObstacle.getBoundingClientRect();
        
        if (
            dinoRect.right > obstacleRect.left &&
            dinoRect.left < obstacleRect.right &&
            dinoRect.bottom > obstacleRect.top
        ) {
            gameOver();
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

        if (currentObstacle && isObstacleMoving) {
            const currentLeft = parseFloat(getComputedStyle(currentObstacle).left);
            
            if (currentLeft <= -20) {
                isObstacleMoving = false;
                currentObstacle.style.display = 'none';
                spawnNewObstacle();
            } else {
                currentObstacle.style.left = `${currentLeft - 5}px`;
            }

            checkCollision();
        }

        animationId = requestAnimationFrame(moveObstacle);
    }

    function gameOver() {
        isPlaying = false;
        alert(`Game Over! Score: ${score}`);
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        
        // Reset obstacles
        obstacle.style.display = 'none';
        tallCactus.style.display = 'none';
        currentObstacle = null;
        isObstacleMoving = false;
        
        controlButton.textContent = 'Start';
        cancelAnimationFrame(animationId);
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }
});
