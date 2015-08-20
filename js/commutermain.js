enchant();

var SCREEN_HEIGHT             = 600;
var SCREEN_WIDTH              = 600;
var STARTING_PLAYER_ROTATION  = 90;
var STARTING_PLAYER_SCALE     = .6;
var STARTING_PLAYER_FRAME     = 0;
var STARTING_PLAYER_POSITIONX = 300;
var STARTING_PLAYER_POSITIONY = 300;

var playerCarSpeed = 0;
var canShiftRight  = true;
var canShifLeft    = true;

window.onload = function(){
	var game = new Core(600, 600);
  game.scale = 1;
  game.fps = 60;
	game.preload("/commuter/sprites/mitch.png");
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
		var playerCar = new Sprite(40,54);
		Road(game, 6);
		playerCar.image = game.assets["/commuter/sprites/mitch.png"];
		playerCar.x     = STARTING_PLAYER_POSITIONX;
		playerCar.y     = STARTING_PLAYER_POSITIONY;
		playerCar.frame = STARTING_PLAYER_FRAME;
		playerCar.scale(STARTING_PLAYER_SCALE);
		playerCar.rotate(STARTING_PLAYER_ROTATION);
		game.rootScene.addChild(playerCar);

		playerCar.addEventListener("enterframe", function(){
			/*if: accelerate forward, else: decelerate due to friction*/
			if (game.input.w){
				if (playerCarSpeed < 10)
					playerCarSpeed += 1;      
			} 
			else if (!game.input.w){
				if (playerCarSpeed > 0)
					playerCarSpeed -= .25;        
			}

			/*if: accelerate backwards, else: decelerate due to friction*/
			if (game.input.s){
				if (playerCarSpeed > -10)
					playerCarSpeed -= 1;
			} 
			else if (!game.input.s){
				if (playerCarSpeed < 0)
					playerCarSpeed += 1;  
			}

			/*if: turn car left, else: turn car right*/
			if (game.input.a){
				playerCar.rotate(-5)
			} 
			else if (game.input.d){
				playerCar.rotate(5);
			} 

			/*Calculate and apply game shift left.*/
			if (game.input.left && canShiftLeft){
				playerCar.x += 20 * Math.sin(DegreesToRads(playerCar.rotation - 90));
				playerCar.y -= 20 * Math.cos(DegreesToRads(playerCar.rotation - 90));
				canShiftLeft = false;
			} 
			else if (!game.input.left){ 
				canShiftLeft = true;
			}

			/*Calculate and apply lane shift right*/ 
			if (game.input.right && canShiftRight){
				playerCar.x -= 20 * Math.sin(DegreesToRads(playerCar.rotation - 90));
				playerCar.y += 20 * Math.cos(DegreesToRads(playerCar.rotation - 90));
				canShiftRight = false;

			} 
			else if(!game.input.right){
				canShiftRight = true;
			}

			/*Calculate and apply vector magnitude and velocity.*/
			playerCar.x += playerCarSpeed * Math.cos(DegreesToRads(playerCar.rotation - 90));
			playerCar.y += playerCarSpeed * Math.sin(DegreesToRads(playerCar.rotation - 90));
		});
  };
  game.start();
}

/*Convert degress to radians.*/
function DegreesToRads(degrees){
  return degrees * (Math.PI/180);
}

