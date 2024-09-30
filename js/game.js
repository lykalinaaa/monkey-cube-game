//конфигурация игры
var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },

    scene: [
        startScene, 
        gameScene,
        endScene
    ]
}

var game = new Phaser.Game(config); //создание игры

