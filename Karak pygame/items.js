let Dagger = {
    name:"Dagger",
    graphic: 'Graphic/Items/Dagger.jpg',
    type:"weapon",
    value:1,
}

let Sword = {
    name:"Sword",
    graphic: 'Graphic/Items/Sword.jpg',
    type:"weapon",
    value:2,
}

let Axe = {
    name:"Axe",
    graphic: 'Graphic/Items/Axe.jpg',
    type:"weapon",
    value:3,
}

let Scroll_Health = {
    name:"Scroll Health",
    graphic: 'Graphic/Items/Scroll_Health.jpg',
    type:"scroll",
    value:9,
}

let Key = {
    name:"Key",
    graphic: 'Graphic/Items/Key.jpg',
    type:"key",
    value:1,
}

let itemsGenerated = []

function addItemToBoard(item, position) {
    itemsGenerated.push({ item, position });
  }