/* sprite filepaths */

//player
const MITCH = '/commuter/sprites/mitch.png';

//cars
const BLACK_CAR	= "/commuter/sprites/carBlack.png";
const BLUE_CAR 	= "/commuter/sprites/carBlue.png";
const RED_CAR 	= "/commuter/sprites/carRed.png";

//trucks
const BIG_RIG				= "/commuter/sprites/bigRig.png";
const RED_TRUCK			= "/commuter/sprites/truckRed.png";
const YELLOW_TRUCK	= "/commuter/sprites/truckYellow.png";

//load all the game assets
function LoadAssets(game){
	game.prload(
			BIG_RIG,
			BLACK_CAR,
			BLUE_CAR,
			RED_CAR,
			RED_TRUCK,
			YELLOW_TRUCK);
}
