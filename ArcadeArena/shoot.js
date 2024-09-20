// shoot.js

// Funkcja tworząca nowy pocisk
function createBullet(x, y, targetX, targetY) {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');

      // Dodanie klasy w zależności od kierunku ruchu gracza
  if (lastDirection === 'right') {
    bullet.classList.add('bullet-right');
  } else if (lastDirection === 'left') {
    bullet.classList.add('bullet-left');
  }

  y = y - 15;

    
    document.getElementById('game-container').appendChild(bullet);
  
    // Obliczenie wektora kierunku pocisku
    const dx = targetX - x;
    const dy = targetY - y;
    const length = Math.sqrt(dx * dx + dy * dy);
  
    // Normalizacja wektora kierunku
    const normalizedDx = dx / length;
    const normalizedDy = dy / length;
  
    // Ustawienie prędkości pocisku
    const speed = 5;
  
    // Aktualna pozycja pocisku
    let bulletX = x;
    let bulletY = y;
  
    // Funkcja aktualizująca pozycję pocisku w każdej klatce animacji
    function update() {
      bulletX += normalizedDx * speed;
      bulletY += normalizedDy * speed;
      bullet.style.left = bulletX + 'px';
      bullet.style.top = bulletY + 'px';
  
      // Sprawdzenie czy pocisk opuścił obszar gry i usuń go
      if (bulletX < 0 || bulletX > window.innerWidth || bulletY < 0 || bulletY > window.innerHeight) {
        bullet.remove();
      } else {
        // Sprawdzenie kolizji z przeciwnikami
        const enemies = document.querySelectorAll('.enemy');
        enemies.forEach(enemy => {
          const enemyRect = enemy.getBoundingClientRect();
          const bulletRect = bullet.getBoundingClientRect();
          if (
            bulletRect.left < enemyRect.right &&
            bulletRect.right > enemyRect.left &&
            bulletRect.top < enemyRect.bottom &&
            bulletRect.bottom > enemyRect.top
          ) {
            // Kolizja z przeciwnikiem - usuń przeciwnika i pocisk
            enemy.setAttribute('data-alive', 'false'); // Przeciwnik martwy
            enemy.remove();
            bullet.remove();
            increaseExp(100);
            increaseScore();
          }
        });
  
        // Kontynuuj aktualizację pozycji w kolejnej klatce animacji
        requestAnimationFrame(update);
      }
    }
  
    // Rozpocznij aktualizację pozycji pocisku
    requestAnimationFrame(update);
  }
  
  // Funkcja zwiększająca licznik punktów gracza
  function increaseScore() {
    const scoreDisplay = document.getElementById('score');
    let score = parseInt(scoreDisplay.innerText);
    score++;
    scoreDisplay.innerText = score;
  }
  