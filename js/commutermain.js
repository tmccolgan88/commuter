enchant();

var SCREEN_HEIGHT             = 600;
var SCREEN_WIDTH              = 600;
var STARTING_PLAYER_ROTATION  = 0;
var STARTING_PLAYER_SCALE     = 1;
var STARTING_PLAYER_FRAME     = 0;
var STARTING_PLAYER_POSITIONX = 300;
var STARTING_PLAYER_POSITIONY = 300;
var STARTING_PLAYER_HEALTH    = 5;
var PLAYER_MAX_SPEED          = 5;
var SHIFT_DISTANCE            = 60;
var BIG_SHIFT_DISTANCE        = 60;
var MERGE_DISTANCE            = 5;

var playerCarSpeed   = 0;
var playerCarLane    = 4;
var playerShiftTargetLane = 0;
var minXPosition     = 0;
var maxXPosition     = 0;
var canShiftRight    = true;
var canShifLeft      = true;
var canBigShiftRight = true;
var canBigShiftLeft  = true;

var globalGame  = null;
var game        = null;
var playerCar   = null;
var scene       = null;
var healthStack = new Array();

window.onload = function(){
  game = new Core(600, 600);
  game.scale = 1;
  game.fps = 60;
  LoadAssets(game);
  game.keybind(38, "up");
  game.keybind(40, "down");
  game.keybind(37, "left");
  game.keybind(39, "right");
  game.keybind(87, "w");
  game.keybind(65, "a");
  game.keybind(83, "s");
  game.keybind(68, "d");
  game.keybind(81, "q");
  game.keybind(69, "e");

  game.onload = function(){
  playerCar = new Sprite(40,54);
	playerCar.loseHealth = loseHealth;
	playerCar.gainHealth = gainHealth;
	game.player = playerCar;
	scene = MakeTraffic(game, LEVEL1);
	game.pushScene(scene);
	minXPosition = scene.road.XforLane(0, 40);
	maxXPosition = scene.road.XforLane(scene.road.lanes - 1, 40);
  playerCar.image = game.assets[MITCH];
	playerCar.x 		= 300
    playerCar.y     = STARTING_PLAYER_POSITIONY;
    playerCar.frame = STARTING_PLAYER_FRAME;
    playerCar.scale(STARTING_PLAYER_SCALE);
    playerCar.rotate(STARTING_PLAYER_ROTATION);
    scene.addChild(playerCar);

    playerCar.addEventListener("enterframe", function(){
      /*if: accelerate forward, else: decelerate due to friction*/
      if (playerCar.y > (0 + 20)){
	    if (game.input.w){
          if (playerCarSpeed < PLAYER_MAX_SPEED)
              playerCarSpeed += 1;      
          } 
          else if (!game.input.w){
            if (playerCarSpeed > 0)
              playerCarSpeed -=  1;        
          }
	    }
		else{
			playerCarSpeed = 0;
		}
   
      /*if: accelerate backwards, else: decelerate due to friction*/
	  if (playerCar.y < 600 - 74){
        if (game.input.s){
          if (playerCarSpeed > -PLAYER_MAX_SPEED)
            playerCarSpeed -= MERGE_DISTANCE;
          }   
          else if (!game.input.s){
            if (playerCarSpeed < 0)
              playerCarSpeed += MERGE_DISTANCE;  
          }
      }
	  else if (game.input.w){
		  playerCarSpeed = 1;
	  }
	  else{
		  playerCarSpeed = 0;
	  }
      /*if: turn car left, else: turn car right*/
      if (game.input.a && playerCar.x > minXPosition){
        //playerCar.rotate(-5)
		playerCar.x -= 1; // * Math.sin(DegreesToRads(playerCar.rotation - 90));
      } 
      else if (game.input.d && playerCar.x < maxXPosition){
        //playerCar. (5);
		playerCar.x += 1; // * Math.sin(DegreesToRads(playerCar.rotation - 90));
      } 
  
      /*Calculate and apply game shift left.*/
      if (game.input.left && canShiftLeft){
		if (playerCarLane > 0){
		  playerCar.x = scene.road.XforLane(getMyLane() - 1, 60) + 12;
          canShiftLeft = false;
        }
      } 
      else if (!game.input.left){ 
        canShiftLeft = true;
      }
	  
	  /*Calculate and apply a large shift left.*/
	  if (game.input.q && canBigShiftLeft && playerCar.x > (0 + BIG_SHIFT_DISTANCE)) {
        playerCar.x += BIG_SHIFT_DISTANCE * Math.sin(DegreesToRads(playerCar.rotation - 90));
        playerCar.y -= BIG_SHIFT_DISTANCE * Math.cos(DegreesToRads(playerCar.rotation - 90));
        canBigShiftLeft = false;
      } 
      else if (!game.input.q){ 
        canBigShiftLeft = true;
      }

      /*Calculate and apply lane shift right*/ 
      if (game.input.right && canShiftRight && playerCar.x < (SCREEN_WIDTH - SHIFT_DISTANCE - 60)){
		if (playerCarLane < scene.road.lanes - 1){
		  playerCar.x = scene.road.XforLane(getMyLane() + 1, 60) + 12;
          canShiftRight = false; 
		}
      } 
      else if(!game.input.right){
        canShiftRight = true;
      }

	  /*Calculate and apply a large lane shift right*/
	  if (game.input.e && canBigShiftRight && playerCar.x < (SCREEN_WIDTH - BIG_SHIFT_DISTANCE - 60)){
        playerCar.x -= BIG_SHIFT_DISTANCE * Math.sin(DegreesToRads(playerCar.rotation - 90));
        playerCar.y += BIG_SHIFT_DISTANCE * Math.cos(DegreesToRads(playerCar.rotation - 90));
        canBigShiftRight = false;
      } 
      else if(!game.input.e){
        canBigShiftRight = true;
      }
      /*Calculate and apply vector magnitude and velocity.*/
      playerCar.x += playerCarSpeed * Math.cos(DegreesToRads(playerCar.rotation - 90));
      playerCar.y += playerCarSpeed * Math.sin(DegreesToRads(playerCar.rotation - 90));
	  
	  playerCarLane = getMyLane();
    }); //end addEventListener
	
	/*Initialize players health*/
	for (i = 0; i < STARTING_PLAYER_HEALTH; i++){
	  var healthSprite = new Sprite(20, 20);
	  healthSprite.x = 5 + (i * 25);
	  healthSprite.y = 5;
	  healthSprite.image = game.assets[HEALTH];
	  healthStack.push(healthSprite);
	  scene.addChild(healthSprite);
    }
  };
  game.start();
}

/*Minus 1 from player health, remove from gameScene and healStack*/
var loseHealth = function playerLoseHealth(){
	scene.removeChild(healthStack.pop());
	
	/*if (healthStack.length == 0){
		gameOver();
	}*/
}

/*Add 1 to player health, add to gameScene and healthStack*/
var gainHealth = function playerGainHealth(){
	var healthSprite = new Sprite(20, 20);
	healthSprite.x = 5 + (healthStack.length * 25);
	healthSprite.y = 5;
	healthSprite.image = game.assets[HEALTH];
	healthStack.push(healthSprite);
	game.rootScene.addChild(healthSprite);
}

function getMyLane(){
	return Math.floor(((playerCar.x - scene.road.x) / 60));
}

/*Convert degress to radians.*/
function DegreesToRads(degrees){
  return degrees * (Math.PI/180);
}

/*Give praise to RNJesus and return a random number*/
function rand(digits){
    return Math.floor(Math.random() * digits);
}

