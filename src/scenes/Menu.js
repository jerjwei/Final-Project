class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('menuscenebackground', './assets/background2.wav');
        this.load.audio('start', './assets/jiao.wav');
    }

    create() {
        // menu scene background music
        this.bgm = this.sound.add('menuscenebackground', {config});
        this.bgm.play();
        this.bgm.loop = true;
        this.bgm.volume = 0.4;

        // menu display
        let menuConfig = {
            fontFamily: 'Bradley Hand',
            fontSize: '40px',
            color: '#90C1F6',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // display menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY-2*textSpacer, 'Secret Garden', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '25px';
        this.add.text(centerX, centerY-textSpacer, 'Use [←]or[→]or[↑]or[↓] to move. Press [S] to reverse gravity.', menuConfig).setOrigin(0.5);
        menuConfig.color = '#69FCF3';
        menuConfig.fontSize = '30px';
        this.add.text(centerX, centerY, 'Touch spider to rotate 90 degrees. / Touch flower to transfer.', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY+textSpacer, 'Collect all the candies!', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFFFFF';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY+2*textSpacer, 'Click to start', menuConfig).setOrigin(0.5);

        // define keys
        pointer = this.input.activePointer;
    }

    update() {
        if (pointer.isDown) {
            this.sound.volume = 0.4;
            //this.sound.play('start');
            this.scene.start("lvl1");    
            this.bgm.stop();
        }
    }   
}