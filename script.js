let xp = 0;
let health = 100;
let gold = 50;

let currentWeapon = 0;
let currentLocation = 0;

let fighting;
let monsterHealth;
let inventory = [
    {name: "stick", type: "weapon", id: 0, equipped: true},

];

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const inventoryButton = document.getElementById("inventoryButton");
const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const monsterStats = document.getElementById("monsterStats");
const monsterNameText = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");

const weapons = [
    {
        name: "stick",
        damage: 5,
        value : 0,
        startingDurability : 10
    },
    {
        name: "sword",
        damage: 30,
        value : 10,
        startingDurability : 100
    }
];

const locations = [
    {
        name: "Home", 
        description: "Your house. There is a small garden out front.",
        buttonText: ["Go to Store", "Go to Cave", "Fight Dragon"],
        buttonFunction: [goStore, goCave, fightDragon]
    },

    {
        name: "Store",
        description: "A small store. There is a shopkeeper behind the counter.",
        buttonText: ["Buy Sword (10g)", "Buy Small Health Potion (5g)", "Go Home"],
        buttonFunction: [buySword, buySmallHealthPotion, goHome]
    },

    {
        name: "Cave",
        description: "A dark cave. There is a monster inside.",
        buttonText: ["Fight Monster", "Run Away", "Go Home"],
        buttonFunction: [fightMonster, runAway, goHome]

    }
];

// initialize buttons


inventoryButton.onclick = () => goInventory(0);
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// function goInventory() {
//     console.log("goInventory");
//     text.innerText = "Inventory:\n";
//     button1.innerText = "Leave Inventory";
//     button1.onclick = () => updateLocation(locations[currentLocation]);

//     button2.innerText = "Next Page";
//     button2.onclick = () => {
//         if (inventory.length > 3) {
//             goInventory2(3);
//         } else {
//             goInventory();
//         }
//     }

//     button3.innerText = "";
//     button3.onclick = () => {};

//     showInventory(0);
// }

function goInventory(index) {
    console.log("goInventory");
    text.innerText = "Inventory:\n"
    button1.innerText = "Leave Inventory";
    button1.onclick = () => updateLocation(locations[currentLocation]);

    if (index > 0) {
        button3.innerText = "Previous Page";
        button3.onclick = () => {
            goInventory(Math.max(index - 3, 0));
        }
    } else {
        button3.innerText = "";
        button3.onclick = () => {};
    }

    if (index + 3 < inventory.length) {
        button2.innerText = "Next Page";
        button2.onclick = () => {
            goInventory(index + 3);
        }
    } else {
        button2.innerText = "";
        button2.onclick = () => {};
    }

    showInventory(index);
}

function showInventory(index) {
    for (let i = index; i < inventory.length && i < index + 3; i++) {
        text.innerText += inventory[i].name;
        if (inventory[i].type === "weapon") {
            text.innerText += " ("
            const weapon = weapons[inventory[i].id];
            if (inventory[i].equipped) {
                text.innerText += "Equiped";
            }

            if (inventory[i].durability == 0) {
                text.innerText += ", Broken";
            }
            text.innerText += ") ";
        }
        text.innerText += "\n";
    }
}


function updateLocation(location) {
    text.innerText = location.description;
    button1.innerText = location.buttonText[0];
    button2.innerText = location.buttonText[1];
    button3.innerText = location.buttonText[2];

    button1.onclick = location.buttonFunction[0];
    button2.onclick = location.buttonFunction[1];
    button3.onclick = location.buttonFunction[2];

    currentLocation = locations.indexOf(location);

}

function goHome() {
    updateLocation(locations[0]);
}

function goStore() {
    updateLocation(locations[1]);
}

function goCave() {
    updateLocation(locations[2]);
}

function fightDragon() {
    console.log("fightDragon");
}

function buyWeapon(weapon) {
    console.log("buyWeapon");
    gold -= weapon.value;
    goldText.innerText = gold;
    addWeaponToInventory(weapon);
    console.log(inventory);
}

function addWeaponToInventory(weapon) {
    inventory.push({type: "weapon", id: weapons.indexOf(weapon), name: weapon.name, equipped: false, durability: weapon.startingDurability});
}


function buySword() {
    console.log("buySword");
    buyWeapon(weapons[1]);
}

function buySmallHealthPotion() {
    console.log("buySmallhealthPotion");
    gold -= 5;
    goldText.innerText = gold;
    inventory.push("small health potion");
}

function fightMonster() {
    console.log("fightMonster");
}

function runAway() {
    console.log("runAway");
}



