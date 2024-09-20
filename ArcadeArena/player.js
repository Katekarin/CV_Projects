// player.js

// Inicjalizacja HP gracza
const playerOne = {
  level: 1,
  exp: 0,
  nextLevelExp: 10,
  hp: 100
};


// Stała określająca opóźnienie między strzałami (w milisekundach)
const fireRate = 1000; // Jedna strzał na sekundę

// Zmienna przechowująca czas ostatniego strzału gracza
let lastFireTime = 0;

// Funkcja obsługująca strzał gracza z uwzględnieniem szybkostrzelności
function playerShoot(event) {
  const currentTime = Date.now();
  
  // Sprawdź czy upłynęło wystarczająco czasu od ostatniego strzału
  if (currentTime - lastFireTime < fireRate) {
    // Zbyt szybkie strzelanie - zablokuj strzał
    return;
  }
  
  // Wystarczająco długi odstęp czasu - wykonaj strzał
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  createBullet(playerX + 25, playerY + 25, mouseX, mouseY);
  
  // Zaktualizuj czas ostatniego strzału
  lastFireTime = currentTime;
}

function increaseExp(amount) {
  playerOne.exp += amount;

  // Sprawdź, czy gracz zdobył wystarczająco dużo EXP, aby awansować
  if (playerOne.exp >= playerOne.nextLevelExp) {
    levelUp();
  }
}

function levelUp() {
  playerOne.level++; // Zwiększamy poziom gracza
  playerOne.exp = 0; // Resetujemy EXP po awansie
  playerOne.nextLevelExp = 10 * Math.pow(playerOne.level, playerOne.level); // Nowe wymagania EXP na kolejny poziom

  // Możesz tutaj dodać inne efekty, np. zwiększenie życia gracza
  playerOne.hp += 10; // Dodajemy np. 20 HP za każdy poziom

  alert(`Level up! You are now level ${playerOne.level}`);
}

