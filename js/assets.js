/* sprite filepaths */

const ASPHALT				= "/commuter/sprites/asphalt.png";
const BIG_RIG				= "/commuter/sprites/bigRig.png";
const CAR_BLACK			= "/commuter/sprites/carBlack.png";
const CAR_BLUE 			= "/commuter/sprites/carBlue.png";
const GRASS					= "/commuter/sprites/grass.png";
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
			CAR_BLACK,
			CAR_BLUE,
			GRASS,
			HEALTH,
			MITCH,
			RED_CAR,
			TRUCK_BLUE,
			TRUCK_YELLOW);
}
