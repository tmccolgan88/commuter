enchant();

var SCREEN_HEIGHT             = 600;
var SCREEN_WIDTH              = 600;
var STARTING_PLAYER_ROTATION  = 0;
var STARTING_PLAYER_SCALE     = .6;
var STARTING_PLAYER_FRAME     = 0;
var STARTING_PLAYER_POSITIONY = 300;
var SHIFT_DISTANCE = 20;
var BIG_SHIFT_DISTANCE = 60;

var playerCarSpeed = 0;
var canShiftRight  = true;
var canShifLeft    = true;
var canBigShiftRight = true;
var canBigShiftLeft = true;

var globalGame = null;
var game = null;
var playerCar = null;
window.onload = function(){
  game = new Core(600, 600);
  game.scale = 1;
  game.fps = 60;
  game.preload("/commuter/sprites/mitch.png");
	game.preload("/commuter/sprites/carBlue.png");
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

	RoadLoad(game);
  game.onload = function(){
    playerCar = new Sprite(40,54);
		var lanes = 2;
		Road(game, lanes);
    playerCar.image = game.assets["/commuter/sprites/mitch.png"];
		playerCar.x 		= XforLane(lanes);
    playerCar.y     = STARTING_PLAYER_POSITIONY;
    playerCar.frame = STARTING_PLAYER_FRAME;
    playerCar.scale(STARTING_PLAYER_SCALE);
    playerCar.rotate(STARTING_PLAYER_ROTATION);
    game.rootScene.addChild(playerCar);

    playerCar.addEventListener("enterframe", function(){
      /*if: accelerate forward, else: decelerate due to friction*/
      if (playerCar.y > (0 + 20)){
	    if (game.input.w){
          if (playerCarSpeed < 10)
              playerCarSpeed += 1;      
          } 
          else if (!game.input.w){
            if (playerCarSpeed > 0)
              playerCarSpeed -= .25;        
          }
	    }
		else{
			playerCarSpeed = 0;
		}
   
      /*if: accelerate backwards, else: decelerate due to friction*/
	  if (playerCar.y < 600 - 74){
        if (game.input.s){
          if (playerCarSpeed > -10)
            playerCarSpeed -= 1;
          }   
          else if (!game.input.s){
            if (playerCarSpeed < 0)
              playerCarSpeed += .25;  
          }
      }
	  else if (game.input.w){
		  console.log(playerCar.y);
		  playerCarSpeed = 1;
	  }
	  else{
		  playerCarSpeed = 0;
	  }
	  
      /*if: turn car left, else: turn car right*/
      if (game.input.a && playerCar.x > 0){
        //playerCar.rotate(-5)
		playerCar.x -= 3; // * Math.sin(DegreesToRads(playerCar.rotation - 90));
      } 
      else if (game.input.d && playerCar.x < SCREEN_WIDTH - 40){
        //playerCar. (5);
		playerCar.x += 3; // * Math.sin(DegreesToRads(playerCar.rotation - 90));
      } 
  
      /*Calculate and apply game shift left.*/
      if (game.input.left && canShiftLeft && playerCar.x > (0 + SHIFT_DISTANCE)){
        playerCar.x += SHIFT_DISTANCE * Math.sin(DegreesToRads(playerCar.rotation - 90));
        playerCar.y -= SHIFT_DISTANCE * Math.cos(DegreesToRads(playerCar.rotation - 90));
        canShiftLeft = false;
      } 
      else if (!game.input.left){ 
        canShiftLeft = true;
      }
	  
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
        playerCar.x -= SHIFT_DISTANCE * Math.sin(DegreesToRads(playerCar.rotation - 90));
        playerCar.y += SHIFT_DISTANCE * Math.cos(DegreesToRads(playerCar.rotation - 90));
        canShiftRight = false;
      } 
      else if(!game.input.right){
        canShiftRight = true;
      }

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
    });
	
	game.rootScene.addEventListener('enterframe',function(){
            if(game.frame %  60 == 0){
                addBasicTraffic(RandLane());
            }
        });
  };
  game.start();
}

function addBasicTraffic(lane){
    var basicTraffic = new Sprite(40,54);
		basicTraffic.x = XforLane(lane, 40);
    basicTraffic.y = 0;
		basicTraffic.scale(STARTING_PLAYER_SCALE);
    basicTraffic.image = game.assets['/commuter/sprites/carBlue.png'];

    basicTraffic.frame = 0;

    basicTraffic.addEventListener('enterframe', function(e) {
            this.y += 3;
			
	    if (basicTraffic.y > SCREEN_HEIGHT)
			game.rootScene.removeChild(basicTraffic);
		
		if (this.intersect(playerCar)){
			game.rootScene.removeChild(this)
		}
    });
    game.rootScene.addChild(basicTraffic);

}

/*Convert degress to radians.*/
function DegreesToRads(degrees){
  return degrees * (Math.PI/180);
}

function rand(digits){
    return Math.floor(Math.random() * digits);
}
