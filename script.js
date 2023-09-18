let xp = 0;
let playerHealth = 100;
let playerMaxHealth = 100;
let gold = 1200;
let playerLevel = 2;
let damageAmplifier = 1;
let damageAmplifierDuration = 0;

let currentWeapon = 0;
let currentLocation = 0;

let fighting;
let monsterHealth;
let inventory = [
    {name: "stick", type: "weapon", id: 0, equipped: true, durability: 5},

];

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");

const button4 = document.getElementById("button4");
const button5 = document.getElementById("button5");
const button6 = document.getElementById("button6");
const auxButtons = [button4, button5, button6];
const allButtons = [button1, button2, button3, button4, button5, button6];

const inventoryButton = document.getElementById("inventoryButton");
const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const weaponText = document.getElementById("weaponText");
const monsterStats = document.getElementById("monsterStats");
const monsterNameText = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");
const levelText = document.getElementById("levelText");

const weapons = [
    {
        name: "stick",
        damage: 5,
        value : 0,
        startingDurability : 10,
        ability : "none",
        critChance : 0.1
    },

    {
        name: "sword",
        damage: 10,
        value : 10,
        startingDurability : 50,
        ability : "none",
        critChance : 0.2
    },

    {
        name: "battle axe",
        damage: 20,
        value : 50,
        startingDurability : 100,
        ability : "10% stun chance",
        abilityChance : 0.1,
        abilityEffect : "stun",
        critChance : 0.1
    },

    {
        name: "dragon slayer",
        damage: 100,
        value : 1000,
        startingDurability : 100,
        ability : "a piercing attack that can penetrate dragon scales",
        abilityEffect : "scale pierce",
        critChance : 0.5
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
        description: "A dark cave. There are monsters inside.",
        buttonText: ["Fight Green Goblind", "Fight Blood Orc", "Go Home"],
        buttonFunction: [fightGoblin, fightOrc, goHome]

    },

    {
        name: "Fight",
        description: "You are fighting a monster.",
        buttonText: ["Attack", "Dodge", "Go Home"],
        buttonFunction: [attack, dodge, goHome]
    },

    {
        name: "Advanced Store",
        description: "A greater store. There are better weapons here.",
        buttonText: ["Buy Battle Axe (50g)", "Buy Dragon Slayer (1000g)", "Buy Small Health Potion (5g) ", "Buy Health Potion (15g)", "Buy Power Potion (20g)" ,"Go Home"],
        buttonFunction: [buyBattleAxe, buyDragonSlayer, buySmallHealthPotion, buyHealthPotion, buyPowerPotion, goHome]
    },

    {
        name: "Big Cave",
        description: "A big cave. There are stronger monsters inside.",
        buttonText: ["Fight Blood Orc", "Fight Small Dragon",  "Go Home"],
        buttonFunction: [fightOrc, fightSmallDragon, goHome]
    },
];

const potions = [
    {
        name: "small health potion",
        healing: 10,
        value: 5,
        type : "healing",
        id : 0

    },
    {
        name: "health potion",
        healing: 50,
        value: 15,
        type : "healing",
        id : 1

    },
    {
        name: "power potion",
        damage_amplifier: 1.75,
        value: 20,
        type : "power",
        id : 2,
        duration : 10

    }

];

const monsters = [
    {
        name: "green goblin",
        type: "goblin",
        maxHealth: 20,
        damage: 5,
        defense: 0,
        xp: 10,
        gold: 10
    },

    {
        name: "blood orc",
        type: "orc",
        maxHealth: 50,
        damage: 10,
        defense: 5,
        xp: 30,
        gold: 50
    },

    {
        name: "black dragon",
        type: "dragon",
        maxHealth: 2000,
        defense: 100,
        damage: 45,
        xp: 1000,
        gold: 1000
    },

    {
        name: "small dragon",
        type: "dragon",
        maxHealth: 150,
        defense: 5,
        damage: 20,
        xp: 150,
        gold: 200,
        ability : "fire breath"
    }
];

// initialize buttons


inventoryButton.onclick = () => goInventory(0);
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


