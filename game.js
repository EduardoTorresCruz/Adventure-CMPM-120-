class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
    }

    onEnter() {

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "return")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Are you really going to turn back?");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, 'Head to the REAL game', {fontStyle: 'italic'})
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('real_intro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Real_Intro extends Phaser.Scene {
    constructor() {
        super('real_intro');
    }
    
    preload(){
        this.load.path = './assets/';
        this.load.image('studio_logo', 'LuciousLightLogo.png');
    }
    
    create() {
        this.graphics = this.add.graphics();

        // adds studio logo at the center of screen
        let studio_logo = this.add.image(1000, 550, 'studio_logo');
        studio_logo.depth = 0;

        // add transition(first creating white rectangle)
        this.graphics.fillStyle(0xFFFFFF, 1); // color, opacity
        let white_rect = this.graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);

        studio_logo.alpha = 0; 
        white_rect.alpha = 0;
        white_rect.depth = 10; // ensures rectangle is on top of everything

        // have the screen fade in for 4 sceonds
        this.tweens.add({
            targets: studio_logo,
            alpha: 1,
            duration: 4000,
            ease: 'Linear',
            repeat: 0,
        });

        // have the screen fade out to white(1 second after all animations)
        this.tweens.add({
        targets: white_rect,
            delay: 7000,
            alpha: 1,
            duration: 1000,
            ease: 'Linear',
            repeat: 0,
        });

        // go to start of game after all that needs to occur in the intro
        this.time.delayedCall(8000, () => {
            this.scene.start('bedroom');
        })
    }
}

class Bedroom extends AdventureScene {
    constructor() {
        super("bedroom", "Your room");
    }

    preload(){
        this.load.path = './assets/';
        this.load.image('studio_logo', 'LuciousLightLogo.png');
    }

    onEnter() {

        let wallet = this.add.image(this.w * 0.3, this.w * 0.3, 'studio_logo')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Worn out black leather, yet reliable"))
            .on('pointerdown', () => {
                this.showMessage("Can't leave without this");
                this.tweens.add({
                    targets: wallet,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Bedroom, Real_Intro, Intro, Demo1, Demo2,],
    title: "Adventure Game",
});

