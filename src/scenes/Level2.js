class Level2 extends Phaser.Scene {
    constructor() {
        super("lvl2");
    }

    preload() {
        this.load.image('ground', './assets/platform.png');
        this.load.image('spider', './assets/spider.png');
        this.load.image('candy', './assets/candy.jpg');
        this.load.image('flower', './assets/flower.png');
        this.load.spritesheet('girl', './assets/player.png', {frameWidth: 73, frameHeight: 155, startFrame: 0, endFrame: 9});

        // preload.music
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

        // girl
        this.girl = this.physics.add.sprite(10, this.sys.game.config.height*0.45, 'girl');
        this.girl.setCollideWorldBounds(true);
        this.girl.setGravityY(this.gravitynum);
        this.girl.setFlipY(true);
        this.girl.setFlipX(true);
        
        // candy
        this.candy1 = this.physics.add.sprite(this.sys.game.config.width*0.5, this.sys.game.config.height*0.5, 'candy');
        this.candy1.setImmovable();

        // flower (can transfer player)
        this.flower1 = this.physics.add.sprite(this.sys.game.config.width*0.35, this.sys.game.config.height*0.23, 'flower');
        this.flower1.setFlipY(true);
        this.flower2 = this.physics.add.sprite(this.sys.game.config.width*0.65, this.sys.game.config.height*0.23, 'flower');
        this.flower2.setFlipY(true);
        this.flower3 = this.physics.add.sprite(this.sys.game.config.width*0.35, this.sys.game.config.height*0.77, 'flower');
        this.flower4 = this.physics.add.sprite(this.sys.game.config.width*0.65, this.sys.game.config.height*0.77, 'flower');
        this.flower1.setImmovable();
        this.flower2.setImmovable();
        this.flower3.setImmovable();
        this.flower4.setImmovable();

        // ground setup
        this.ground01 = this.physics.add.sprite(this.sys.game.config.width*0.35, this.sys.game.config.height*0.1, 'ground');
        this.ground02 = this.physics.add.sprite(this.sys.game.config.width*0.65, this.sys.game.config.height*0.1, 'ground');
        this.ground03 = this.physics.add.sprite(this.sys.game.config.width*0.05, this.sys.game.config.height*0.5, 'ground');
        this.ground04 = this.physics.add.sprite(this.sys.game.config.width*0.35, this.sys.game.config.height*0.9, 'ground');
        this.ground05 = this.physics.add.sprite(this.sys.game.config.width*0.65, this.sys.game.config.height*0.9, 'ground');
        this.ground06 = this.physics.add.sprite(this.sys.game.config.width*0.95, this.sys.game.config.height*0.5, 'ground');
        this.ground01.setImmovable();
        this.ground02.setImmovable();
        this.ground03.setImmovable();
        this.ground04.setImmovable();
        this.ground05.setImmovable();
        this.ground06.setImmovable();
        // add the colliders
        this.physics.add.collider(this.girl, this.ground01);
        this.physics.add.collider(this.girl, this.ground02);
        this.physics.add.collider(this.girl, this.ground03);
        this.physics.add.collider(this.girl, this.ground04);
        this.physics.add.collider(this.girl, this.ground05);
        this.physics.add.collider(this.girl, this.ground06);
        this.physics.add.collider(this.girl, this.flower1);
        this.physics.add.collider(this.girl, this.flower2);
        this.physics.add.collider(this.girl, this.flower3);
        this.physics.add.collider(this.girl, this.flower4);

        // place the borders
        this.borderup = this.physics.add.sprite(this.sys.game.config.width/2, 0, 'ground');
        this.borderup.displayWidth = this.sys.game.config.width * 3;
        this.borderup.setImmovable();
        this.borderdown = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height, 'ground');
        this.borderdown.displayWidth = this.sys.game.config.width * 3;
        this.borderdown.setImmovable();
        this.physics.add.collider(this.girl, this.borderup);
        this.physics.add.collider(this.girl, this.borderdown);

        // game over flag
        this.gameOver = false;

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
        if(this.flower1.body.touching.left){
            this.girl.destroy();
            this.girl = this.physics.add.sprite(0, this.sys.game.config.height*0.5, 'girl');
            this.girl.setCollideWorldBounds(true);
            this.girl.setGravityY(1000);
        }
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.start("lvl3");
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
        if( this.score == 1 ){
            this.gameOver = true;
            this.add.text(game.config.width/2, game.config.height/2 - 32, 'You have got all three candies!', overConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press [↑] to Level3 or [←] for Menu', overConfig).setOrigin(0.5);
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
                //this.girl.anims.play('jumping',true);
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

        // candy collect method
        if(this.physics.world.overlap(this.girl, this.candy1)){
            this.candycollect(this.candy1);
        }else if(this.physics.world.overlap(this.girl, this.candy2)){
            this.candycollect(this.candy2);
        }else if(this.physics.world.overlap(this.girl, this.candy3)){
            this.candycollect(this.candy3);
        }

        // reverse while collide with spiders
        if(this.physics.world.overlap(this.girl, this.spider1)){
            this.reverse(this.spider1);
        }else if(this.physics.world.overlap(this.girl, this.spider2)){
            this.reverse(this.spider2);
        }else if(this.physics.world.overlap(this.girl, this.spider3)){
            this.reverse(this.spider3);
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
                //this.girl.anims.play('jumping',true);
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

    candycollect(candy){
        candy.destroy();
        this.score += 1;
        this.scoreS.text = this.score;
    }

    // background movements

    // wrap physics object(s) .wrap(gameObject, padding)
}