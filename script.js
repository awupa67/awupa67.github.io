// Animacja fade-in sekcji podczas scrollowania
const sections = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

sections.forEach(section => {
  observer.observe(section);
});

// Usuwanie ekranu ładowania po załadowaniu strony
window.onload = () => {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
};

// Funkcje gry Snake pozostają takie same
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');

const gridSize = 16;
let snake = [{ x: 7, y: 7 }];
let direction = { x: 0, y: 0 };
let apple = { x: 5, y: 5 };
let score = 0;
let gameInterval;

function startGame() {
  snake = [{ x: 7, y: 7 }];
  direction = { x: 0, y: 0 };
  apple = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
  score = 0;
  scoreDisplay.textContent = `Wynik: ${score
