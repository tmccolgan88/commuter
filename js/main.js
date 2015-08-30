enchant();

var game = null;
var road = null;
var player = null;

window.onload = function(){
  game = new Core(600, 600);
  game.scale = 1;
  game.fps = 60;
  game.preload("file:///K:/testdir/commuter/sprites/mitch.png");
  game.preload("file:///K:/testdir/commuter/sprites/carBlue.png");
  game.preload("file:///K:/testdir/commuter/sprites/health.png")
  game.preload("file:///K:/testdir/commuter/sprites/asphalt.png");
  
  game.onload = function(){
  game.keybind(38, "up");
  game.keybind(40, "down");
  game.keybind(37, "left");
  game.keybind(39, "right");
  game.keybind(87, "w");
  game.keybind(65, "a");
  game.keybind(83, "s");
  game.keybind(68, "d");
  game.keybind(81, "q");
  game.keybind(69, "e");
  
  road = Road(game, 6);
  console.log(road.intLanes);
  player = PlayerLoad(game, road);
  game.pushScene(player.getScene());
  //game.pushScene(road.GetScene());
  //game.rootScene.addChild(player.playerCar);
};
    game.start();
}

/*Calculate radians from degrees*/
function DegreesToRads(degrees){
  return degrees * (Math.PI/180);
}

/*Give praise to RNJesus and return a random number*/
function rand(digits){
    return Math.floor(Math.random() * digits);
}