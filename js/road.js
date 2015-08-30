function MakeRoad(game, scene, length, intLanes){
	const TILE_SIZE = 60;
	const MED_SPEED = 4;
	console.log("Road begin, lanes: " + intLanes);
	var road = new Map(TILE_SIZE, TILE_SIZE);
	scene.road = road;
	//-----------custom properties-----------------
	road.tileSize	= TILE_SIZE;
	road.lanes 		= intLanes;
	road.speed 		= MED_SPEED;
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
			if (j == 0) 									//left lane
				roadMap[i][j] = 1;
			else if (j == road.lanes - 1)	//right lane
				roadMap[i][j] = 2;
			else													//center lane
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
			this.y += this.speed;
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
	MakeGrass(game, scene, length);
	scene.addChild(road);
}

function MakeGrass(game, scene, length){
	console.log("MakeGrass start");
	const TILE_SIZE = 48;
	var map = new Map(TILE_SIZE, TILE_SIZE);
	map.image = game.assets[GRASS];

	//create map long enought to go through the whole level
	var grass = new Array(length * 10); 
	var trees = new Array(grass.length);
	var roadLeft = scene.road.x;
	var roadRight = roadLeft + scene.road.width - TILE_SIZE;
	for (var i = 0; i < grass.length; i++){
		grass[i] = new Array(Math.floor(game.width / TILE_SIZE) + 1);
		trees[i] = new Array(grass[i].length);
		for (var j = 0; j < grass[i].length; j++){
			if (j * TILE_SIZE < roadLeft || j * TILE_SIZE > roadRight){
				grass[i][j] = 1;
				if ((TILE_SIZE * (j + 1) < roadLeft || TILE_SIZE * j > scene.road.x + scene.road.width) 
						&& (Math.floor(Math.random() * 10) % 5 == 0)){
					trees[i][j] = 13;
				}
				else
					trees[i][j] = 25;
			}
			else
			{
				grass[i][j] = 25;
				trees[i][j] = 25;
			}
		}
	}
	map.loadData(grass, trees);
	//map.loadData(trees);

	//set position
	map.y = (map.height - game.height) * -1;

	//set scrolling to match road
	map.addEventListener(Event.ENTER_FRAME, function(){
		this.y += this.scene.road.speed;
	});

	//add to scene
	scene.addChild(map);
	console.log("MakeGrass end");
}
