function MakeCar(game, color){
	console.log("creating " + color + " car");
	var car = new Sprite(40, 54);

	//get image asset based on color
	switch (color){
		case "black":
			car.image = game.assets[CAR_BLACK];
			break;
		case "blue":
			car.image = game.assets[CAR_BLUE];
		default:
			return null;
	};

	//set car to scale
  car.scale(.6);

	//add event listener
	car.addEventListener(Event.ENTER_FRAME, function(){
		this.y += 3; //scroll downwards

		if (this.y > game.height){	//scrolled past bottom of screen, despawn
			this.scene.spawnPool.push(this);
			this.scene.removeChild(this);
		}
		else if (game.player.intersect(this)){	//intersected with a 
			game.player.loseHealth();
		}
	});

	return car;
}
