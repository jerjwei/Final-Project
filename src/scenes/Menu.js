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
        menuConfig.fontSize = '30px';
        this.add.text(centerX, centerY-textSpacer, 'Use [↑]or[↓] to jump, use [←]or[→] to move.', menuConfig).setOrigin(0.5);
        menuConfig.color = '#69FCF3';
        this.add.text(centerX, centerY, 'Touch spider to reverse / Touch flower to transfer', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY+textSpacer, 'Collect all the candies!', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFFFFF';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY+2*textSpacer, 'Press [←] for to start', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.volume = 0.4;
            //this.sound.play('start');
            this.scene.start("lvl1");    
            this.bgm.stop();
        }
    }   
}