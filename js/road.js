//sprite sheet constants
var ROAD = "/commuter/sprites/Road.png";
var TILE_SIZE = 60;

function RoadLoad(game){
	game.preload(ROAD);	//load road sprite sheet
};

function Road(game, intLanes){
	console.log("Road begin, lanes: " + intLanes);
	//new map which will be the road scrolling in the background
	var road = new Map(TILE_SIZE, TILE_SIZE);
	//move road to the middle of the screen
	road.x = (game.width - (TILE_SIZE * intLanes)) / 2;
	//load road sprite sheet
	road.image = game.assets[ROAD];
	//create road tile double array
	var roadMap = new Array((game.height / TILE_SIZE) + 1);
	for (var i = 0; i < roadMap.length; i++)
	{
		roadMap[i] = new Array(intLanes);
		for (var j = 0; j < roadMap[i].length; j++)
		{
			if (j == 0) 								//left lane
				roadMap[i][j] = 1;
			else if (j == intLanes - 1)	//right lane
				roadMap[i][j] = 2;
			else												//center lane
				roadMap[i][j] = 0;
		}
	}
	road.loadData(roadMap);
	//frame-by-frame road event
	road.addEventListener(enchant.Event.ENTER_FRAME, function() {
		//scroll road down
		//road.y = (this.age % TILE_SIZE) - TILE_SIZE;
		if (this.y >= 0)
			road.y = TILE_SIZE * -1;
		else
			road.y += 4;
	});
	//add road to scene
	game.rootScene.addChild(road);
	console.log("Road end");
};
