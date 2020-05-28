class Level4 extends Phaser.Scene {
    constructor() {
        super("lvl4");
    }

    preload() {
        this.load.image('border_down', './assets/border_down.png');
        this.load.image('border_up', './assets/border_up.png');
        this.load.image('border_left', './assets/border_left.png');
        this.load.image('border_right', './assets/border_right.png');
        this.load.image('candy', './assets/candy.png');
        this.load.image('ci_2', './assets/lvl4_sprites/ci_2.png');
        this.load.image('ci_3', './assets/lvl4_sprites/ci_3.png');
        this.load.image('plat', './assets/lvl1_terrain/ground_short.png');
        this.load.image('upPlain', './assets/lvl4_sprites/level4_upper.png');
        this.load.image('midPlain', './assets/lvl4_sprites/level4_middle.png');
        this.load.image('mid', './assets/lvl4_sprites/level4_middleUpper.png');
        this.load.image('bottom', './assets/lvl4_sprites/level4_bottomGround.png');
        this.load.spritesheet('girl', './assets/player.png', {frameWidth: 73, frameHeight: 155, startFrame: 0, endFrame: 9});

        // preload.music
        this.load.audio('playscenebackground', './assets/bgm.mp3');
        this.load.audio('jse', './assets/jumpsoundeffect.mp3');
    }

    create() {
        // variables and settings
        this.scale.setGameSize(720, 1280);
        this.DRAG = 500;
        this.score = 0;
        this.gravityYnum = 2000;
        this.anglenum = 0;

        // define keyboard keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
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
        this.youDie = false;

        // define our objects
        // girl
        this.girl = this.physics.add.sprite(720*0.7, 1280*0.2, 'girl');
        this.girl.setCollideWorldBounds(true);
        this.girl.setGravityY(this.gravityYnum);
        this.girl.setFlipX(true);

        // candy
        this.candy1 = this.physics.add.sprite(720/2, 1280*0.4, 'candy');
        this.candy1.setImmovable();

        // implement terrains
        this.bottom = this.physics.add.sprite(200, 1280*0.9, 'bottom');
        this.bottom.setImmovable();
        this.physics.add.collider(this.girl, this.bottom);




        // place the borders
        // down border
        this.borderdown = this.physics.add.sprite(720*0.5, 1280-33, 'border_right');
        this.borderdown.angle+=90;
        this.borderdown.displayHeight = 720 * 1.1;
        this.borderdown.setImmovable(); 
        
        //right border
        this.borderright = this.physics.add.sprite(720-32, 1280/2, 'border_up');
        this.borderright.angle+=90;
        this.borderright.displayWidth = 1280 * 1.1;
        this.borderright.setImmovable();

        // up border
        this.borderup = this.physics.add.sprite(720/2, 32, 'border_left');
        this.borderup.angle+=90;
        this.borderup.displayHeight = 720 * 1.1;
        this.borderup.setImmovable();

        //left border
        this.borderleft = this.physics.add.sprite(32, 1280/2, 'border_down');
        this.borderleft.angle+=90;
        this.borderleft.displayWidth = 1280 * 1.1;
        this.borderleft.setImmovable();

        // add the colliders
        this.physics.add.collider(this.girl, this.borderup);
        this.physics.add.collider(this.girl, this.borderdown);
        this.physics.add.collider(this.girl, this.borderleft);
        this.physics.add.collider(this.girl, this.borderright);

        // score display
        this.playerScore = 0;
        let scoreConfigconfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '40px',
            color: '#FFFFFF',
            align: 'middle',
            padding: {
                top: 35,
                bottom: 25,
            },
            fixedWidth: 150
        }
        this.scoreS = this.add.text(70, 25, this.score, scoreConfigconfig);
        scoreConfigconfig.fontSize = '20px';
        scoreConfigconfig.fixedWidth = 300;
        this.restart = this.add.text(120, 40, '[R] to restart lvl3', scoreConfigconfig);
    }

    update() {
        // check key input for restart
        if (Phaser.Input.Keyboard.JustDown(keyR)){
            this.bgm.stop();
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyN)) {
            this.bgm.stop();
            this.scene.start("lvl3");
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.bgm.stop();
            this.scene.start("menuScene");
        }
        if (this.youDie && Phaser.Input.Keyboard.JustDown(keyR)){
            this.bgm.stop();
            this.scene.restart();
        }

        // game over settings
        let overConfigconfig = {
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
        if( this.score == 2 ){
            this.gameOver = true;
            this.add.text(game.config.width*2/3, game.config.height*3/4, 'You have got all three candies!', overConfigconfig).setOrigin(0.5);
            this.add.text(game.config.width*2/3, game.config.height*3/4+50, 'Press [M] for Menu', overConfigconfig).setOrigin(0.5);
        }
        if( this.youDie ){
            this.gameOver = true;
            this.input.keyboard.removeKey('LEFT');
            this.input.keyboard.removeKey('RIGHT');
            this.add.text(game.config.width*2/3, game.config.height*3/4, 'You Died!', overConfigconfig).setOrigin(0.5);
            this.add.text(game.config.width*2/3, game.config.height*3/4+50, 'Press [R] to replay or [M] for Menu', overConfigconfig).setOrigin(0.5);
        }

        // move methods 
        if(this.anglenum == 0){ // down border
            if( keyLEFT.isDown ){
                this.girl.body.setVelocityX(-200);
                this.girl.setFlipX(true);
            }else if ( keyRIGHT.isDown ){
                this.girl.body.setVelocityX(200);
                this.girl.setFlipX(false);
            }else {
                this.girl.body.setDragX(this.DRAG);
            }
        }else if(this.anglenum == 180){ // up border
            if( keyLEFT.isDown ){
                this.girl.body.setVelocityX(-200);
                this.girl.setFlipX(false);
            }else if ( keyRIGHT.isDown ){
                this.girl.body.setVelocityX(200);
                this.girl.setFlipX(true);
            }else {
                this.girl.body.setDragX(this.DRAG);
            }
        }else if(this.anglenum == 90){ // left border
            if( keyUP.isDown ){
                this.girl.body.setVelocityY(-200);
                this.girl.setFlipX(true);
            }else if ( keyDOWN.isDown ){
                this.girl.body.setVelocityY(200);
                this.girl.setFlipX(false);
            }else {
                this.girl.body.setDragY(this.DRAG);
            }
        }else if(this.anglenum == 270){ // right border
            if( keyUP.isDown ){
                this.girl.body.setVelocityY(-200);
                this.girl.setFlipX(false);
            }else if ( keyDOWN.isDown ){
                this.girl.body.setVelocityY(200);
                this.girl.setFlipX(true);
            }else {
                this.girl.body.setDragY(this.DRAG);
            }
        }
        
        // gravity-change method
        if( Phaser.Input.Keyboard.JustDown(keyS) ){
            //this.arrowUp.destroy();
            this.changeGravity();
            this.sound.play('jse');
            this.sound.volume = 0.4;
        }else{
            this.walk();
        }

        /*if( this.ci_up1.body.touching.down || this.ci_up2.body.touching.down || this.ci_up3.body.touching.down || this.ci_down1.body.touching.up || this.ci_down2.body.touching.up || this.ci_down3.body.touching.up)
            this.youDie = true;*/

        // candy collect method
        if(this.physics.world.overlap(this.girl, this.candy1)){
            this.candycollect(this.candy1);
        }

        // transfer while collide with flowers
        if(this.physics.world.overlap(this.girl, this.flower1)){
            this.transfer(this.flower1,this.flower2);
        }

        // wrap physics object(s) .wrap(gameObject, padding)
    }

    changeGravity() {
        this.anglenum += 180;
        this.girl.angle = this.anglenum;
        if(this.anglenum >= 360){
            this.anglenum -= 360;
        }
        if(this.anglenum == 0){
            this.girl.setGravityX(0);
            this.girl.setGravityY(this.gravityYnum);
        }else if(this.anglenum == 180){
            this.girl.setGravityX(0);
            this.girl.setGravityY(-this.gravityYnum);
        }else if(this.anglenum == 90){
            this.girl.setGravityY(0);
            this.girl.setGravityX(-this.gravityXnum);
        }else if(this.anglenum == 270){
            this.girl.setGravityY(0);
            this.girl.setGravityX(this.gravityXnum);
        }
    }

    candycollect(candy){
        candy.destroy();
        this.score += 1;
        this.scoreS.text = this.score;
    }

    walk(){
        //this.girl.anims.play('walking', true);
    }
}