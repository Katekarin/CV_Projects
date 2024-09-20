let box = document.getElementById("game-box");
let ready = "inset 0 0 10px red";
let y = 0;
let healthTile = document.getElementById("health1");

const Player = {
  position: 67, // Domyślna pozycja gracza na mapie (początkowa)
  portrait: "Graphic/Heroes/Rouge.jpg", // Domyślny portret gracza
  points: 0,
  maxHealth: 10,
  health: 10,
  Strenght: 0,
  Inventory: [null, null, null, null, null, null],
};

function rollD6() {
  return Math.floor(Math.random() * 6) + 1; // Symuluj rzut kością D6
}

function throwDice() {
  const dice1 = rollD6();
  const dice2 = rollD6();
  const total = dice1 + dice2 + Player.Strenght;
  return total;
}

function updateHealth() {
  for (let ji = 1; ji <= Player.maxHealth; ji++) {
    healthTile = document.getElementById("health" + ji);

    if (ji <= Player.health) {
      // Gracz ma jeszcze zdrowie, ustaw obraz kafelka zdrowia
      healthTile.style.backgroundImage = "url('Graphic/UI/HealthBox.jpg')";
    } else {
      // Gracz stracił to zdrowie, ustaw kolor tła na czerwony
      healthTile.style.backgroundImage = "none";
    }
  }
  if (Player.health <= 0) {
    // Gracz stracił całe zdrowie, teleportuj go i przywróć zdrowie
    teleportToStartRoom();
    Player.health = Player.maxHealth; // Przywróć pełne zdrowie
    updateHealth(); // Zaktualizuj wygląd zdrowia
  }
}

function teleportToStartRoom() {
  document.getElementById("r" + Player.position).classList.remove("room");
  document.querySelector("#r" + Player.position + " .token").remove();

  Player.position = 67; // Numer pokoju początkowego
  document.getElementById("r67").classList.add("room");
  document.getElementById("r67").innerHTML += "<img src='" + Player.portrait + "' class='token'>";
}

function choice(x) {
  if (y === 0) {
    if (Player.position === x) {
      document.getElementById("r" + (Player.position + 1)).style.boxShadow = ready;
      document.getElementById("r" + (Player.position - 1)).style.boxShadow = ready;
      document.getElementById("r" + (Player.position + 15)).style.boxShadow = ready;
      document.getElementById("r" + (Player.position - 15)).style.boxShadow = ready;
      y = 1;
    } else {}
  } else {
    document.getElementById("r" + (Player.position + 1)).style.boxShadow = "none";
    document.getElementById("r" + (Player.position - 1)).style.boxShadow = "none";
    document.getElementById("r" + (Player.position + 15)).style.boxShadow = "none";
    document.getElementById("r" + (Player.position - 15)).style.boxShadow = "none";
    y = 0;
    if (
      Player.position + 1 === x ||
      Player.position - 1 === x ||
      Player.position + 15 === x ||
      Player.position - 15 === x
    ) {
      if (x === Player.position + 1) {
        z = 1;
      } else if (x === Player.position - 1) {
        z = -1;
      } else if (x === Player.position + 15) {
        z = 15;
      } else if (x === Player.position - 15) {
        z = -15;
      }
      move(z);
    }
  }
}

function fight(enemyInRoom, z) {
  const diceResult = throwDice();
  const enemyStrength = enemyInRoom.Strenght;

  if (diceResult >= enemyStrength) {
    alert("Pokonałeś " + enemyInRoom.name + " z wynikiem rzutu " + diceResult);

    // Usuń przeciwnika z listy wygenerowanych przeciwników
    EnnemysGenerated = EnnemysGenerated.filter(enemy => enemy.position !== enemyInRoom.position);
    document.getElementById(enemyInRoom.position).innerHTML = "<img src='" + Player.portrait + "' class='token'>";

    // Pobierz informację o dropionym przedmiocie
    const droppedItem = enemyInRoom.droppedItem;

    // Wyświetl ikonkę dropionego przedmiotu na kafelku
    document.getElementById(enemyInRoom.position).innerHTML += `<img src='${droppedItem.graphic}' class='item' />`;
    addItemToBoard(droppedItem, Player.position);

    // Zaktualizuj HTML, aby pokazać gracza na kafelku
    document.getElementById(Player.position).innerHTML = "<img src='" + Player.portrait + "' class='token'>";
    console.log(itemsGenerated)
  } else {
    move(-z);
    Player.health -= 1;
    updateHealth();
    alert("Przegrałeś walkę z " + enemyInRoom.name + " z wynikiem rzutu " + diceResult + "twoje hp:" + Player.health);
  }
}

function checkForEnemy(z) {
  const playerRoom = document.getElementById("r" + Player.position);
  const enemyInRoom = EnnemysGenerated.find(enemy => enemy.position === "r" + Player.position);

  if (enemyInRoom) {
    fight(enemyInRoom, z)
  }
}

