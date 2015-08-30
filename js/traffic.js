function MakeTraffic(game, spawnSheet){
	console.log("traffic start");
	var scene = new Scene();

	scene.spawnRow = 0; //create spawn property
	//create road and attach it to the scene as a property
	scene.road = MakeRoad(game, spawnSheet[0].length);
	scene.addChild(scene.road);


	scene.addEventListener(Event.ENTER_FRAME, function(){
		if (game.frame % 24 == 0 && this.scene.spawnRow < spawnSheet.length){
			for (var i = 0; i < this.scene.road.lanes; i++){
				if (spawnSheet[this.spawnRow][i] == 1){
					var car = MakeCar(game, "black");
					car.x = this.scene.road.XforLane(i, car.width);
					car.y = car.height * -1;
					scene.addChild(car);
				}
			}
			this.spawnRow++;
		}
	});
	console.log("traffic end");
	return scene;
}

