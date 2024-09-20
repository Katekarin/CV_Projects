
let Ennemy001 = {
  name: "Rat",
  Strenght: 6,
  chance:15,
  graphic: 'Graphic/Ennemys/Ennemy001.jpg',
  droppedItem: Dagger
}

let Ennemy002 = {
  name: "Skeletone Sword",
  Strenght: 9,
  chance: 9,
  graphic: 'Graphic/Ennemys/Ennemy002.jpg',
  droppedItem: Sword
}

let Ennemy003 = {
  name: "Skeletone_Barbarian",
  Strenght: 12,
  chance: 3,
  graphic: 'Graphic/Ennemys/Ennemy003.jpg',
  droppedItem: Axe
}

let Ennemy004 = {
  name: "Mummy",
  Strenght: 7,
  chance: 8,
  graphic: 'Graphic/Ennemys/Ennemy004.jpg',
  droppedItem: Scroll_Health
}

let Ennemy005 = {
  name: "Mummy keyholder",
  Strenght: 8,
  chance: 6,
  graphic: 'Graphic/Ennemys/Ennemy005.jpg',
  droppedItem: Key
}

let Ennemys = [Ennemy001, Ennemy002, Ennemy003, Ennemy004, Ennemy005]

let EnnemysGenerated = []

function GenerateEnnemy(z) {
  let totalChance = Ennemys.reduce((sum, enemy) => sum + enemy.chance, 0);
  const ennemyChance = Math.floor(Math.random() * totalChance) + 1;
  let cumulativeChance = 0;
  let selectedEnemy;
  for (const enemy of Ennemys) {
    cumulativeChance += enemy.chance;
    if (ennemyChance <= cumulativeChance) {
      selectedEnemy = enemy;
      break;
    }
  }
  const ennemy = { ...selectedEnemy, position: "r" + (Player.position + z) };
  selectedEnemy.chance -= 1;
  EnnemysGenerated.push(ennemy);
  document.getElementById("r" + (Player.position + z)).innerHTML += "<div class=" + ennemy.name + "></div>";
  console.log("r" + (Player.position + z) + ":" + ennemy);
}