function move(z) {
  const currentRoom = document.getElementById("r" + Player.position).classList;
  const roomName = Array.from(currentRoom).find(className => className.startsWith("Room"));
  const roomNumber = roomName.slice(-4);

  if (z === 15 && roomNumber.charAt(2) === "0") {    //góra
    return;
  }
  if (z === 1 && roomNumber.charAt(1) === "0") {    //prawo
    return;
  }
  if (z === -15 && roomNumber.charAt(0) === "0") {   //dół
    return;
  }
  if (z === -1 && roomNumber.charAt(3) === "0") {    //lewo
    return;
  }

  const nextRoom = document.getElementById("r" + (Player.position + z));
  if (nextRoom.classList.contains("hiddenRoom")) {
    generateRoom();
  }

  if (nextRoom.classList.contains("Enemy")) {
    // Pobieramy nazwę przeciwnika z jego klas CSS
    const enemyName = Array.from(nextRoom.classList).find(className => className !== "Enemy");
    // Wyświetlamy alert z nazwą przeciwnika
    alert("Znajduje się przeciwnik: " + enemyName);
  }

  const nextRoomName = Array.from(nextRoom.classList).find(className => className.startsWith("Room"));
  const nextRoomNumber = nextRoomName.slice(-4);

  if (z === 15 && nextRoomNumber.charAt(0) === "0") {    //góra
    return;
  }
  if (z === 1 && nextRoomNumber.charAt(3) === "0") {    //prawo
    return;
  }
  if (z === -15 && nextRoomNumber.charAt(2) === "0") {   //dół
    return;
  }
  if (z === -1 && nextRoomNumber.charAt(1) === "0") {    //lewo
    return;
  }

  document.getElementById("r" + Player.position).classList.remove("room");
  document.querySelector("#r" + Player.position + " .token").remove();

  Player.position = Player.position + z;

  document.getElementById("r" + Player.position).classList.add("room");
  document.getElementById("r" + Player.position).innerHTML += "<img src='" + Player.portrait + "' class='token'> </img>";
  checkForEnemy(z);
}

for (let i = 0; i < 135; i++) {
  box.innerHTML += "<div class='hiddenRoom' id='r" + i + "' onclick='choice(" + i + ")'></div>";
}

function startGame() {
  document.getElementById("r67").classList.remove("hiddenRoom");
  document.getElementById("r67").classList.add("StartRoom");
  document.getElementById("r67").classList.add("room");
  document.getElementById("r67").classList.add(Roomstart.name);
  document.getElementById("r67").style.backgroundImage = "url('" + Roomstart.graphic + "')";
  document.getElementById("r67").innerHTML += "<img src='" + Player.portrait + "' class='token'> </img>";
}




function checkPlayerItemsAtPosition(playerPosition) {
  const itemsAtPlayerPosition = itemsGenerated.filter(itemData => itemData.position === playerPosition);

  if (itemsAtPlayerPosition.length > 0) {
    // Gracz ma przedmioty na swojej pozycji, wyświetl informacje o każdym z nich.
    itemsAtPlayerPosition.forEach(itemData => {
      const item = itemData.item;
      console.log("Znaleziono przedmiot: " + item.name + " (" + item.type + ")");
      if (item.type === "weapon") {
        console.log("To jest broń.");
        // Dodaj kod do obsługi broni
      } else if (item.type === "scroll") {
        console.log("To jest scroll.");
        // Dodaj kod do obsługi scrolla
      } else if (item.type === "key") {
        console.log("To jest klucz.");
        // Dodaj kod do obsługi klucza
      } else {
        console.log("Nieznany typ przedmiotu: " + item.type);
        // Dodaj kod obsługi innych typów przedmiotów, jeśli to konieczne
      }
    });
  } else {
    console.log("Na tym polu nie ma żadnych przedmiotów.");
    // Możesz tutaj dodać odpowiednią informację w interfejsie użytkownika.
  }
}

// Wywołanie funkcji po naciśnięciu przycisku "Sprawdź przedmiot"
const checkItemButton = document.getElementById("check-item-button");
checkItemButton.addEventListener("click", () => {
  checkPlayerItemsAtPosition(Player.position);
});





startGame();

//przewijanie
const gameContainer = document.getElementById("game-container");
const gameBox = document.getElementById("game-box");

let isDragging = false;
let startX, startY, scrollLeft, scrollTop;

gameBox.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - gameBox.offsetLeft;
  startY = e.pageY - gameBox.offsetTop;
  scrollLeft = gameBox.scrollLeft;
  scrollTop = gameBox.scrollTop;
});

gameBox.addEventListener("mouseup", () => {
  isDragging = false;
});

gameBox.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - gameBox.offsetLeft;
  const y = e.pageY - gameBox.offsetTop;
  const walkX = (x - startX);
  const walkY = (y - startY);

  gameBox.scrollLeft = scrollLeft - walkX;
  gameBox.scrollTop = scrollTop - walkY;
});

gameContainer.addEventListener("mouseleave", () => {
  isDragging = false;
});