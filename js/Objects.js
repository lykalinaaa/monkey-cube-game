class Object extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, key) {
		super(scene, x, y, key);
		this.scene = scene;
		this.scene.add.existing(this);
		this.scene.physics.world.enableBody(this, 0);
		
	}
}

class Box extends Object {
	constructor(scene, x, y, key) {
		super(scene, x, y, key, "Box");
		this.position = false;
		this.f = 0;
		this.scale_a;

	}

	create() {
		//константы для управления кубами с клавиатуры, ключевые слова из библиотеки Phaser
		const { LEFT, RIGHT, ONE, ENTER, DOWN } = Phaser.Input.Keyboard.KeyCodes;
		this.keys = this.input.keyboard.addKeys({
			left: LEFT,
			right: RIGHT,
			enter: ENTER,
			down: DOWN,
			one: ONE
		});
	}

	set_Scale(a) {
		this.body.scale_a = a;
		this.body.height = 505 * a;
    }

	get_height() {
		return 500 * this.body.scale_a;
    }

	moveLeft() {
		this.body.velocity.x = -450;
	}

	moveRight() {
		this.body.velocity.x = 450;
	}

	set_pos(a) {
		this.position = a;
	}

	set_f(a) {
		this.f = a;
	}

	update() {
		this.body.setVelocity(0, 0);
    }
}

class Player extends Object {
	constructor(scene, x, y, key) {
		super(scene, x, y, key, "Player");
		this.body.allowGravity = false;
	}

	update() {
		this.body.setVelocity(0, 0);
	}
}


class Fruit extends Object {
	constructor(scene, x, y, key) {
		super(scene, x, y, key, "Fruit");
		this.body.allowGravity = false;
		
	}

	move(a, b) {
		this.body.x = a;
		this.body.y = b;
	}

	update() {
		this.body.setVelocity(0, 0);
	}
}