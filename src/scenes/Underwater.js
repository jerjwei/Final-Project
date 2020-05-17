// underwater scene
class Underwater extends Phaser.Scene {
    constructor() {
        super("underwaterScene");
    }

    preload() {
        // load images / title sprite
        // preload.image('fileName', 'location')
        this.load.image('iceroad', './assets/iceroad.png');

    }

    create() {
        console.log('3');
        // place tile sprite
        this.iceroad = this.add.sprite(0, 0, 640, 480, 'iceroad').setOrigin(0, 0);
        

        // define our objects
        // this.sealunderwater = this.physics.add.sprite(this.sys.game.config.width/4, this.sys.game.config.height*0.75, 'seal01');
    }

    update() {
        
    }

}