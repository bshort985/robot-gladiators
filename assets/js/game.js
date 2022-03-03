
var fightOrSkip = function() {
  // ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // Enter the conditional recursive function call here!
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  // if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.playerMoney = playerInfo.money - 10;
      shop();
    }
  }
  else {
    alert("Please provide a valid answer!")
  }
  
}

//Fight function
var fight = function(enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    
    fightOrSkip();

    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);

    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } 
    else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );
    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};
 
//wrap the game logic in a startgame function

  var startGame = function() {
    //reset player stats when startGame() is called
    playerInfo.reset()
    for (var i = 0; i < enemyInfo.length; i++) {
      if (playerInfo.health > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
  
        var pickedEnemyObj = enemyInfo[i];
  
        pickedEnemyObj.health = randomNumber(40, 60);
  
        fight(pickedEnemyObj);
        //if we're not at the last enemy in the array
        if(playerInfo.health > 0 && i < enemyInfo.length - 1){
          shop();
        }
      }
      else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
      }
    }
    //after the loop ends, player is either out of health or enemies to fight so endGame() will be called to end the game
    endGame();
  };

//when a player is defeated or there are no more enemies call an endgame function that:
  //alerts the players total stats
  //asks the player if they want to play again
  //if yes call the startgame function to restart the game

  var endGame = function(){
    alert("Game has ended. Lets see how you did!")
    //plaer is still alive, player wins
    if (playerInfo.health > 0){
      alert("Great job, you've survived the game! You now have a high score of " + playerInfo.money + ".")
    }
    else{
      alert("You've lost your robot in battle. Git Gud Scrub!")
    }
    var playAgainConfirm = confirm("Would you like to play again?")
    if (playAgainConfirm === true){
      //restart the game by calling startGame()
      startGame()
    }
    else{
      alert("Thank you for playing Robot Gladiators! Come back soon now ya' hear!")
    }
  };

  //After the player skips or defeats an enemy and there are still more robots to fight
    //ask the player if they want to shop
    //if yes call the shop function
    //if no continue as normal
    //in the shop ask the player if they want to refill health, upgrade attack, or leave the shop
    //if refill health, subtract money points and increse health 
    //if upgrade attack, subtract money points and add attack points
    //if leave, alert goodbye and exit the function
    //if any other invalid option, call the shop() again

    var shop = function(){
      var shopOptionPrompt = prompt(
      "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
      )
      //use switch to carry out an action
      switch(shopOptionPrompt){
          case "REFILL":
          case "refill":
            playerInfo.refillHealth();
            break;
          case "UPGRADE":
          case "upgrade":
            playerInfo.upgradeAttack();
            break;
              default:
                alert("You did not pick a valid option. Try again.")
                shop();
                break;
              }
          };

    //function to generate random numeric value
    var randomNumber = function(min, max){
      var value = Math.floor(Math.random() * (max - min + 1) + min);

      return value;
    }

    var getPlayerName = function() {
      var name = "";
        while (name === "" || name === null){
          name = prompt("What is your robot's name?");
        }
    
      console.log("Your robot's name is " + name);
      return name;
    };
//create an object to hold player stats

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function(){
    this.health = 100;
    this.attack = 10;
    this.money = 10;
  },
  refillHealth: function(){
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
    this.health += 20;
    this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function(){
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
    this.attack += 6;
    this.money -= 7;
  }
  else {
    window.alert("You don't have enough money!");
  }
}
}

//enemy stats

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14),
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14),
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14),
  }
]

// function to set name


    startGame();