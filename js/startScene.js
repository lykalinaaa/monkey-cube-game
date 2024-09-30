class startScene extends Phaser.Scene {

    constructor() {
        super({ key: "startScene" });
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

        this.title = this.add.text(this.game.config.width * 0.5, 128, "MONKEY'S CUBES", {
            fontFamily: 'monospace',
            fontSize: 90,
            fontStyle: 'bold',
            color: '#DCF7BA',
            backgroundColor: '#228538',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        this.start = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.65, "To start the game press Enter", {
            fontFamily: 'monospace',
            fontSize: 30,
            fontStyle: 'bold',
            color: '#DCF7BA',
            align: 'center'
        });
        this.start.setOrigin(0.5);

        this.instruction = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.5, "You need to made a tower from cubes on the screen and take the fruit. \r\n To controll your cubes use buttons ONE, TWO, THREE, FOUR and FIVE, \r\nRIGHT and LEFT. You need to collect 3 fruits to win.", {
            fontFamily: 'monospace',
            fontSize: 25,
            backgroundColor: '#228538',
            fontStyle: 'bold',
            color: '#DCF7BA',
            align: 'center'
        });
        this.instruction.setOrigin(0.5);

    }

    update() {
        
        if (this.keys.enter.isDown) {
            this.scene.start('gameScene');           
        }
    }

}