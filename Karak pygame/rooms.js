
let Roomstart = {
  name: "Roomstart",
  allowed: [1, 1, 1, 1],
  ability: ['Healing'],
  graphic: 'Graphic/Rooms/startRoom.jpg',
  actions: ['Heal']
};

let Room1111 = {
  name: "Room1111",
  allowed: [1, 1, 1, 1],
  ability: [''],
  graphic: 'Graphic/Rooms/1111Room.jpg',
  actions: ['']
};

let Room1100 = {
  name: "Room1100",
  allowed: [1, 1, 0, 0],
  ability: [''],
  graphic: 'Graphic/Rooms/1100Room.jpg',
  actions: ['']
};

let Room1010 = {
  name: "Room1010",
  allowed: [1, 0, 1, 0],
  ability: [''],
  graphic: 'Graphic/Rooms/1010Room.jpg',
  actions: ['']
};

let Room1001 = {
  name: "Room1001",
  allowed: [1, 0, 0, 1],
  ability: [''],
  graphic: 'Graphic/Rooms/1001Room.jpg',
  actions: ['']
};



let Room0111 = {
  name: "Room0111",
  allowed: [0, 1, 1, 1],
  ability: [''],
  graphic: 'Graphic/Rooms/0111Room.jpg',
  actions: ['']
};

let Room0101 = {
  name: "Room0101",
  allowed: [0, 1, 0, 1],
  ability: [''],
  graphic: 'Graphic/Rooms/0101Room.jpg',
  actions: ['']
};

let Room0011 = {
  name: "Room0011",
  allowed: [0, 0, 1, 1],
  ability: [''],
  graphic: 'Graphic/Rooms/0011Room.jpg',
  actions: ['']
};



let Rooms = [Roomstart, Room1100, Room1010, Room1001, Room1111, Room0111, Room0101, Room0011];  // 1110, 1101, 0111, 1011

function generateRoom() {
  let validRooms = [];

  Rooms.forEach((room, index) => {
    if (index !== 0) { // Pomijanie pokoju o indeksie 0
      let direction;
      if (z === 15) {
        direction = 0;
      } else if (z === -15) {
        direction = 2;
      } else if (z === 1) {
        direction = 3;
      } else if (z === -1) {
        direction = 1;
      }

      if (room.allowed[direction] === 1) {
        validRooms.push(room);
      }
    }
  });

  if (validRooms.length > 0) {
    let randomIndex = Math.floor(Math.random() * validRooms.length);
    let selectedRoom = validRooms[randomIndex];

    document.getElementById("r" + (Player.position + z)).style.backgroundImage = "url('" + selectedRoom.graphic + "')";
    document.getElementById("r" + (Player.position + z)).classList.add(selectedRoom.name);
    document.getElementById("r" + (Player.position + z)).classList.remove("hiddenRoom");
    document.getElementById("r" + (Player.position + z)).classList.add("room");

    GenerateEnnemy(z, selectedRoom);
  }
}