function goInventory(index) {
    inventoryButton.style.display = "none";

    for (let i = 0; i < auxButtons.length; i++) {
        auxButtons[i].style.display = "none";
    }


    console.log("goInventory");
    text.innerText = "Inventory:\n"
    button1.innerText = "Leave Inventory";
    button1.onclick = () =>  {
        inventoryButton.style.display = "block";
        updateLocation(locations[currentLocation]);
    }
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
    let pos = 0;
    for (let i = index; i < inventory.length && i < index + 3; i++, pos++) {
        text.innerText += inventory[i].name;
        auxButtons[pos].style.display = "block";
        

        if (inventory[i].type === "weapon") {
            auxButtons[pos].innerText = "Inspect weapon: " + inventory[i].name;
            auxButtons[pos].onclick = () => inspectWeapon(i);
            text.innerText += " ("
            const weapon = weapons[inventory[i].id];
            if (inventory[i].equipped) {
                text.innerText += "Equiped";
            }

            if (inventory[i].durability == 0) {
                text.innerText += ", Broken";
            }
            text.innerText += ") ";
        } else if (inventory[i].type === "potion") {
            auxButtons[pos].innerText = "Drink potion: " + inventory[i].name;
            auxButtons[pos].onclick = () => drinkPotion(i);
        }
            
        text.innerText += "\n";
    }
}

function drinkPotion(index) {
    item = inventory[index];
    const potion = potions[item.id];
    if (potion.type === "healing") {
        playerHealth = Math.min(playerHealth + potion.healing, playerMaxHealth);
    }
    if (potion.type === "power") {
        if (damageAmplifier < potion.damage_amplifier) {
            text.innerText += "You feel stronger!\n";
            damageAmplifier = potion.damage_amplifier;
            damageAmplifierDuration = potion.duration;
        } else {
            text.innerText += "Doesn't seem to have any effect.\n";
        }
       
    }
    inventory.splice(index, 1);
    healthText.innerText = playerHealth + "/" + playerMaxHealth;
    goInventory(0);
}

function inspectWeapon(index) {
    hideAuxButtons();
    inventoryButton.style.display = "block";
    item = inventory[index];
    const weapon = weapons[item.id];

    text.innerText = weapon.name + "\n";
    text.innerText += "Damage: " + weapon.damage + "\n";
    text.innerText += "Value: " + weapon.value + "(sells for: " + weapon.value / 2 + ")" + "\n";
    text.innerText += "Durability: " + item.durability + "/" + weapon.startingDurability + "\n";
    if (weapon.ability != "none") {
        text.innerText += "Ability: " + weapon.ability + "\n";
    }


    if (item.equipped === false) {
        button1.innerText = "Equip";
        button1.onclick = () => {
            if (currentWeapon != -1) {
                inventory[currentWeapon].equipped = false;
            }
            item.equipped = true;
            currentWeapon = index;
            weaponText.innerText = weapon.name;
            if (item.durability == 0) {
                weaponText.innerText += "(Broken)";
            }
            inspectWeapon(index);
        }
    } else {
        button1.innerText = "Unequip";
        button1.onclick = () => {
            item.equipped = false;
            currentWeapon = -1;
            weaponText.innerText = "None";
            inspectWeapon(index);
        }
    }
    
    let repair_cost = Math.min((weapon.startingDurability - item.durability) * 2, gold);
    button2.innerText = "Repair for: " + repair_cost + "g";
    button2.onclick = () => {
        if (repair_cost > gold) {
            return;
        }
        gold -= repair_cost;
        goldText.innerText = gold;
        item.durability = item.durability +  Math.ceil(repair_cost / 2);
        inspectWeapon(index);
    }

    button3.innerText = "Sell for: " + Math.floor(weapon.value / 2) + "g";
    button3.onclick = () => {
        gold += Math.floor(weapon.value / 2);
        goldText.innerText = gold;
        inventory.splice(index, 1);
        if (item.equipped == true) {
            currentWeapon = -1;
            weaponText.innerText = "None";
        }
        goInventory(Math.max(index - 3, 0));
    }

    button4.innerText = "Leave inventory";
    button4.style.display = "block";
    button4.onclick = () => {
        inventoryButton.style.display = "block";
        updateLocation(locations[currentLocation]);
    }



}

function hideAuxButtons() {
    for (let i = 0; i < auxButtons.length; i++) {
        auxButtons[i].style.display = "none";
    }
}

