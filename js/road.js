	//sprite sheet constants
	var ROAD = "/commuter/sprites/Road.png";
/*
	var ROADMAP = [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]];
 */

	var TILE_SIZE = 60;
	var SCREEN_HEIGHT = 600;

	var intLanes;		//number of lanes
	var roadMap;		//double array holding road sprite info

function RoadLoad(game, intLanes){
	game.preload(ROAD);				//reload road sprite sheet
	intLanes = this.intLanes; //set number of lanes
	//build road
	roadMap = new Array(SCREEN_HEIGHT / TILE_SIZE);
	for (var i = 0; i < SCREEN_HEIGHT / TILE_SIZE; i++)
	{
		roadMap[i] = new Array(intLanes);
		for (var j = 0; j < intLanes; j++)
		{
			roadMap[i][j] = 0;
		}
	}
};

function Road(game){
	console.log("Road begin");
	var roadSheet = game.assets[ROAD];
	var newRoad = new Surface(TILE_SIZE * intLanes, 60);
	var road = new Map(60, 60);

	road.image = roadSheet;
	game.rootScene.addChild(newRoad);
	game.rootScene.addChild(road);
	road.addEventListener(enchant.Event.ENTER_FRAME, function() {
		for (var intLane = 0; intLane = intLanes; sx++) {
			newRoad.draw(
				roadSheet,
				TILE_SIZE * (this.age % 6), 0,
				TILE_SIZE, TILE_SIZE,
				sx * intLane, 0,
				TILE_SIZE, TILE_SIZE
			);
		}
		road.loadData = roadMap;
		road.y = (this.age % 6) * 10;
	});
	console.log("Road end");
};
