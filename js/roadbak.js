//sprite sheet constants
var SPRITE_SHEET = "file:///K:/testdir/commuter/sprites/asphalt.png";
var TILE_SIZE = 60;

var intLanes;	//amount of lanes
var road;			//Enchant.Map
var scene = null;
function RoadLoad(game){
	game.preload(SPRITE_SHEET);	//load road sprite sheet
};

function Road(game, intLanes){
	this.intLanes = intLanes;	//store amount of lanes to global
	console.log("Road begin, lanes: " + intLanes);
	this.scene = new Scene();
	//new map which will be the road scrolling in the background
	road = new Map(TILE_SIZE, TILE_SIZE);
	//move road to the middle of the screen
	road.x = (game.width - (TILE_SIZE * intLanes)) / 2;
	//load road sprite sheet
	road.image = game.assets[SPRITE_SHEET];
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
	road.addEventListener('enterframe', function() {
       	//scroll road down
		if (this.y >= 0)
			road.y = TILE_SIZE * -1;
		else
			road.y += 4;
	});
	//add road to scene
	//game.rootScene.addChild(road);
	scene.addChild(road);
	console.log("Road end");
	console.log("this" + this);
	return this;
};

/**
 * gives you the X starting position for a new sprite in any lane, 0 on error
 * X for Lane
 * lane - which lane you want to start from, starting from 1
 * width - width of the sprite you are spawning
 */
var XforLane = function (lane, width){
	try{
		return road.x + (TILE_SIZE * lane) + Xbuffer(width);
	}
	catch(e){
		console.log("error: XforLane");
		return 0;
	}
}
/**
 * amount of space between a sprite and the next lane, if the sprite was in the middle of the lane
 */
function Xbuffer(width){
	return (TILE_SIZE - width) / 2;
}

function GetScene(){
	return this.scene;
}

function RandLane(){
	return Math.floor(Math.random() * intLanes);
}
