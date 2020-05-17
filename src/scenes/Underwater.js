// underwater scene
class Underwater extends Phaser.Scene {
    constructor() {
        super("underwaterScene");
    }

    preload() {
        // load images / title sprite
        this.load.image('ground', './assets/iceRoad.png');
        this.load.image('background', './assets/background.png');
        this.load.spritesheet('seal', './assets/slide.png', {frameWidth: 80, frameHeight: 47, startFrame: 0, endFrame: 9});


    }

    create() {
        // define keyboard keys
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        // place the ground
        this.ground = this.physics.add.sprite(this.sys.game.config.width/2, 50, 'ground');
        // make the ground stay in place
        this.ground.setImmovable();

        // define our objects
        this.seal = this.physics.add.sprite(this.sys.game.config.width/4, this.sys.game.config.height*0.45, 'seal');
        //set the gravity
        this.seal.setGravityY(-1000);

        // add the colliders
        this.physics.add.collider(this.seal, this.ground);
        

    }

    dive() {
        this.seal.setVelocityY(400);
        //this.seal.anims.play('jumping');
        //this.jumpTime++;
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            //this.arrowUp.destroy();
            this.dive();
            //this.sound.play('jse');
            //this.sound.volume = 0.4;
        }
    }

}