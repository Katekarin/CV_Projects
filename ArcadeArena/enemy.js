// enemy.js

// Funkcja losująca liczbę całkowitą z przedziału <min, max>
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funkcja tworząca wroga i ustawiająca jego losową pozycję
function createEnemy() {
  const enemy = document.createElement('div');
  enemy.classList.add('enemy');
  enemy.style.left = getRandomInt(0, window.innerWidth) + 'px';
  enemy.style.top = getRandomInt(0, window.innerHeight) + 'px';
  
  // Dodajemy pole range do obiektu przeciwnika
  enemy.range = 25; // Zasięg ataku przeciwnika (w pikselach)
  
  // Dodajemy pole lastDirection do obiektu przeciwnika
  enemy.lastDirection = 'right'; // Początkowo ustawiamy na prawo

  // Ustawienie flagi pozwalającej na strzał
  enemy.canShoot = true;

  document.getElementById('game-container').appendChild(enemy);

// Funkcja strzelania przeciwnika
function enemyShoot(enemyX, enemyY, playerX, playerY) {

  if (enemy.getAttribute('data-alive') === 'false') {
    return; // Przeciwnik martwy, nic nie robi
  }
  // Utwórz nowy pocisk przeciwnika
  const bullet = document.createElement('div');
  bullet.classList.add('enemy-bullet');
  
  // Ustaw pozycję początkową pocisku przed przeciwnikiem
  let bulletX = parseInt(enemyX) + 25; // 25px przesunięcia w prawo
  let bulletY = parseInt(enemyY) + 25; // 25px przesunięcia w dół

  bullet.style.left = bulletX + 'px';
  bullet.style.top = bulletY + 'px';
  document.getElementById('game-container').appendChild(bullet);

  // Oblicz wektor kierunku od przeciwnika do gracza
  const dx = playerX - bulletX;
  const dy = playerY - bulletY;
  const length = Math.sqrt(dx * dx + dy * dy);

  // Normalizuj wektor kierunku
  const normalizedDx = dx / length;
  const normalizedDy = dy / length;

  // Ustaw prędkość pocisku przeciwnika
  const speed = 5;

  // Funkcja aktualizująca pozycję pocisku w każdej klatce animacji
  function update() {
    bulletX += normalizedDx * speed;
    bulletY += normalizedDy * speed;
    bullet.style.left = bulletX + 'px';
    bullet.style.top = bulletY + 'px';

    // Sprawdź czy pocisk przeciwnika trafił gracza
    const distance = Math.sqrt(Math.pow(playerX - bulletX, 2) + Math.pow(playerY - bulletY, 2));
    if (distance < 5) { // Przykładowa wartość odległości trafienia
      // Zmniejsz punkty życia gracza o 10 (lub inną wartość)
      playerOne.hp -= 10;
      // Usuń pocisk
      bullet.remove();
      if (playerOne.hp == 0) {
        alert('you died');
        location.reload();
      }
    } else if (bulletX < 0 || bulletX > window.innerWidth || bulletY < 0 || bulletY > window.innerHeight) {
      // Jeśli pocisk opuści obszar gry, usuń go
      bullet.remove();
    } else {
      // Kontynuuj aktualizację pozycji w kolejnej klatce animacji
      requestAnimationFrame(update);
    }
  }

  // Rozpocznij aktualizację pozycji pocisku przeciwnika
  requestAnimationFrame(update);

  // Usuń pocisk przeciwnika po 2 sekundach
  setTimeout(() => {
    bullet.remove();
  }, 1000);
}


  


  // Funkcja aktualizująca pozycję wroga i sprawdzająca atak
  function update() {
    const playerPos = {
      x: playerX,
      y: playerY
    };

    const enemyPos = {
      x: parseInt(enemy.style.left),
      y: parseInt(enemy.style.top)
    };

    // Obliczamy odległość między graczem a przeciwnikiem
    const distance = Math.sqrt(Math.pow(playerPos.x - enemyPos.x, 2) + Math.pow(playerPos.y - enemyPos.y, 2));

    // Sprawdzamy czy gracz jest w zasięgu ataku przeciwnika
    if (distance <= enemy.range) {
      // Jeśli gracz jest w zasięgu, przeciwnik strzela
      enemyShoot(parseInt(enemy.style.left), parseInt(enemy.style.top), playerX, playerY);
    }

    const dx = playerPos.x - enemyPos.x;
    const dy = playerPos.y - enemyPos.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    const normalizedDx = dx / length;
    const normalizedDy = dy / length;

    const speed = 2;

    enemyPos.x += normalizedDx * speed;
    enemyPos.y += normalizedDy * speed;

    enemy.style.left = enemyPos.x + 'px';
    enemy.style.top = enemyPos.y + 'px';

    // Ustawienie kierunku ruchu w lewo lub w prawo
    if (normalizedDx < 0) {
      enemy.lastDirection = 'left';
    } else {
      enemy.lastDirection = 'right';
    }

    // Dodaj klasę .enemy-left, jeśli przeciwnik porusza się w lewo
    if (enemy.lastDirection === 'left') {
      enemy.classList.add('enemy-left');
    } else {
      enemy.classList.remove('enemy-left');
    }

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Funkcja generująca wrogów w losowych odstępach czasu
function generateEnemies() {
  const interval = 3000; // Co 3 sekundy
  setInterval(createEnemy, interval);
}