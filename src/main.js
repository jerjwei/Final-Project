// Date:          2020/05/16
// Group member:  Jia Wei, Rui Chen, Sunny Yan, Zihao Liu
// Game Name:     Secret Garden

// game configuration object
let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [ Level6, Menu, Level1, Level2, Level3, Level5 ]
}

// main game object
let game = new Phaser.Game(config);

// reserve keyboard vars
let keyUP, keyLEFT, keyDOWN, keyRIGHT, keyM, keyN, keyR, keyS;
let pointer;