class Level1 extends Phaser.Scene {
    constructor() {
        super("lvl1");
    }

    preload() {
        // load images / title sprite
        // preload.image('fileName', 'location')
        this.load.image('ground', './assets/iceRoad.png');
        this.load.image('ice', './assets/ice.png');
        this.load.image('spider', './assets/spider.png');
        this.load.spritesheet('jump', './assets/jump1.png', {frameWidth: 80, frameHeight: 47, startFrame: 0, endFrame: 0});
        this.load.spritesheet('girl', './assets/player.png', {frameWidth: 80, frameHeight: 47, startFrame: 0, endFrame: 9});

        // preload.music
        this.load.audio('playscenebackground', './assets/07 Funny Companion().mp3');
        this.load.audio('jse', './assets/jumpsoundeffect.mp3');
    }

    create() {
        // variables and settings
        this.cameras.main.backgroundColor.setTo(0,0,0);
        this.DRAG = 380;
        this.jumpTime = 0;
        this.score = 0;
        this.gravitynum = -1000;

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

        // define our objects
        // girl
        this.girl = this.physics.add.sprite(this.sys.game.config.width/4, this.sys.game.config.height*0.27, 'girl');
        this.girl.setCollideWorldBounds(true);
        this.girl.setGravityY(this.gravitynum);
        this.girl.setFlipY(true);
        // ice
        this.ice = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.28, 'ice');
        this.ice.setImmovable();
        // spider
        this.spider = this.physics.add.sprite(this.sys.game.config.width*2/3, this.sys.game.config.height*0.28, 'spider');
        this.spider.setImmovable();
        // place the ground
        this.ground = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.2, 'ground');
        this.ground.displayWidth = this.sys.game.config.width * 0.5;
        this.ground.setImmovable();
        // place the borders
        this. borderup = this.physics.add.sprite(this.sys.game.config.width/2, 0, 'ground');
        this.borderup.displayWidth = this.sys.game.config.width * 1.1;
        this.borderup.setImmovable();
        this. borderdown = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height, 'ground');
        this.borderdown.displayWidth = this.sys.game.config.width * 1.1;
        this.borderdown.setImmovable();

        
        // add the colliders
        this.physics.add.collider(this.girl, this.ground);
        this.physics.add.collider(this.girl, this.borderup);
        this.physics.add.collider(this.girl, this.borderdown);
        //this.physics.add.collider(this.girl, this.ice);
        

        // animations
        // walk animation
        this.anims.create({
            key: 'walking',
            frames: 'girl',
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
        this.scoreS = this.add.text(70, 25, this.score, scoreConfig);
        // instruction text
        //this.arrowUp = this.add.text(this.sys.game.config.width / 4, 290, '↑', scoreConfig);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // game over settings
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
        if( this.score == 3 ){
            this.gameOver = true;
            this.add.text(game.config.width/2, game.config.height/2 - 32, 'GAME OVER', overConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press [↑] to Restart or [←] for Menu', overConfig).setOrigin(0.5);
            this.bgm.stop();
        }

        // move methods
        if( keyLEFT.isDown ){
            this.girl.body.setVelocityX(-200);
            this.girl.setFlipX(true);
        }else if ( keyRIGHT.isDown ){
            this.girl.body.setVelocityX(200);
            this.girl.setFlipX(false);
        }else {
            this.girl.body.setDragX(this.DRAG);
        }
        
        // single/double-jump twice method
        if( this.girl.flipY ){
            if( this.jumpTime<1 && Phaser.Input.Keyboard.JustDown(keyDOWN) ){
                //this.arrowUp.destroy();
                this.jump();
                this.sound.play('jse');
                this.sound.volume = 0.4;
            }
            if( this.girl.body.touching.up ){
                this.jumpTime = 0;
                this.walk();
            }else if(this.jumpTime < 1){
                this.girl.anims.play('jumping',true);
            }
        } else{
            if( this.jumpTime<1 && Phaser.Input.Keyboard.JustDown(keyUP) ){
                this.jumpup();
                this.sound.play('jse');
                this.sound.volume = 0.4;
            }
            if( this.girl.body.touching.down ){
                this.jumpTime = 0;
                this.walk();
            }else if(this.jumpTime < 1){
                this.girl.anims.play('jumping',true);
            }
        }

        // ice collect method
        if(this.physics.world.overlap(this.girl, this.ice)){
            this.icecollect();
        }

        // reverse while collide with spiders
        if(this.physics.world.overlap(this.girl, this.spider)){
            this.reverse();
        }

        // wrap physics object(s) .wrap(gameObject, padding)
    }

    jump() {
        this.girl.setVelocityY(350);
        this.girl.anims.play('jumping');
        this.jumpTime++;
    }

    jumpup(){
        this.girl.setVelocityY(-350);
        this.girl.anims.play('jumping');
        this.jumpTime++;
    }

    walk(){
        this.girl.anims.play('walking', true);
    }

    icecollect(){
        this.ice.destroy();
        this.score += 1;
        this.scoreS.text = this.score;
    }

    reverse(){
        this.spider.destroy();
        this.girl.setFlipY(false);
        this.girl.setGravityY(-this.gravitynum);
    }
}