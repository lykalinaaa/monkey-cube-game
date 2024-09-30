class endScene extends Phaser.Scene {

    constructor() {
        super({ key: "endScene" });
        
    }

    init(data) {
        this.finalwinner = data.turn;
    }

    preload() {
        this.load.image("monkey_win", "pic/monkey_win.png");
        this.load.image("boy_win", "pic/boy_win.png");
    }

    create() {

        const { LEFT, RIGHT, ONE, ENTER, DOWN } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            enter: ENTER,
            down: DOWN,
            one: ONE
        });

        console.log(this.finalwinner);
        if (this.finalwinner == 0) {
            this.winner = this.add.text(this.game.config.width * 0.55, this.game.config.height * 0.3, "You won!!!", {
                fontFamily: 'monospace',
                fontSize: 80,
                fontStyle: 'bold',
                backgroundColor: '#228538',
                color: '#DCF7BA',
                align: 'center'
            });
            this.winner.setOrigin(0.5);

            this.boy = this.add.sprite(this.game.config.width * 0.55 - 300, this.game.config.height * 0.3, 'boy_win');
        }
        else {
            this.winner = this.add.text(this.game.config.width * 0.45, this.game.config.height * 0.3, "Monkey won(((", {
                fontFamily: 'monospace',
                fontSize: 70,
                fontStyle: 'bold',
                backgroundColor: '#228538',
                color: '#DCF7BA',
                align: 'center'
            });
            this.winner.setOrigin(0.5);

            this.monkey = this.add.sprite(this.game.config.width - 500, this.game.config.height * 0.3, 'monkey_win');
        }

        this.end = this.add.text(this.game.config.width * 0.5, 400, "To start the game again press Enter", {
            fontFamily: 'monospace',
            fontSize: 30,
            fontStyle: 'bold',
            color: '#DCF7BA',
            align: 'center'
        });
        this.end.setOrigin(0.5);

    }

    update() {

        if (this.keys.enter.isDown) {
            this.scene.start('startScene');
        }

    }

}