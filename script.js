// Wybieramy liczby 6 i 7
const numbers = document.querySelectorAll('.number');

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

// Funkcja generująca losowy kolor
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
