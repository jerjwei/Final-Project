class Level3 extends Phaser.Scene {
    constructor() {
        super("lvl3");
    }

    preload() {
        this.load.image('border_down', './assets/border_down.png');
        this.load.image('real_border_down', './assets/realBorderdown.png');
        this.load.image('border_up', './assets/border_up.png');
        this.load.image('border_left', './assets/border_left.png');
        this.load.image('border_right', './assets/border_right.png');
        this.load.image('candy', './assets/candy.png');
        this.load.image('ci_2', './assets/lvl3_sprites/ci_2.png');
        this.load.image('plat', './assets/lvl1_terrain/ground_short.png');
        this.load.image('gameover', './assets/game over.png');
        this.load.image('gamewin', './assets/gamewin.png');
        this.load.image('die', './assets/die.png');
        this.load.image('pass', './assets/pass.png');
        this.load.spritesheet('girl', './assets/playerWalk.png', {frameWidth: 48, frameHeight: 98, startFrame: 0, endFrame: 0});
        this.load.spritesheet('walk', './assets/playerWalk.png', {frameWidth: 48, frameHeight: 98, startFrame: 0, endFrame: 4});

        // preload.music
        this.load.audio('jse', './assets/jumpsoundeffect.mp3');
        this.load.audio('spiderSound', './assets/spiderG.wav');
        this.load.audio('pass', './assets/pass.wav');
        this.load.audio('death', './assets/death.wav');
    }

    create() {
        // variables and settings
        this.scale.setGameSize(1280,720);
        this.sys.game.config.height = 720;
        this.sys.game.config.width = 1280;
        this.DRAG = 500;
        this.score = 0;
        this.gravityYnum = 1500;
        this.anglenum = 0;
        this.collidecheck = false;
        this.playPassSound = 0;
        this.deathnum = 0;

        // define keyboard keyJ
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    
        // game over flag
        this.gameOver = false;
        this.youDie = false;

        // define our objects
        // girl
        this.girl = this.physics.add.sprite(this.sys.game.config.width/4, this.sys.game.config.height*0.7, 'girl');
        this.girl.setCollideWorldBounds(true);
        this.girl.setGravityY(this.gravityYnum);
        this.girl.setFlipX(true);

        // candy
        this.candy1 = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.4, 'candy');
        this.candy2 = this.physics.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*0.6, 'candy');
        this.candy1.setImmovable();
        this.candy2.setImmovable();

        // ci
        this.ci_up1 = this.physics.add.sprite(this.sys.game.config.width*0.08, this.sys.game.config.height*0.11, 'ci_2');
        this.ci_up2 = this.physics.add.sprite(this.sys.game.config.width*0.5, this.sys.game.config.height*0.11, 'ci_2');
        this.ci_up3 = this.physics.add.sprite(this.sys.game.config.width*0.92, this.sys.game.config.height*0.11, 'ci_2');
        this.ci_up1.angle += 180;
        this.ci_up2.angle += 180;
        this.ci_up3.angle += 180;
        this.ci_down1 = this.physics.add.sprite(this.sys.game.config.width*0.08, this.sys.game.config.height*0.89, 'ci_2');
        this.ci_down2 = this.physics.add.sprite(this.sys.game.config.width*0.5, this.sys.game.config.height*0.89, 'ci_2');
        this.ci_down3 = this.physics.add.sprite(this.sys.game.config.width*0.92, this.sys.game.config.height*0.89, 'ci_2');
        this.ci_up1.setImmovable();
        this.ci_up2.setImmovable();
        this.ci_up3.setImmovable();
        this.ci_down1.setImmovable();
        this.ci_down2.setImmovable();
        this.ci_down3.setImmovable();
        // add the colliders
        this.physics.add.collider(this.girl, this.ci_up1);
        this.physics.add.collider(this.girl, this.ci_up2);
        this.physics.add.collider(this.girl, this.ci_up3);
        this.physics.add.collider(this.girl, this.ci_down1);
        this.physics.add.collider(this.girl, this.ci_down2);
        this.physics.add.collider(this.girl, this.ci_down3);

        // platforms
        // up plats
        this.plat1 = this.physics.add.sprite(this.sys.game.config.width*0.28, this.sys.game.config.height*0.13, 'plat');
        this.plat2 = this.physics.add.sprite(this.sys.game.config.width*0.72, this.sys.game.config.height*0.13, 'plat');
        this.plat1.angle += 180;
        this.plat2.angle += 180;
        // mid plats
        this.plat3 = this.physics.add.sprite(this.sys.game.config.width*0.15, this.sys.game.config.height*0.5, 'plat');
        this.plat4 = this.physics.add.sprite(this.sys.game.config.width*0.5, this.sys.game.config.height*0.5, 'plat');
        this.plat5 = this.physics.add.sprite(this.sys.game.config.width*0.85, this.sys.game.config.height*0.5, 'plat');
        // down plats
        this.plat6 = this.physics.add.sprite(this.sys.game.config.width*0.28, this.sys.game.config.height*0.87, 'plat');
        this.plat7 = this.physics.add.sprite(this.sys.game.config.width*0.72, this.sys.game.config.height*0.87, 'plat');
        // longer plat
        this.plat1.displayWidth *= 1.24;
        this.plat2.displayWidth *= 1.24;
        this.plat3.displayWidth *= 1;
        this.plat4.displayWidth *= 1;
        this.plat5.displayWidth *= 1;
        this.plat6.displayWidth *= 1.24;
        this.plat7.displayWidth *= 1.24;
        // setImmovable
        this.plat1.setImmovable();
        this.plat2.setImmovable();
        this.plat3.setImmovable();
        this.plat4.setImmovable();
        this.plat5.setImmovable();
        this.plat6.setImmovable();
        this.plat7.setImmovable();
        // add the colliders
        this.physics.add.collider(this.girl, this.plat1);
        this.physics.add.collider(this.girl, this.plat2);
        this.physics.add.collider(this.girl, this.plat3);
        this.physics.add.collider(this.girl, this.plat4);
        this.physics.add.collider(this.girl, this.plat5);
        this.physics.add.collider(this.girl, this.plat6);
        this.physics.add.collider(this.girl, this.plat7);

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
        this.physics.add.collider(this.girl, this.realBup);
        this.physics.add.collider(this.girl, this.realB);
        this.physics.add.collider(this.girl, this.borderleft);
        this.physics.add.collider(this.girl, this.borderright);

        // game over image
        this.gameoverImage = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'die');
        this.gameoverImage.alpha = 0;
        // gamewin image
        this.gamewinImage = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'gamewin');
        this.gamewinImage.alpha = 0;

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

        // animations
        // walk animation
        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers('walk', { start: 0, end: 4, first: 4}),
            frameRate: 5,
            repeat: -1
        });
    }

    update() {
        // switch once until the girl collide with something
        this.checkswitch();

        // check angle within 360 degrees
        if(this.anglenum >= 360) this.anglenum -= 360;

        // walking animation
        if( !(keyA.isDown || keyD.isDown || keyW.isDown || keyS.isDown) ) this.girl.anims.play('walking');

        // check key input for restart
        if( this.youDie && this.deathnum == 0) {
            this.deathnum += 1;
            this.sound.play('death');
            this.sound.volume = 0.1;
        }
        if( this.youDie ){
            this.physics.pause();
            this.input.keyboard.removeKey('J');
            this.input.keyboard.removeKey('W');
            this.input.keyboard.removeKey('A');
            this.input.keyboard.removeKey('S');
            this.input.keyboard.removeKey('D');
            this.gameoverImage.alpha += .01;
        }
        if (this.youDie && Phaser.Input.Keyboard.JustDown(keyR)){
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.restart();
            });
        }else if(this.youDie && Phaser.Input.Keyboard.JustDown(keyM)){
            game.sound.stopAll();
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("menuScene");
            });
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyN)) {
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("lvl4");
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
        if( this.score == 2 ){
            this.gameOver = true;
            this.playPassSound += 1;
            this.physics.pause();
            this.input.keyboard.removeKey('S');
            this.input.keyboard.removeKey('UP');
            this.input.keyboard.removeKey('DOWN');
            this.input.keyboard.removeKey('LEFT');
            this.input.keyboard.removeKey('RIGHT');
            this.gamewinImage.alpha += .01;
            if(this.gamewinImage.alpha == 1){
                this.add.image(game.config.width/2, game.config.height/2, 'pass');
            }
        }
        // game sound play
        if( this.playPassSound == 1 ){
            this.sound.play('pass');
            this.sound.volume = 0.2;
        }

        // move methods 
        if(this.anglenum == 0){ // down border
            if( keyA.isDown ){
                this.girl.body.setVelocityX(-200);
                this.girl.setFlipX(true);
            }else if ( keyD.isDown ){
                this.girl.body.setVelocityX(200);
                this.girl.setFlipX(false);
            }else {
                this.girl.body.setDragX(this.DRAG);
            }
        }else if(this.anglenum == 180){ // up border
            if( keyA.isDown ){
                this.girl.body.setVelocityX(-200);
                this.girl.setFlipX(false);
            }else if ( keyD.isDown ){
                this.girl.body.setVelocityX(200);
                this.girl.setFlipX(true);
            }else {
                this.girl.body.setDragX(this.DRAG);
            }
        }else if(this.anglenum == 90){ // left border
            if( keyW.isDown ){
                this.girl.body.setVelocityY(-200);
                this.girl.setFlipX(true);
            }else if ( keyS.isDown ){
                this.girl.body.setVelocityY(200);
                this.girl.setFlipX(false);
            }else {
                this.girl.body.setDragY(this.DRAG);
            }
        }else if(this.anglenum == 270){ // right border
            if( keyW.isDown ){
                this.girl.body.setVelocityY(-200);
                this.girl.setFlipX(false);
            }else if ( keyS.isDown ){
                this.girl.body.setVelocityY(200);
                this.girl.setFlipX(true);
            }else {
                this.girl.body.setDragY(this.DRAG);
            }
        }
        
        // gravity-change method
        if( !this.collidecheck && Phaser.Input.Keyboard.JustDown(keyJ) ){
            this.collidecheck = true;
            this.changeGravity();
            this.sound.play('jse');
            this.sound.volume = 0.4;
        }

        if( this.ci_up1.body.touching.down || this.ci_up2.body.touching.down || this.ci_up3.body.touching.down || this.ci_down1.body.touching.up || this.ci_down2.body.touching.up || this.ci_down3.body.touching.up)
            this.youDie = true;

        // candy collect method
        if(this.physics.world.overlap(this.girl, this.candy1)){
            this.candycollect(this.candy1);
        }else if(this.physics.world.overlap(this.girl, this.candy2)){
            this.candycollect(this.candy2);
        }

        // reverse while collide with spiders
        if(this.physics.world.overlap(this.girl, this.spider1)){
            this.sound.play('spiderSound');
            this.sound.volume = 0.4;
            this.reverse(this.spider1);
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
}