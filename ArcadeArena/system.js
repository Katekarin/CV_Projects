let isPaused = false; // Flaga kontrolująca stan gry




// Funkcja wstrzymująca grę
function pauseGame() {
  isPaused = true;
}

// Funkcja wznawiająca grę
function resumeGame() {
  isPaused = false;
  updateGame(); // Wznów główną funkcję aktualizującą
}

// Główna funkcja aktualizująca stan gry (przykład)
function updateGame() {
  if (isPaused) {
    return; // Jeśli gra jest wstrzymana, nie wykonuj żadnych aktualizacji
  }

  // Tu dodaj kod aktualizujący stan gry (np. poruszanie się przeciwników, strzały itp.)

  // Kontynuuj aktualizację w kolejnej klatce animacji
  requestAnimationFrame(updateGame);
}

// Przykład funkcji aktualizującej pozycję przeciwnika
function updateEnemyPosition(enemy) {
  if (isPaused) {
    return; // Jeśli gra jest wstrzymana, nie wykonuj aktualizacji
  }

  // Logika ruchu przeciwnika
  // ...

  requestAnimationFrame(() => updateEnemyPosition(enemy));
}

// Event listener do włączania i wyłączania pauzy np. przy naciśnięciu klawisza "P"
document.addEventListener('keydown', (e) => {
  if (e.key === 'p') {
    if (isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  }
});

// Inicjalizacja gry
function startGame() {
  updateGame(); // Rozpocznij główną pętlę gry
}
