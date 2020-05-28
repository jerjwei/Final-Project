class Level6 extends Phaser.Scene {
    constructor() {
        super("lvl6");
    }

    preload() {
        this.load.image('border_down', './assets/border_down.png');
        this.load.image('real_border_down', './assets/realBorderdown.png');
        this.load.image('border_up', './assets/border_up.png');
        this.load.image('border_left', './assets/border_left.png');
        this.load.image('border_right', './assets/border_right.png');
        this.load.image('xian', './assets/lvl2_sprites/xian.png');
        this.load.image('spider', './assets/spider.png');
        this.load.image('ci_2', './assets/lvl4_sprites/ci_2.png');
        this.load.image('ci_3', './assets/lvl4_sprites/ci_3.png');
        this.load.image('sPlain', './assets/lvl4_sprites/level4_middle.png');
        this.load.image('lPlain', './assets/lvl4_sprites/level4_upper.png');
        this.load.image('sGrass', './assets/lvl4_sprites/level4_middleUpper.png');
        this.load.image('lGrass', './assets/lvl4_sprites/level4_bottomGround.png');
        this.load.image('taizi', './assets/lvl2_sprites/taizi2.png');
        this.load.image('door', './assets/lvl2_sprites/door.png');
        this.load.spritesheet('girl', './assets/player.png', {frameWidth: 73, frameHeight: 155, startFrame: 0, endFrame: 9});

        // preload.music
        this.load.audio('playscenebackground', './assets/bgm.mp3');
        this.load.audio('jse', './assets/jumpsoundeffect.mp3');
    }

    create() {
        // variables and settings
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

        // door
        this.door = this.physics.add.sprite(this.sys.game.config.width*0.5, this.sys.game.config.height*0.84, 'door');
        this.door.setImmovable()

        // define our objects
        // girl
        this.girl = this.physics.add.sprite(this.sys.game.config.width/4, this.sys.game.config.height*0.7, 'girl');
        this.girl.setCollideWorldBounds(true);
        this.girl.setGravityY(this.gravityYnum);
        this.girl.setFlipX(true);

        // taizi
        this.taizi = this.physics.add.sprite(this.sys.game.config.width*0.5, this.sys.game.config.height*0.94, 'taizi');
        this.taizi.setImmovable();
        this.physics.add.collider(this.girl, this.taizi);

        // xian
        this.xian_1 = this.physics.add.sprite(this.sys.game.config.width*0.25, this.sys.game.config.height*0.07, 'xian');
        this.xian_1.setImmovable();
        this.xian_2 = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.2, 'xian');
        this.xian_2.setImmovable();
        this.xian_3 = this.physics.add.sprite(this.sys.game.config.width*0.75, this.sys.game.config.height*0.07, 'xian');
        this.xian_3.setImmovable();
        
        // spider
        this.spider_1 = this.physics.add.sprite(this.sys.game.config.width*0.25, this.sys.game.config.height*0.24, 'spider');
        this.spider_1.setImmovable();
        this.spider_1.angle+=180;
        this.spider_2 = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.38, 'spider');
        this.spider_2.setImmovable();
        this.spider_2.angle+=180;
        this.spider_3 = this.physics.add.sprite(this.sys.game.config.width*0.75, this.sys.game.config.height*0.24, 'spider');
        this.spider_3.setImmovable();
        this.spider_3.angle+=180;

        // ci
        this.ci_up1 = this.physics.add.sprite(this.sys.game.config.width*0.455, this.sys.game.config.height*0.1, 'ci_2');
        this.ci_up2 = this.physics.add.sprite(this.sys.game.config.width*0.545, this.sys.game.config.height*0.1, 'ci_2');
        this.ci_up1.angle += 180;
        this.ci_up2.angle += 180;
        this.ci_up1.setImmovable();
        this.ci_up2.setImmovable();
        // add the colliders
        this.physics.add.collider(this.girl, this.ci_up1);
        this.physics.add.collider(this.girl, this.ci_up2);


        // platforms
        // up terrains
        this.upPlain_1 = this.physics.add.sprite(this.sys.game.config.width*0.18, this.sys.game.config.height*0.05, 'sPlain');
        this.upPlain_2 = this.physics.add.sprite(this.sys.game.config.width*0.82, this.sys.game.config.height*0.05, 'sPlain');
        this.terrain1 = this.physics.add.sprite(this.sys.game.config.width*0.08, this.sys.game.config.height*0.15, 'sGrass');
        this.terrain1.displayHeight = this.terrain1.height*1.8;
        this.terrain2 = this.physics.add.sprite(this.sys.game.config.width*0.93, this.sys.game.config.height*0.15, 'sGrass');
        this.terrain2.displayHeight = this.terrain2.height*1.8;
        this.terrain1.angle += 180;
        this.terrain2.angle += 180;
        
        // down terrains
        this.terrain5 = this.physics.add.sprite(this.sys.game.config.width*0-50, this.sys.game.config.height*0.75, 'lGrass');
        this.terrain6 = this.physics.add.sprite(this.sys.game.config.width*1+50, this.sys.game.config.height*0.75, 'lGrass');
        this.terrain6.setFlipX(true);
        this.plat7 = this.physics.add.sprite(this.sys.game.config.width*0.72, this.sys.game.config.height*0.87, 'plat');
        // longer plat
        this.terrain1.displayWidth *= 1.24;
        this.terrain2.displayWidth *= 1.24;
        this.upPlain_1.displayWidth *= 1;
        this.upPlain_2.displayWidth *= 1;
        this.terrain5.displayWidth *= 1;
        this.terrain6.displayWidth *= 1;
        this.plat7.displayWidth *= 1.24;
        // setImmovable
        this.terrain1.setImmovable();
        this.terrain2.setImmovable();
        this.upPlain_1.setImmovable();
        this.upPlain_2.setImmovable();
        this.terrain5.setImmovable();
        this.terrain6.setImmovable();
        this.plat7.setImmovable();
        // add the colliders
        this.physics.add.collider(this.girl, this.terrain1);
        this.physics.add.collider(this.girl, this.terrain2);
        this.physics.add.collider(this.girl, this.upPlain_1);
        this.physics.add.collider(this.girl, this.upPlain_2);
        this.physics.add.collider(this.girl, this.terrain5);
        this.physics.add.collider(this.girl, this.terrain6);
        this.physics.add.collider(this.girl, this.plat7);

        // place the borders
        // down border
        this.realB = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.95, 'real_border_down');
        this.borderdown = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height-36, 'border_down');
        this.borderdown.displayWidth = this.sys.game.config.width * 1.1;
        this.borderdown.displayHeight = this.borderdown.height * 1.5;
        this.realB.setImmovable(); 
        
        //right border
        this.borderright = this.physics.add.sprite(this.sys.game.config.width-32, this.sys.game.config.height/2, 'border_right');
        this.borderright.displayHeight = this.sys.game.config.height * 1.1;
        this.borderright.setImmovable();

        // up border
        this.borderup = this.physics.add.sprite(this.sys.game.config.width/2, 32, 'border_up');
        this.borderup.displayWidth = this.sys.game.config.width * 1.1;
        this.borderup.setImmovable();

        //left border
        this.borderleft = this.physics.add.sprite(32, this.sys.game.config.height/2, 'border_left');
        this.borderleft.displayHeight = this.sys.game.config.height * 1.1;
        this.borderleft.setImmovable();

        // add the colliders
        this.physics.add.collider(this.girl, this.borderup);
        this.physics.add.collider(this.girl, this.realB);
        this.physics.add.collider(this.girl, this.borderleft);
        this.physics.add.collider(this.girl, this.borderright);

        // animations
        // walk animation
        /*this.anims.create({
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
        });*/

        // score display
        this.playerScore = 0;
        let scoreConfig = {
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

        // win or lose condition
        if( this.score == 2 ){
            this.gameOver = true;
            this.add.text(game.config.width*2/3, game.config.height*3/4, 'You have got all three candies!', overConfig).setOrigin(0.5);
            this.add.text(game.config.width*2/3, game.config.height*3/4+50, 'Press [M] for Menu', overConfig).setOrigin(0.5);
        }
        if( this.youDie ){
            this.gameOver = true;
            this.input.keyboard.removeKey('LEFT');
            this.input.keyboard.removeKey('RIGHT');
            this.add.text(game.config.width*2/3, game.config.height*3/4, 'You Died!', overConfig).setOrigin(0.5);
            this.add.text(game.config.width*2/3, game.config.height*3/4+50, 'Press [R] to replay or [M] for Menu', overConfig).setOrigin(0.5);
        }
        if( this.taizi.body.touching.up ){
            this.score++;
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

        if( this.ci_up1.body.touching.down || this.ci_up2.body.touching.down )
            this.youDie = true;

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

        // spider method -- touch spider to rotate 90 degrees clock-wise
        if(this.physics.world.overlap(this.girl, this.spider)){
            this.rotate(this.spider);
        }

        // flower method -- touch flower to transfer
        if(this.physics.world.overlap(this.girl, this.flower1)){
            this.transfer(this.flower_1, this.flower_2, 0, 50);
        }
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

    transfer(flower1,flower2, x, y){
        flower1.destroy();
        flower2.destroy();
        this.girl.setPosition(x, y);
        if(x == this.sys.game.config.width*0.35){
            this.girl.setFlipY(false);
        }else{
            this.girl.setFlipY(true);
        }
        this.gravityYnum = 0 - this.gravityYnum;
        this.girl.setGravityY(this.gravityYnum);      
    }
}