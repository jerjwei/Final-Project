class Level2 extends Phaser.Scene {
    constructor() {
        super("lvl2");
    }

    preload() {
        this.load.image('ground', './assets/platform.png');
        this.load.spritesheet('girl', './assets/player.png', {frameWidth: 80, frameHeight: 47, startFrame: 0, endFrame: 9});

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
        this.girl = this.physics.add.sprite(this.sys.game.config.width/4, this.sys.game.config.height*0.6, 'girl');

        //set the gravity
        this.girl.setGravityY(1000);

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
        this.physics.add.collider(this.girl, this.ground01);
        this.physics.add.collider(this.girl, this.ground02);
        this.physics.add.collider(this.girl, this.ground03);
        this.physics.add.collider(this.girl, this.ground04);

        // animations
        // walk animation
        this.anims.create({
            key: 'walking',
            //frames: 'girl',
            //frameRate: 10,
            repeat: -1
        });
        // jump animation
        this.anims.create({
            key: 'jumping',
            //frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 0, first: 0}),
            //frameRate:30,
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
                //this.girl.anims.play('jumping',true);
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

        // jump methods
        if( this.jumpTime<1 && Phaser.Input.Keyboard.JustDown(keyUP) ){
            this.arrowUp.destroy();
            this.jump();
            this.sound.play('jse');
            this.sound.volume = 0.4;
        }
        if( this.girl.body.touching.down ){
            this.jumpTime = 0;
            this.walk();
        }else if(this.jumpTime < 1){
            //this.girl.anims.play('jumping',true);
        }

        // speed up method
        this.count += 1;
        if( this.count%17==1 ) {
            this.speed *= 1.01;
            this.iceSpeed *= 1.01;
        }

    }
    jump() {
        this.girl.setVelocityY(350);
        //this.girl.anims.play('jumping');
        this.jumpTime++;
    }

    jumpup(){
        this.girl.setVelocityY(-350);
        //this.girl.anims.play('jumping');
        this.jumpTime++;
    }

    walk(){
        //this.girl.anims.play('walking', true);
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
    // background movements

    // wrap physics object(s) .wrap(gameObject, padding)
}