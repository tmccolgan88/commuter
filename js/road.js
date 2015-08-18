	//sprite sheet constants
	var ROAD = "sprites/Road.png";
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
	var roadmap;

	var TILE_SIZE = 60;
	var SCREEN_HEIGHT;

	var intLanes;
function RoadLoad(game, intLanes){
	game.preload(ROAD);
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
	//roadmap
}

function Road(game){
	var roadSheet = game.assets[ROAD];
	var newRoad = new Surface(60);
	var road = new Map(60, 60);

	road.image = roadSheet;
	road.loadData(roadmap);
	game.rootScene.addChild(newRoad);
	game.rootScene.addChild(road);
	road.addEventListener(enchant.Event.ENTER_FRAME, function() {
		for (var sx = 600 - (TILE_SIZE * intLanes); sx < game.width; sx += TILE_SIZE) {
			newRoad.draw(
				roadSheet,
				TILE_SIZE * (this.age % 6), 0,
				TILE_SIZE, TILE_SIZE,
				sx, 0,
				TILE_SIZE, TILE_SIZE
			);
		}

		road.y = (this.age % 6) * 10;
	});
};
