// Wybieramy wszystkie liczby na stronie, które mają klasę .number (6 i 7)
const numbers = document.querySelectorAll('.number');

// Funkcja generująca losowy kolor
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Funkcja zmieniająca kolor na kliknięcie
numbers.forEach(number => {
  number.addEventListener('click', () => {
    // Losowy kolor
    const randomColor = getRandomColor();
    
    // Zmieniamy kolor tekstu liczby
    number.style.color = randomColor;
    
    // Animacja "kliknięcia" (powiększanie) w JS
    number.classList.add('clicked');
    setTimeout(() => {
      number.classList.remove('clicked');
    }, 200);
  });
});

// Sekcja gry Snake

let gameContainer = document.getElementById('game-container');
let scoreDisplay = document.getElementById('score');
let startButton = document.getElementById('start-btn');

let snake = [{ x: 8, y: 8 }];
let direction = 'RIGHT';
let apple = { x: 5, y: 5 };
let gameInterval;
let score = 0;

// Funkcja rysująca planszę
function drawBoard() {
  gameContainer.innerHTML = ''; // Czyścimy poprzedni stan gry
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      let cell = document.createElement('div');
      cell.classList.add('cell');
      if (snake.some(segment => segment.x === i && segment.y === j)) {
        cell.classList.add('snake');
      }
      if (apple.x === i && apple.y === j) {
        cell.classList.add('apple');
      }
      gameContainer.appendChild(cell);
    }
  }
}

// Funkcja aktualizująca ruch wężem
function updateSnakePosition() {
  let head = { ...snake[0] };
  switch (direction) {
    case 'UP': head.y -= 1; break;
    case 'DOWN': head.y += 1; break;
    case 'LEFT': head.x -= 1; break;
    case 'RIGHT': head.x += 1; break;
  }
  snake.unshift(head);

  // Sprawdzanie, czy wąż zjada jabłko
  if (head.x === apple.x && head.y === apple.y) {
    score += 1;
    apple = generateApple();
    scoreDisplay.textContent = `Wynik: ${score}`;
  } else {
    snake.pop();
  }

  // Sprawdzanie kolizji z krawędzią lub własnym ciałem
  if (
    head.x < 0 || head.x >= 16 || head.y < 0 || head.y >= 16 ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert('Koniec gry! Twoje wynik: ' + score);
    score = 0;
    scoreDisplay.textContent = `Wynik: ${score}`;
    snake = [{ x: 8, y: 8 }];
    direction = 'RIGHT';
  }

  drawBoard();
}

// Funkcja generująca nowe jabłko
function generateApple() {
  let x = Math.floor(Math.random() * 16);
  let y = Math.floor(Math.random() * 16);
  while (snake.some(segment => segment.x === x && segment.y === y)) {
    x = Math.floor(Math.random() * 16);
    y = Math.floor(Math.random() * 16);
  }
  return { x, y };
}

// Funkcja startowa gry
function startGame() {
  score = 0;
  snake = [{ x: 8, y: 8 }];
  direction = 'RIGHT';
  scoreDisplay.textContent = `Wynik: ${score}`;
  gameInterval = setInterval(updateSnakePosition, 100);
}

// Nasłuchiwanie na klawisze
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
  if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Przycisk startowy
startButton.addEventListener('click', startGame);

// Uruchomienie gry po kliknięciu w przycisk
startButton.style.display = 'inline-block';

// Początkowy stan planszy
drawBoard();
