function MakeTraffic(game, spawnSheet){
	console.log("traffic start");
	var scene = new Scene();

	scene.spawnRow = 0; 	//create spawn property
	scene.spawnPool = [];	//create spawn pool
	//create road and attach it to the scene as a property
	scene.road = MakeRoad(game, spawnSheet[0].length);
	scene.addChild(scene.road);

	scene.addEventListener(Event.ENTER_FRAME, function(){
		if (game.frame % 24 == 0 && this.scene.spawnRow < spawnSheet.length){
			console.log("spawning row: " + this.spawnRow);
			for (var i = 0; i < this.scene.road.lanes; i++){
				if (spawnSheet[this.spawnRow][i] == 1){
					var car;
					//try to pull a car from the spawnPool
					if (scene.spawnPool.length > 0){
						car = scene.spawnPool.pop();
					}
					else{
						car = MakeCar(game, "black");	//no cars in pool, create new
					}
					scene.addChild(car);
					car.x = scene.road.XforLane(i, car.width);
					car.y = car.height * -1;
					car.despawned = false;
				}
			}
			console.log(this.scene.spawnPool.length);
			this.spawnRow++;
		}
	});
	console.log("traffic end");
	return scene;
}

