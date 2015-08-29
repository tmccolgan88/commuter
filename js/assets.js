/* sprite filepaths */

const ASPHALT				= "/commuter/sprites/asphalt.png";
const BIG_RIG				= "/commuter/sprites/bigRig.png";
const BLACK_CAR			= "/commuter/sprites/carBlack.png";
const BLUE_CAR 			= "/commuter/sprites/carBlue.png";
const HEALTH				= "/commuter/sprites/health.png";
const MITCH 				= '/commuter/sprites/mitch.png';
const RED_CAR 			= "/commuter/sprites/carRed.png";
const TRUCK_YELLOW	= "/commuter/sprites/truckYellow.png";
const TRUCK_BLUE		= "/commuter/sprites/truckBlue.png";

//load all the game assets
function LoadAssets(game){
	game.preload(
			ASPHALT,
			BIG_RIG,
			BLACK_CAR,
			BLUE_CAR,
			HEALTH,
			MITCH,
			RED_CAR,
			TRUCK_BLUE,
			TRUCK_YELLOW);
}
