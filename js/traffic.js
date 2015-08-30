function MakeTraffic(game, spawnSheet){
	var scene = new Scene();

	scene.spawnRow 	= spawnSheet.length - 1; 	//create spawn property
	scene.spawnPool = [[],[],[]];	//create spawn pool
	//create road and attach it to the scene as a property
	MakeRoad(game, scene, spawnSheet.length, spawnSheet[0].length);

	scene.addEventListener(Event.ENTER_FRAME, function(){
		if (game.frame % 20 == 0 && this.scene.spawnRow >= 0){
			var car;
			for (var i = 0; i < this.scene.road.lanes; i++){
				if (spawnSheet[this.spawnRow][i] != null){
					SpawnCar(game, scene, 
						spawnSheet[this.spawnRow][i][0],	//type
						i,	//lane
						spawnSheet[this.spawnRow][i][1]);	//y pos
				}
			}
			this.spawnRow--;
		}
	});
	return scene;
}

