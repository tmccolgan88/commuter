var car = Class.create(Sprite, {
	const HEIGHT = 54;
	const WIDTH = 40;
	initialize: function(image, x, y){
		super(WIDTH, HEIGHT);
		this.image = image;
		this.x = x;
		this.y = y;
	}
}
