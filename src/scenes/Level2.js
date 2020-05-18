class Level2 extends Phaser.Scene {
    constructor() {
        super("lvl2");
    }

    preload() {
        this.load.image('ground', './assets/platform.png');
        this.load.spritesheet('seal', './assets/slide.png', {frameWidth: 80, frameHeight: 47, startFrame: 0, endFrame: 9});

        // preload.music
        this.load.audio('jse', './assets/jumpsoundeffect.mp3');
    }

    create() {
        // define keyboard keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // define our objects
        this.seal = this.physics.add.sprite(this.sys.game.config.width/4, this.sys.game.config.height*0.6, 'seal');

        //set the gravity
        this.seal.setGravityY(1000);

        // ground setup
        this.ground01 = this.physics.add.sprite(0, this.sys.game.config.height*0.33, 'ground');
        this.ground02 = this.physics.add.sprite(this.sys.game.config.width*0.55, this.sys.game.config.height*0.33, 'ground');
        this.ground03 = this.physics.add.sprite(this.sys.game.config.width*0.27, this.sys.game.config.height*0.66, 'ground');
        this.ground04 = this.physics.add.sprite(this.sys.game.config.width*0.80, this.sys.game.config.height*0.66, 'ground');
        this.ground01.setImmovable();
        this.ground02.setImmovable();
        this.ground03.setImmovable();
        this.ground04.setImmovable();
        // add the colliders
        this.physics.add.collider(this.seal, this.ground01);
        this.physics.add.collider(this.seal, this.ground02);
        this.physics.add.collider(this.seal, this.ground03);
        this.physics.add.collider(this.seal, this.ground04);

        // walk animation
        this.anims.create({
            key: 'walking',
            frames: 'seal',
            frameRate: 10,
            repeat: -1
        });
        // jump animation
        this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 0, first: 0}),
            frameRate:30,
            repeat: -1
        });
    }

    jump() {
        this.seal.setVelocityY(-400);
        this.seal.anims.play('jumping');
        this.jumpTime++;
    }

    walk(){
        this.seal.anims.play('walking', true);
    }

    update() {
        let overConfig = {
            fontFamily: 'Bradley Hand',
            fontSize: '25px',
            color: '#3E5CA3',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 500
        }

        if( this.seal.body.touching.right ){
            this.gameOver = true;
            this.add.text(game.config.width/2, game.config.height/2 - 32, 'GAME OVER', overConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press [↑] to Restart or [←] for Menu', overConfig).setOrigin(0.5);
            this.bgm.stop();
        }

        // jump methods
        if( this.jumpTime<1 && Phaser.Input.Keyboard.JustDown(keyUP) ){
            this.arrowUp.destroy();
            this.jump();
            this.sound.play('jse');
            this.sound.volume = 0.4;
        }
        if( this.seal.body.touching.down ){
            this.jumpTime = 0;
            this.walk();
        }else if(this.jumpTime < 1){
            this.seal.anims.play('jumping',true);
        }

        // speed up method
        this.count += 1;
        if( this.count%17==1 ) {
            this.speed *= 1.01;
            this.iceSpeed *= 1.01;
        }

        // background movements

        // wrap physics object(s) .wrap(gameObject, padding)
    }
}