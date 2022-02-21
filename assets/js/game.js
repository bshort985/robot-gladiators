//player money
var playerMoney = 10;


//player and enemy robot initial stats

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//Fight function
var fight = function(enemyName) {
//start alert
    window.alert("Welcome to Robot Gladiators!");
    //fight prompt
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.")
        if (promptFight === "fight" || promptFight === "FIGHT") {
        enemyHealth = enemyHealth - playerAttack;
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
    //health check
    if (enemyHealth <= 0){
        window.alert(enemyName + " has died!");
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }
    
        playerHealth = playerHealth - enemyAttack;
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
     //health check
        if (playerHealth <= 0){
            window.alert(playerName + " has died!");
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }

    else if (promptFight === "skip" || promptFight === "SKIP"){
        // skip confirm
        var confirmSkip = window.confirm("Are you sure you want to quit?");
        
        if (confirmSkip){
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
            playerMoney = playerMoney - 2;
        }
        else {
            fight();
          }
    }
    
    else {
        window.alert("You need to choose a valid option. Try again!")
    }
}

for(var i=0; i < enemyNames.length; i++){
    fight(enemyNames[i]);
}