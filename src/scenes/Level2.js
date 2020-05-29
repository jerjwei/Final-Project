class Level2 extends Phaser.Scene {
    constructor() {
        super("lvl2");
    }

    preload() {
        this.load.image('border_down', './assets/border_down.png');
        this.load.image('real_border_down', './assets/realBorderdown.png');
        this.load.image('border_up', './assets/border_up.png');
        this.load.image('border_left', './assets/border_left.png');
        this.load.image('border_right', './assets/border_right.png');
        this.load.image('xian', './assets/lvl2_sprites/xian.png');
        this.load.image('spider', './assets/spider.png');
        this.load.image('candy', './assets/candy.png');
        this.load.image('door', './assets/lvl2_sprites/door.png');
        this.load.image('taizi', './assets/lvl2_sprites/taizi.png');
        this.load.image('doorOpen', './assets/door_opened.png');
        this.load.spritesheet('girl', './assets/player.png', {frameWidth: 73, frameHeight: 155, startFrame: 0, endFrame: 9});

        // preload.music
        this.load.audio('jse', './assets/jumpsoundeffect.mp3');
        this.load.audio('bgm', './assets/bgm.mp3');
    }

    create() {
        // variables and settings
        this.cameras.main.backgroundColor.setTo(0,0,0);
        this.DRAG = 500;
        this.jumpTime = 0;
        this.score = 0;
        this.gravityYnum = 2000;
        this.gravityXnum = 2000;
        this.anglenum = 0;
        this.collidecheck = false;

        // define keyboard keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // taizi
        this.taizi = this.physics.add.sprite(this.sys.game.config.width*0.94, this.sys.game.config.height*0.5, 'taizi');
        this.taizi.setImmovable();

        // door
        this.door = this.physics.add.sprite(this.sys.game.config.width*0.917, this.sys.game.config.height*0.5, 'door');
        this.door.setImmovable();
        this.door.angle += 270;
        this.door.scale = 0.7;
        this.doorOpen = this.physics.add.sprite(this.sys.game.config.width*0.915, this.sys.game.config.height*0.505, 'doorOpen');
        this.doorOpen.setVisible(false);
        this.doorOpen.setImmovable();
        this.doorOpen.angle += 270;
        this.doorOpen.scale = 0.7;

        // girl
        this.girl = this.physics.add.sprite(this.sys.game.config.width/4, this.sys.game.config.height*0.7, 'girl');
        this.girl.setCollideWorldBounds(true);
        this.girl.setGravityY(this.gravityYnum);
        this.girl.setFlipX(true);

        // xian
        this.xian = this.physics.add.sprite(this.sys.game.config.width/3, this.sys.game.config.height*0.2, 'xian');
        this.xian.setImmovable();

        // spider
        this.spider = this.physics.add.sprite(this.sys.game.config.width/3, this.sys.game.config.height*0.4, 'spider');
        this.spider.setImmovable();

        // place the borders
        // down border
        this.realB = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.95, 'real_border_down');
        this.borderdown = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height-36, 'border_down');
        this.borderdown.displayWidth = this.sys.game.config.width * 1.1;
        this.borderdown.displayHeight = this.borderdown.height * 1.5;
        this.realB.setImmovable(); 
        
        // right border
        this.borderright = this.physics.add.sprite(this.sys.game.config.width-32, this.sys.game.config.height/2, 'border_right');
        this.borderright.displayHeight = this.sys.game.config.height * 1.1;
        this.borderright.setImmovable();

        // up border
        this.realBup = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.05, 'real_border_down');
        this.borderup = this.physics.add.sprite(this.sys.game.config.width/2, 36, 'border_up');
        this.borderup.displayWidth = this.sys.game.config.width * 1.1;
        this.borderup.displayHeight = this.borderup.height * 1.5;
        this.realBup.setImmovable();

        // left border
        this.borderleft = this.physics.add.sprite(32, this.sys.game.config.height/2, 'border_left');
        this.borderleft.displayHeight = this.sys.game.config.height * 1.1;
        this.borderleft.setImmovable();

        // add the colliders
        this.physics.add.collider(this.girl, this.level1_upperGround);
        this.physics.add.collider(this.girl, this.level1_bottomGround);
        this.physics.add.collider(this.girl, this.realBup);
        this.physics.add.collider(this.girl, this.realB);
        this.physics.add.collider(this.girl, this.borderleft);
        this.physics.add.collider(this.girl, this.borderright);

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
            fixedWidth: 100
        }
        this.scoreS = this.add.text(70, 25, this.score, scoreConfig);
        scoreConfig.fontSize = '20px';
        scoreConfig.fixedWidth = 300;
        this.restart = this.add.text(120, 40, '[R] to restart lvl2', scoreConfig);
    }

    update() {
        // switch once until the girl collide with something
        this.checkswitch();

        // check angle within 360 degrees
        if(this.anglenum >= 360) this.anglenum -= 360;

        // check key input for restart
        if (Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyN)) {
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("lvl3");
            });
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            game.sound.stopAll();
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("menuScene");
            });
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
            this.door.setVisible(false);
            this.doorOpen.setVisible(true);
            this.physics.pause();
            this.input.keyboard.removeKey('UP');
            this.input.keyboard.removeKey('DOWN');
            this.add.text(game.config.width/2, game.config.height/2, 'You have passed level2!', overConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2+50, 'Press [N] to Level3 or [M] for Menu', overConfig).setOrigin(0.5);
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
        if( !this.collidecheck && Phaser.Input.Keyboard.JustDown(keyS) ){
            this.collidecheck = true;
            this.changeGravity();
            this.sound.play('jse');
            this.sound.volume = 0.4;
        }else{
            this.walk();
        }
        
        
        // walk animation -- we don't have it now
        /*if( this.girl.flipY ){
            if( this.girl.body.touching.up ){
                this.walk();
            }
        } else{
            if( this.girl.body.touching.down ){
                this.walk();
            }
        }*/

        // score method
        if( this.anglenum == 270 && this.physics.world.overlap(this.girl, this.taizi) ){
        //if(this.anglenum == 270 && this.girl.height == this.sys.game.config.height*0.5 && this.girl.body.touching.right){
            this.score++;
        }

        // spider method -- touch spider to rotate 90 degrees clock-wise
        if(this.physics.world.overlap(this.girl, this.spider)){
            this.rotate(this.spider);
        }

        // candy collect method
        if(this.physics.world.overlap(this.girl, this.candy1)){
            this.candycollect(this.candy1);
        }

        // transfer while collide with flowers
        /*if(this.physics.world.overlap(this.girl, this.flower1)){
            this.transfer(this.flower1,this.flower3, this.sys.game.config.width*0.35, this.sys.game.config.height*0.77);
        }else if(this.physics.world.overlap(this.girl, this.flower4)){
            this.transfer(this.flower4,this.flower2, this.sys.game.config.width*0.65, this.sys.game.config.height*0.23);
        }*/
    }

    walk(){
        //this.girl.anims.play('walking', true);
    }

    rotate(spider){
        this.xian.destroy();
        spider.destroy();
        this.anglenum += 90;
        if(this.anglenum >= 360){
            this.anglenum -= 360;
        }
        this.girl.angle = this.anglenum;
        if(this.anglenum == 0){
            this.girl.setGravityX(0);
            this.girl.setGravityY(this.gravityYnum);
        }else if(this.anglenum == 90){
            this.girl.body.setSize(73,50);
            this.girl.setGravityY(0);
            this.girl.setGravityX(-this.gravityXnum);
        }else if(this.anglenum == 180){
            this.girl.setGravityX(0);
            this.girl.setGravityY(-this.gravityYnum);
        }else if(this.anglenum == 270){
            this.girl.body.setSize(73,50);
            this.girl.setGravityY(0);
            this.girl.setGravityX(this.gravityXnum);
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

    checkswitch(){
        if(this.anglenum == 0 && this.girl.body.touching.down){
            this.collidecheck = false;
        }else if(this.anglenum == 180 && this.girl.body.touching.up){
            this.collidecheck = false;
        }else if(this.anglenum == 90 && this.girl.body.touching.left){
            this.collidecheck = false;
        }else if(this.anglenum == 270 && this.girl.body.touching.right){
            this.collidecheck = false;
        }
    }

    /*transfer(flower1,flower2, x, y){
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
    }*/
}