class Level3 extends Phaser.Scene {
    constructor() {
        super("lvl3");
    }

    preload() {
        // load images / title sprite
        // preload.image('fileName', 'location')
        this.load.image('ground', './assets/platform.png');
        this.load.image('candy', './assets/candy.jpg');
        this.load.image('spider', './assets/spider.png');
        this.load.image('flower', './assets/flower.png');
        this.load.spritesheet('jump', './assets/jump1.png', {frameWidth: 73, frameHeight: 155, startFrame: 0, endFrame: 0});
        this.load.spritesheet('girl', './assets/player.png', {frameWidth: 73, frameHeight: 155, startFrame: 0, endFrame: 9});

        // preload.music
        this.load.audio('playscenebackground', './assets/bgm.mp3');
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
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    
        // background music
        this.bgm = this.sound.add('playscenebackground', {config});
        this.bgm.play();
        this.bgm.loop = true;
        this.bgm.volume = 0.6;
    
        // game over flag
        this.gameOver = false;

        // define our objects
        // girl
        this.girl = this.physics.add.sprite(1270, this.sys.game.config.height*0.68, 'girl');
        this.girl.setCollideWorldBounds(true);
        this.girl.setGravityY(this.gravitynum);
        this.girl.setFlipY(true);
        // candy
        this.candy1 = this.physics.add.sprite(this.sys.game.config.width/3, this.sys.game.config.height*0.25, 'candy');
        this.candy2 = this.physics.add.sprite(this.sys.game.config.width*0.45, this.sys.game.config.height*0.8, 'candy');
        this.candy3 = this.physics.add.sprite(this.sys.game.config.width*0.8, this.sys.game.config.height*0.3, 'candy');
        this.candy1.setImmovable();
        this.candy2.setImmovable();
        this.candy3.setImmovable();
        // spider
        this.spider1 = this.physics.add.sprite(this.sys.game.config.width*0.55, this.sys.game.config.height*0.15, 'spider');
        this.spider1.setFlipY(true);
        this.spider1.setImmovable();
        //flower
        this.flower1 = this.physics.add.sprite(this.sys.game.config.width*0.15, this.sys.game.config.height*0.28, 'flower');
        this.flower1.setImmovable();
        this.flower2 = this.physics.add.sprite(this.sys.game.config.width*0.15, this.sys.game.config.height*0.82, 'flower');
        this.flower2.setFlipY(true);
        this.flower2.setImmovable();
        // place the ground
        this.ground01 = this.physics.add.sprite(this.sys.game.config.width/4, this.sys.game.config.height*0.55, 'ground');
        this.ground01.displayWidth = 400;
        this.ground02 = this.physics.add.sprite(this.sys.game.config.width*0.85, this.sys.game.config.height*0.55, 'ground');
        this.ground02.displayWidth = 400;
        this.platform01 = this.physics.add.sprite(this.sys.game.config.width*0.15, this.sys.game.config.height*0.4, 'ground');
        this.platform01.displayWidth = 150;
        this.platform02 = this.physics.add.sprite(this.sys.game.config.width*0.15, this.sys.game.config.height*0.7, 'ground');
        this.platform02.displayWidth = 150;
        this.platform03 = this.physics.add.sprite(this.sys.game.config.width*0.33, this.sys.game.config.height*0.2, 'ground');
        this.platform03.displayWidth = 150;
        this.platform04 = this.physics.add.sprite(this.sys.game.config.width*0.55, this.sys.game.config.height*0.1, 'ground');
        this.platform04.displayWidth = 150;
        this.platform05 = this.physics.add.sprite(this.sys.game.config.width*0.55, this.sys.game.config.height*0.45, 'ground');
        this.platform05.displayWidth = 150;
        this.platform06 = this.physics.add.sprite(this.sys.game.config.width*0.45, this.sys.game.config.height*0.7, 'ground');
        this.platform06.displayWidth = 150;
        this.platform07 = this.physics.add.sprite(this.sys.game.config.width*0.8, this.sys.game.config.height*0.35, 'ground');
        this.platform07.displayWidth = 150;
        this.ground01.setImmovable();
        this.ground02.setImmovable();
        this.platform01.setImmovable();
        this.platform02.setImmovable();
        this.platform03.setImmovable();
        this.platform04.setImmovable();
        this.platform05.setImmovable();
        this.platform06.setImmovable();
        this.platform07.setImmovable();
        // place the borders
        this. borderup = this.physics.add.sprite(this.sys.game.config.width/2, 0, 'ground');
        this.borderup.displayWidth = this.sys.game.config.width * 1.1;
        this.borderup.setImmovable();
        this. borderdown = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height, 'ground');
        this.borderdown.displayWidth = this.sys.game.config.width * 1.1;
        this.borderdown.setImmovable();

        
        // add the colliders
        this.c1 = this.physics.add.collider(this.girl, this.ground01);
        this.physics.add.collider(this.girl, this.ground02);
        this.c2 = this.physics.add.collider(this.girl, this.platform01);
        this.c3 = this.physics.add.collider(this.girl, this.platform02);
        this.physics.add.collider(this.girl, this.platform03);
        this.physics.add.collider(this.girl, this.platform04);
        this.physics.add.collider(this.girl, this.platform05);
        this.physics.add.collider(this.girl, this.platform06);
        this.physics.add.collider(this.girl, this.platform07);
        this.physics.add.collider(this.girl, this.borderup);
        this.physics.add.collider(this.girl, this.borderdown);
        //this.physics.add.collider(this.girl, this.candy);
        

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
            fontSize: '40px',
            color: '#FFFFFF',
            align: 'middle',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 150
        }
        this.scoreS = this.add.text(70, 25, this.score, scoreConfig);
        scoreConfig.fontSize = '20px';
        scoreConfig.fixedWidth = 300;
        this.restart = this.add.text(120, 40, '[R] to restart lvl3', scoreConfig);
        // instruction text
        //this.arrowUp = this.add.text(this.sys.game.config.width / 4, 290, '↑', scoreConfig);
    }

    update() {
        // check key input for restart
        if (Phaser.Input.Keyboard.JustDown(keyR)){
            this.bgm.stop();
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.bgm.stop();
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
            this.add.text(game.config.width/2, game.config.height/2 - 32, 'You have got all three candies!', overConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press [M] for Menu', overConfig).setOrigin(0.5);
        }

        // move methods
        if( keyLEFT.isDown ){
            this.girl.body.setVelocityX(-200);
            this.girl.setFlipX(false);
        }else if ( keyRIGHT.isDown ){
            this.girl.body.setVelocityX(200);
            this.girl.setFlipX(true);
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
        }

        // transfer while collide with flowers
        if(this.physics.world.overlap(this.girl, this.flower1)){
            this.transfer(this.flower1,this.flower2);
        }

        // wrap physics object(s) .wrap(gameObject, padding)
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

    reverse(spider){
        spider.destroy();
        if(this.girl.flipY){
            this.girl.setFlipY(false);
        }else{
            this.girl.setFlipY(true);
        }
        this.gravitynum = 0 - this.gravitynum;
        this.girl.setGravityY(this.gravitynum);
    }

    transfer(flower1,flower2){
        flower1.destroy();
        flower2.destroy();
        this.girl.setPosition( this.sys.game.config.width*0.15, this.sys.game.config.height*0.82);
        this.girl.setFlipY(true);
        this.gravitynum = 0 - this.gravitynum;
        this.girl.setGravityY(this.gravitynum);      
    }
}