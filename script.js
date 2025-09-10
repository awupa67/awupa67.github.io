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

// Snake Game
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
  gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
  // Move the snake
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  // Check for apple collision
  if (head.x === apple.x && head.y === apple.y) {
    score++;
    scoreDisplay.textContent = `Wynik: ${score}`;
    apple = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
  } else {
    snake.pop();
  }

  // Check for wall collision
  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || snakeCollision()) {
    startGame();
  }

  // Draw the game
  drawGame();
}

function drawGame() {
  gameContainer.innerHTML = '';
  
  // Rysowanie siatki
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      
      // Rysowanie węża
      if (snake.some(segment => segment.x === x && segment.y === y)) {
        cell.style.backgroundColor = 'green';
      }
      // Rysowanie jabłka
      if (apple.x === x && apple.y === y) {
        cell.style.backgroundColor = 'red';
      }
      
      gameContainer.appendChild(cell);
    }
  }
}

// Sprawdzanie kolizji węża z samym sobą
function snakeCollision() {
  const head = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Sterowanie ruchem
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y !== 1) {
        direction = { x: 0, y: -1 };
      }
      break;
    case 'ArrowDown':
      if (direction.y !== -1) {
        direction = { x: 0, y: 1 };
      }
      break;
    case 'ArrowLeft':
      if (direction.x !== 1) {
        direction = { x: -1, y: 0 };
      }
      break;
    case 'ArrowRight':
      if (direction.x !== -1) {
        direction = { x: 1, y: 0 };
      }
      break;
  }
});

// Uruchomienie gry po załadowaniu strony
window.onload = startGame;
