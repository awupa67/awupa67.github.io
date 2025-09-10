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
  scoreDisplay.textContent = `Wynik: ${score}`;

  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 200);
  render();
}

function gameLoop() {
  const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (newHead.x < 0 || newHead.x >= gridSize || newHead.y < 0 || newHead.y >= gridSize || checkCollision(newHead)) {
    clearInterval(gameInterval);
    alert('Game Over!');
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === apple.x && newHead.y === apple.y) {
    apple = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
    score++;
    scoreDisplay.textContent = `Wynik: ${score}`;
  } else {
    snake.pop();
  }

  render();
}

function checkCollision(newHead) {
  return snake.some(segment => segment.x === newHead.x && segment.y === newHead.y);
}

function render() {
  gameContainer.innerHTML = '';
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (snake.some(segment => segment.x === x && segment.y === y)) {
        cell.style.backgroundColor = 'green';
      }
      if (apple.x === x && apple.y === y) {
        cell.style.backgroundColor = 'red';
      }
      gameContainer.appendChild(cell);
    }
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && direction.y !== 1) direction = { x: 0, y: -1 };
  if (event.key === 'ArrowDown' && direction.y !== -1) direction = { x: 0, y: 1 };
  if (event.key === 'ArrowLeft' && direction.x !== 1) direction = { x: -1, y: 0 };
  if (event.key === 'ArrowRight' && direction.x !== -1) direction = { x: 1, y: 0 };
});

// Start gry
startGame();
