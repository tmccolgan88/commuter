function MakeCar(game, color){
	var car = new Sprite(40, 54);
    car.scale(.6);
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

	car.addEventListener(Event.ENTER_FRAME, function(){
		this.y += 3;

		if (this.y > game.height)
			this.scene.removeChild(this);
		if (game.player.intersect(this))
			game.player.loseHealth();
	});

	return car;
}
