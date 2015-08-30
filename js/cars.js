/**
 * Spawn Car function 
 * takes parameters taken from the level spawn sheet
 * despawned cars will be moved to a spawnpool to be reused
 * parameters
	 * game 	- enchant.Core
	 * scene 	- enchant.scene
	 * type		- type of car, read from the level map
	 * pos		- amount of pixels ahead to spawn the car
 */
function SpawnCar(game, scene, type, lane, pos){
	var car;
	//try to get a despawned sprite of the same type
	if (scene.spawnPool[type].length > 0){
		car = scene.spawnPool[type].pop();
		car.clearEventListener(Event.ENTER_FRAME); //clear old enter frame logic
	}
	else{
		//get image asset based on color
		switch (type){
			case 0:
				car = new Sprite(40, 54);
				car.image = game.assets[CAR_BLACK];
				break;
			case 1:
				car = new Sprite(40, 54);
				car.image = game.assets[CAR_BLUE];
				break;
			case 2:
				car = new Sprite(40, 121)
				car.image = game.assets[BIG_RIG];
				break;
			default:
				console.log("error: car type " + type + " not found in MakeCar()");
				return null;
		};
	}

	//set position
	car.x = scene.road.XforLane(lane, car.width) + Math.floor(Math.random() * 10) - 5;
	car.y = (pos + car.height) * -1;
	car.type = type;
	//set car to scale
  //car.scale(.6);

	//add event listener
	car.addEventListener(Event.ENTER_FRAME, function(){
		this.y += 2; //scroll downwards

		if (this.y > game.height){	//scrolled past bottom of screen, despawn
			this.scene.spawnPool[this.type].push(this);
			this.scene.removeChild(this);
		if (game.player.intersect(this)){
            this.scene.removeChild(this);
            playerCar.loseHealth();
	    }
	});
	scene.addChild(car);
}
