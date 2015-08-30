/* sprite filepaths */

const ASPHALT				= "file:///K:/commuter/sprites/asphalt.png";
const BIG_RIG				= "file:///K:/commuter/sprites/bigRig.png";
const CAR_BLACK			= "file:///K:/commuter/sprites/carBlack.png";
const CAR_BLUE 			= "file:///K:/commuter/sprites/carBlue.png";
const HEALTH				= "file:///K:/commuter/sprites/health.png";
const MITCH 				= 'file:///K:/commuter/sprites/mitch.png';
const RED_CAR 			= "file:///K:/commuter/sprites/carRed.png";
const TRUCK_YELLOW	= "file:///K:/commuter/sprites/truckYellow.png";
const TRUCK_BLUE		= "file:///K:/commuter/sprites/truckBlue.png";

//load all the game assets
function LoadAssets(game){
	game.preload(
			ASPHALT,
			BIG_RIG,
			CAR_BLACK,
			CAR_BLUE,
			HEALTH,
			MITCH,
			RED_CAR,
			TRUCK_BLUE,
			TRUCK_YELLOW);
}
