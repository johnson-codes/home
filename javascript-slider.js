let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const indicatorsContainer = document.querySelector('.slider-indicators');
let startX, moveX, isDragging = false;

// Create indicators
for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    indicator.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(indicator);
}

const indicators = document.querySelectorAll('.indicator');

function updateIndicators() {
    indicators.forEach((ind, index) => {
        ind.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
}

function updateSlider() {
    const offset = -currentIndex * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
    updateIndicators();
}

// Swipe functionality
const sliderContainer = document.querySelector('.slider');
sliderContainer.addEventListener('mousedown', startDrag);
sliderContainer.addEventListener('touchstart', startDrag);
sliderContainer.addEventListener('mousemove', drag);
sliderContainer.addEventListener('touchmove', drag);
sliderContainer.addEventListener('mouseup', endDrag);
sliderContainer.addEventListener('touchend', endDrag);
sliderContainer.addEventListener('mouseleave', endDrag);

function startDrag(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    e.preventDefault();
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    moveX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const diff = moveX - startX;
    if (Math.abs(diff) > 50) { // Threshold for swipe
        if (diff > 0) {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        } else {
            currentIndex = (currentIndex + 1) % totalSlides;
        }
        updateSlider();
        isDragging = false;
    }
}

function endDrag() {
    isDragging = false;
}

// Auto-advance slides
setInterval(showNextSlide, 4000);

// Initialize
updateIndicators();