function updateLocation(location) {

    for (let i = 0; i < auxButtons.length; i++) {
        auxButtons[i].style.display = "none";
    }

    text.innerText = location.description;
    // button1.innerText = location.buttonText[0];
    // button2.innerText = location.buttonText[1];
    // button3.innerText = location.buttonText[2];

    // button1.onclick = location.buttonFunction[0];
    // button2.onclick = location.buttonFunction[1];
    // button3.onclick = location.buttonFunction[2];

    for (let i = 0; i < location.buttonText.length; i++) {
        allButtons[i].style.display = "block";
        allButtons[i].innerText = location.buttonText[i];
        allButtons[i].onclick = location.buttonFunction[i];
    }


    currentLocation = locations.indexOf(location);

}

function goHome() {
    monsterStats.style.display = "none";
    updateLocation(locations[0]);
}

function goStore() {
    if (playerLevel < 2) {
        updateLocation(locations[1]);
    } else {
        updateLocation(locations[4]);
    }
}

function goCave() {
    if (playerLevel < 2) {
        updateLocation(locations[2]);
    } else {
        updateLocation(locations[5]);
    }
}



function buyWeapon(weapon) {
    console.log("buyWeapon");
    if (gold < weapon.value) {
        return;
    }
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

function buyBattleAxe () {
    console.log("buyBattleAxe");
    buyWeapon(weapons[2]);
}
function buyDragonSlayer () {
    console.log("buyDragonSlayer");
    buyWeapon(weapons[3]);
}

function buyPotion(potion) {
    console.log("buyPotion");
    if (gold < potion.value) {
        return;
    }
    gold -= potion.value;
    goldText.innerText = gold;
    addPotionToInventory(potion);
    console.log(inventory);
}

function addPotionToInventory(potion) {
    inventory.push({type: "potion", id: potions.indexOf(potion), name: potion.name});
}



function buySmallHealthPotion() {
    console.log("buySmallHealthPotion");
    buyPotion(potions[0]);
}

function buyHealthPotion() {
    console.log("buyHealthPotion");
    buyPotion(potions[1]);
}

function buyPowerPotion() {
    console.log("buyPowerPotion");
    buyPotion(potions[2]);
}

function fightMonster() {
    console.log("fightMonster");
}

function runAway() {
    console.log("runAway");
}
function fight(monster) {
    console.log("fight");
    updateLocation(locations[3]);

    monsterStats.style.display = "block";
    monsterName.innerText = monster.name;
    monsterHealth = monster.maxHealth;
    monsterHealthText.innerText = monsterHealth + "/" + monster.maxHealth;

    currentMonster = monster;

}

function fightSmallDragon() {
    fight(monsters[3]);
}

function fightGoblin() {
    fight(monsters[0]);
}

function fightOrc() {
    fight(monsters[1]);
}

function fightDragon() {
    fight(monsters[2]);
}

function attack() {
    console.log("attack");
    let weapon;
    if (currentWeapon != -1) {
        weapon = weapons[inventory[currentWeapon].id];
    }


    text.innerText = "You attack the " + currentMonster.name + " with your " + weaponText.innerText + "\n";
    let broken = false;
    if (currentWeapon == -1) {
        playerDamage = 1;
    } else if (inventory[currentWeapon].durability == 0) {
        playerDamage = 1;
    } else {
        playerDamage = weapon.damage;
        inventory[currentWeapon].durability--;
        if (inventory[currentWeapon].durability == 0) {
            weaponText.innerText += "(Broken)";
            broken = true;
            
        }
    }

    playerDamage -= currentMonster.defense;
    if (playerDamage < 0) {
        playerDamage = 0;
    }

    console.log(weapon.abilityType);
    console.log(currentMonster.type)

    if (weapon.abilityEffect == "scale pierce" && currentMonster.type == "dragon" && !broken) {
        playerDamage = weapon.damage;
    }

    if (damageAmplifierDuration > 0) {
        playerDamage *= damageAmplifier;
        damageAmplifierDuration--;
    }

    let critChance = Math.random();
    console.log(critChance);
    console.log(weapon.critChance);
    if (critChance <= weapon.critChance) {
        playerDamage *= 2;
        text.innerText += "\n Critical hit ";
        if (playerDamage == 0) {
            playerDamage = 1;
        }
    }

    monsterHealth -= playerDamage;
    monsterHealthText.innerText= monsterHealth + "/" + currentMonster.maxHealth;
    text.innerText += " for " + playerDamage + " damage.";
    
    
    if (monsterHealth <= 0) {
        monsterStats.style.display = "none";
        winScreen();
    } else {
        let skip = false;
        if (weapon.abilityType == "stun") {
            let stunChance = Math.random();
            console.log(stunChance);
            if (stunChance <= weapon.abilityChance) {
                text.innerText += "\n The " + currentMonster.name + " is stunned.";
                skip = true;
            }
        
        }

        if (skip == false) {
            text.innerText += "\n The " + currentMonster.name + " attacks you for " + currentMonster.damage + " damage.";
            playerHealth -= currentMonster.damage;
            healthText.innerText = playerHealth + "/" + playerMaxHealth;


            if (playerHealth <= 0) {
                deathScreen();
            }
        }
    }

    if (broken == true) { 
        text.innerText += "Your " + inventory[currentWeapon].name + " breaks.";
    }

    if (damageAmplifierDuration == 0 && damageAmplifier != 1) {
        damageAmplifier = 1;
        text.innerText += "\n Your damage amplifier wears off.";
    }



}

function applyAbilityEffects(damage) {
    let newDamage = damage;
    if (inventory[currentWeapon].ability == "scale pierce") {
        if (currentMonster.type == "Dragon") {
            newDamage += currentMonster.defense;
        }
    }
    return newDamage;
}

function dodge() {
    console.log("dodge");
    text.innerText = "You try to dodge the " + currentMonster.name + "'s attack, but fail.";
    text.innerText += "\n The " + currentMonster.name + " attacks you for " + currentMonster.damage + " damage.";
    playerHealth -= currentMonster.damage;
    healthText.innerText = playerHealth + "/" + playerMaxHealth;

    if (playerHealth <= 0) {
        deathScreen();
    }
}

function winScreen() {
    text.innerText = "You have defeated the monster!";
    button1.innerText = "Go Home";
    button2.innerText = "";
    button3.innerText = "";

    text.innerText += "\n You gain " + currentMonster.gold + " gold and " + currentMonster.xp + " xp.";
    
    updatePlayerStats(currentMonster.gold, currentMonster.xp);
    
    
    currentMonster = null;
    monsterStats.style.display = "none";
    
    button1.onclick = () => {
        updateLocation(locations[0]);
    }
    button2.onclick = () => {};
    button3.onclick = () => {};
    currentLocation = 0;
}

function deathScreen() {
    inventoryButton.style.display = "none";
    text.innerText = "You have died!";
    button1.innerText = "Respawn";
    button2.innerText = "";
    button3.innerText = "";

    currentMonster = null;
    monsterStats.style.display = "none";

    button1.onclick = () => {
        playerLevel = 0;
        updatePlayerStats(0, 0, 50, 0, 100, 100, 0)
       
        inventory = [
            {name: "stick", type: "weapon", id: 0, equipped: true, durability: 5},
        
        ];
        inventoryButton.style.display = "block";
       
        updateLocation(locations[0]);
    }

    button2.onclick = () => {};
    button3.onclick = () => {};

    currentLocation = 0;
}

function updatePlayerStats(goldAdd = 0, xpAdd = 0, goldSet = gold, xpSet = xp, health = playerHealth, maxHealth = playerMaxHealth, weapon = currentWeapon) {
    console.log("updatePlayerStats");

    console.log(goldAdd);
    console.log(xpAdd);
    console.log(goldSet);
    console.log(xpSet);
    console.log(health);
    console.log(maxHealth);
    console.log(weapon);

    gold = goldSet;
    xp = xpSet;
    gold += goldAdd;
    xp += xpAdd;
    playerHealth = health;
    playerMaxHealth = maxHealth;
    currentWeapon = weapon;

    while (xp >= Math.pow(10, playerLevel + 1)) {
        playerLevel++;
        levelText.innerText = playerLevel;
        playerMaxHealth += 50 * playerLevel;
        playerHealth = playerMaxHealth;
        text.innerText += "\n You leveled up!";
        xp = xp - (Math.pow(10, playerLevel));

        if (playerLevel == 2) {
            text.innerText += "\n Check the store for a surprise.";
        }
    }


    goldText.innerText = gold;
    xpText.innerText = xp;
    healthText.innerText = playerHealth + "/" + playerMaxHealth;
    weaponText.innerText = inventory[currentWeapon].name;
    levelText.innerText = playerLevel;
}