class Level1 extends Phaser.Scene {
    constructor() {
        super("lvl1");
    }

    preload() {
        // load images / title sprite
        // preload.image('fileName', 'location')
        this.load.image('ground', './assets/iceRoad.png');
        this.load.image('ice', './assets/ice.png');
        this.load.spritesheet('jump', './assets/jump1.png', {frameWidth: 80, frameHeight: 47, startFrame: 0, endFrame: 0});
        this.load.image('hole', './assets/hole.png');
        this.load.spritesheet('seal', './assets/slide.png', {frameWidth: 80, frameHeight: 47, startFrame: 0, endFrame: 9});

        // preload.music
        this.load.audio('playscenebackground', './assets/07 Funny Companion().mp3');
        this.load.audio('jse', './assets/jumpsoundeffect.mp3');
    }

    create() {
        this.cameras.main.backgroundColor.setTo(0,0,0);

        // define keyboard keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    
        // background music
        this.bgm = this.sound.add('playscenebackground', {config});
        this.bgm.play();
        this.bgm.loop = true;
        this.bgm.volume = 0.4;
    
        // game over flag
        this.gameOver = false;

        // add ice 
        this.iceSpeed = -60;
        this.iceCount = 1;

        // define our objects
        this.seal = this.physics.add.sprite(this.sys.game.config.width/4, this.sys.game.config.height*0.6, 'seal');

        //set the gravity
        this.seal.setGravityY(1000);
        // place the ground
        this.ground = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.87, 'ground');
        // size the ground
        this.ground.displayWidth = this.sys.game.config.width * 1.1;
        // make the ground stay in place
        this.ground.setImmovable();
        
        // add the colliders
        this.physics.add.collider(this.seal, this.ground);


        // jump method
        this.jumpTime = 1;

        // animations
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

        // score display
        this.playerScore = 0;
        let scoreConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '30px',
            color: '#17306A',
            align: 'middle',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 150
        }
        this.arrowUp = this.add.text(this.sys.game.config.width / 4, 290, '↑', scoreConfig);
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
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("underwaterScene");
        }

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

        // wrap physics object(s) .wrap(gameObject, padding)
    }
}