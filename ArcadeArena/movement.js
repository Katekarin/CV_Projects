// Pobranie referencji do postaci gracza
const player = document.getElementById('player');
// Początkowa pozycja postaci gracza
let playerX = 50;
let playerY = 50;
// Obiekty przechowujące informacje o wciśniętych klawiszach
const keysPressed = {
  'w': false,
  'a': false,
  's': false,
  'd': false
};

// Kierunek ostatniego ruchu gracza
let lastDirection = 'right'; // Domyślnie ostatni ruch w prawo

// Funkcja resetująca pozycję postaci gracza
function resetPlayerPosition() {
  // Ustawienie pozycji początkowej postaci gracza
  player.style.left = playerX + 'px';
  player.style.top = playerY + 'px';
}

// Obsługa poruszania się postacią gracza za pomocą klawiatury
document.addEventListener('keydown', function(event) {
  // Zaktualizuj informacje o wciśniętych klawiszach
  keysPressed[event.key] = true;
});

document.addEventListener('keyup', function(event) {
  // Zaktualizuj informacje o zwolnionych klawiszach
  keysPressed[event.key] = false;
});

// Funkcja poruszająca postacią gracza na podstawie wciśniętych klawiszy
function movePlayer() {
  if (keysPressed['w']) playerY -= 5;
  if (keysPressed['a']) {
    playerX -= 5;
    lastDirection = 'left'; // Ustaw kierunek ruchu na lewo
  }
  if (keysPressed['s']) playerY += 5;
  if (keysPressed['d']) {
    playerX += 5;
    lastDirection = 'right'; // Ustaw kierunek ruchu na prawo
  }

  // Aktualizuj klasę CSS w zależności od ostatniego kierunku ruchu gracza
  if (lastDirection === 'left') {
    player.classList.add('player-left');
  } else {
    player.classList.remove('player-left');
  }

  // Ustaw pozycję postaci gracza
  player.style.left = playerX + 'px';
  player.style.top = playerY + 'px';
}
