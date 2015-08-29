function MakeRoad(game, intLanes){
	const TILE_SIZE = 60;
	console.log("Road begin, lanes: " + intLanes);
	var road = new Map(TILE_SIZE, TILE_SIZE);

	//-----------custom properties-----------------
	road.tileSize = TILE_SIZE;
	road.lanes = intLanes;
	//move road to the middle of the screen
	road.x = (game.width - (TILE_SIZE * road.lanes)) / 2;
	//load road sprite sheet
	road.image = game.assets[ASPHALT];
	//create road tile double array
	var roadMap = new Array((game.height / road.tileSize) + 1);
	for (var i = 0; i < roadMap.length; i++)
	{
		roadMap[i] = new Array(road.lanes);
		for (var j = 0; j < roadMap[i].length; j++)
		{
			if (j == 0) 								//left lane
				roadMap[i][j] = 1;
			else if (j == road.lanes - 1)	//right lane
				roadMap[i][j] = 2;
			else												//center lane
				roadMap[i][j] = 0;
		}
	}
	road.loadData(roadMap);
	//frame-by-frame road event
	road.addEventListener(Event.ENTER_FRAME, function() {
		//scroll road down
		if (this.y >= 0)
			this.y = this.tileSize * -1;
		else
			this.y += 4;
	});

	//---------------custom functions---------------------
	/**
	 * gives you the X starting position for a new sprite in any lane, 0 on error
	 * X for Lane
	 * lane - which lane you want to start from, starting from 1
	 * width - width of the sprite you are spawning
	 */
	road.XforLane = function(lane, width){
		try{
			return this.x + (this.tileSize * lane) + this.Xbuffer(width);
		}
		catch(e){
			console.log("error in XforLane: " + e);
			return 0;
		}
	};
	/**
	 * amount of space between a sprite and the next lane, if the sprite was in the middle of the lane
	 */
	road.Xbuffer = function(width){
		return (this.tileSize - width) / 2;
	};

	road.RandLane = function(){
		return Math.floor(Math.random() * this.lanes);
	};
	console.log("Road End");
	return road;
}
