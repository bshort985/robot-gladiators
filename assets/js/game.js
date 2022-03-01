
//player stats

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 50;
var playerAttack = 10;
var playerMoney = 10;

//enemy stats

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 12;
var enemyAttack = 12;

//Fight function
var fight = function(enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney)
        break;
      }
    }

    // else {
    //   alert("Please select 'FIGHT' or 'SKIP' to continue")
    // }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;
    console.log(
      playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + ' has died!');

      // award player money for winning
      playerMoney = playerMoney + 20;

      // leave while() loop since enemy is dead
      break;
    } 
    else {
      window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack;
    console.log(
      enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + ' still has ' + playerHealth + ' health left.');
    }
  }
};
 
//wrap the game logic in a startgame function

  var startGame = function() {
    //reset player stats when startGame() is called
    playerHealth = 50
    playerAttack = 10
    playerMoney = 10

    for (var i = 0; i < enemyNames.length; i++) {
      if (playerHealth > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
  
        var pickedEnemyName = enemyNames[i];
  
        enemyHealth = 12;
  
        fight(pickedEnemyName);
        //if we're not at the last enemy in the array
        if(playerHealth > 0 && i < enemyNames.length - 1){
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
    if (playerHealth > 0){
      alert("Great job, you've survived the game! You now have a high score of " + playerMoney + ".")
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
          if (playerMoney >= 7){
          alert("Refilling player's health by 20 for 7 dollars.")
          //increase health and decress money
          playerHealth = playerHealth + 20
          playerMoney = playerMoney - 7
          }
          else{
            alert("You do not have enough money!")
          }
          break;
          case "UPGRADE":
          case "upgrade":
            if (playerMoney >= 7){
            alert("Upgrade player attack by 6 for 7 dollars.")
            playerAttack = playerAttack + 6
            playerMoney = playerMoney - 7
            }
            else{
              prompt("You do not have enough money!")
            }
            break;

            case "LEAVE":
            case "leave":
              alert("Leaving the store")
              break;

              default:
                alert("You did not pick a valid option. Try again.")
                shop();
                break;
      }
    };

    startGame();