CONST BLUECAR = "/commuter/"

class Car extends Sprite{
	const HEIGHT = 54;
	const WIDTH = 40;
	constructor(image, x, y){
		super(WIDTH, HEIGHT);
		this.image = image;
		this.x = x;
		this.y = y;
	}
}
