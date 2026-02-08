// Image Carousel Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

function moveSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Page Navigation
function switchPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // Show target page
    document.getElementById(pageId).classList.add('active');
}

// "No" Button Logic (The Fun Part)
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
let noClickCount = 0;

function moveNoButton() {
    const container = document.querySelector('.content-box');
    const containerRect = container.getBoundingClientRect();

    // Calculate max bounds with a safe buffer (50px)
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;

    const maxX = window.innerWidth - buttonWidth - 50;
    const maxY = window.innerHeight - buttonHeight - 50;

    // Ensure it doesn't go negative or off-screen
    const randomX = Math.max(50, Math.random() * maxX);
    const randomY = Math.max(50, Math.random() * maxY);

    // Apply new position
    noBtn.style.position = 'fixed'; // Change to fixed to move freely
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Reduce size & opacity slightly each time
    let scale = 1 - (noClickCount * 0.1);
    if (scale < 0.5) scale = 0.5; // Minimum size
    noBtn.style.transform = `scale(${scale})`;

    noClickCount++;
}

// Floating Message Logic
function showFloatingMessage(x, y) {
    const msg = document.createElement('div');
    msg.innerText = "Think again please! 🥺";
    msg.style.position = 'fixed';
    msg.style.left = x + 'px';
    msg.style.top = y + 'px';
    msg.style.transform = 'translate(-50%, -50%)'; // Center on click
    msg.style.color = '#e63946';
    msg.style.fontWeight = 'bold';
    msg.style.fontSize = '1.5rem';
    msg.style.pointerEvents = 'none';
    msg.style.zIndex = '1000';
    msg.style.transition = 'all 1s ease-out';
    msg.style.textShadow = '2px 2px 4px rgba(255, 255, 255, 0.8)';

    document.body.appendChild(msg);

    // Animate up and fade out
    setTimeout(() => {
        msg.style.opacity = '0';
        msg.style.transform = 'translate(-50%, -100px)';
    }, 50);

    // Clean up
    setTimeout(() => {
        msg.remove();
    }, 1000);
}


// Handle "No" Click (same as hover)
function handleNoClick() {
    // Get current position of the button before it moves
    const rect = noBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Show the message
    showFloatingMessage(x, y);

    // Move the button
    moveNoButton();
}

// Handle "Yes" Click
function handleYesClick() {
    // Confetti Explosion!
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e63946', '#ff9a9e', '#fecfef']
    });

    // Wait a moment then switch
    setTimeout(() => {
        switchPage('page3');
    }, 1000);
}


// WhatsApp Sending Logic
function sendToWhatsApp() {
    const message = document.getElementById('love-note').value;
    const phoneNumber = "919654570967"; // Updated with your number

    if (message.trim() === "") {
        alert("Please write a sweet message first! 🥺");
        return;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open in new tab
    window.open(whatsappUrl, '_blank');
}

// Initialize
// (Optional) Auto-play carousel
setInterval(() => {
    // Only auto-play if page 1 is active
    if (document.getElementById('page1').classList.contains('active')) {
        moveSlide(1);
    }
}, 3000);
