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

// added code by Eduardo Torres Cruz

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

        // delay this event by 4 seconds
        this.time.addEvent({
            delay: 4000,
            callback: ()=>{
                // create star 
                let star = this.add.star(775, 400, 5, 10, 20, 0xFFFFFF);
            
                // have the star pop in
                this.tweens.add({
                targets: star,
                scaleX: 3,
                scaleY: 3,
                angle: 300,
                duration: 2000,
                ease: 'Bounce',
                repeat: 0,
                });
            },
            loop: false,
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
        super("bedroom", "Your room(4:30 a.m)");
    }

    preload(){
        this.load.path = './assets/';
        this.load.image('studio_logo', 'LuciousLightLogo.png');
        this.load.image('bedroom_img', 'bedroom.png')
    }

    onEnter() {
        this.graphics = this.add.graphics();
        
        // Creates background of gameplay scene/interactive area
        let bg = this.add.image(0, 0, 'bedroom_img').setOrigin(0, 0);
        bg.setScale(0.36);

        let wallet = this.add.text(457, 527, 'hhhhhh', {color: ('#000000')})
            .setInteractive({useHandCursor: true})
            
            // Very important as text is naturally works with pointer vs rectangle(fillRect) therefore sneakily make text a rect by having same color background + text
            .setBackgroundColor('#000000') 
            
            .on('pointerover', () => this.showMessage("Worn out black leather, yet reliable"))
            .on('pointerdown', () => {
                this.showMessage("Oh, I'll take my Student ID");
                this.gainItem('wallet');
                this.tweens.add({
                    targets: wallet,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => wallet.destroy()
                });
            });
        wallet.depth = 10;
        this.highlightOnHover(wallet);

        let computer = this.add.text(1100, 1000, 'hhhhhh', {color: ('#3E3E3E')})
            .setInteractive({useHandCursor: true})
            
            // Very important as text is naturally works with pointer vs rectangle(fillRect) therefore sneakily make text a rect by having same color background + text
            .setBackgroundColor('#3E3E3E') 
            
            .on('pointerover', () => this.showMessage("A smooth Macbook with some stickers on the back"))
            .on('pointerdown', () => {
                this.showMessage("Maybe this will come in handy");
                this.gainItem('computer');
                this.tweens.add({
                    targets: computer,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => computer.destroy()
                });
            });
        computer.depth = 10;
        this.highlightOnHover(computer);

        let apron = this.add.text(457, 400, 'hhhhhh', {color: ('#26A50F')})
            .setInteractive({useHandCursor: true})
            
            // Very important as text is naturally works with pointer vs rectangle(fillRect) therefore sneakily make text a rect by having same color background + text
            .setBackgroundColor('#26A50F') 
            
            .on('pointerover', () => this.showMessage("A clean apron with the iconic Starbucks siren"))
            .on('pointerdown', () => {
                this.showMessage("Can't leave without this");
                this.gainItem('apron');
                this.tweens.add({
                    targets: apron,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => apron.destroy()
                });
                next_text.alpha = 1;
            });
        apron.depth = 10;
        this.highlightOnHover(apron);

        let next_text = this.add.text(this.w / 3, this.h / 2, 'Leave for work', {color: ('#FFFFFF')})
            .setInteractive({useHandCursor: true})
            .setFontSize(25)
            .setBackgroundColor('0x000000')
            .on('pointerover', () => 
                this.showMessage("Ready?"))
            .on('pointerdown', () =>
                this.gotoScene('starbucks'));
        next_text.alpha = 0;
    }
}

class Work extends AdventureScene {
    constructor() {
        super("starbucks", "Your work(5:30 a.m)");
    }

    preload(){
        this.load.path = './assets/';
        this.load.image('work_img', 'starbucks.png')
    }

    onEnter() {
        this.graphics = this.add.graphics();
        
        // Creates background of gameplay scene/interactive area
        let bg = this.add.image(0, 0, 'work_img').setOrigin(0, 0);
        bg.setScale(0.53);

        let work_text = this.add.text(this.w / 3, this.h / 2, 'Get to work', {color: ('#FFFFFF')})
            .setInteractive({useHandCursor: true})
            .setFontSize(25)
            .setBackgroundColor('0x000000')
            .on('pointerdown', () => {
                work_text.alpha = 0;
            });
        this.highlightOnHover(work_text);

        let ice = this.add.text(300, 400, 'hhhh', {color: ('#2EF8EA')});
        ice.setBackgroundColor('#2EF8EA');

        /*
        let mocha = 
        let matcha = 
        let white_mocha = 
        let cup = this.add.text(300, 400, 'hhhh', {color: ('#2EF8EA')})
        */

        let cup = this.add.text(600, 400, 'hhhhh', {color: ('#FFFFFF')});

        this.dragInteractive(ice, cup);

        let next_text = this.add.text(this.w / 3, this.h / 2, 'Head to campus', {color: ('#FFFFFF')})
        .setInteractive({useHandCursor: true})
        .setFontSize(25)
        .setBackgroundColor('0x000000')
        .on('pointerdown', () => {
            
        });
    this.highlightOnHover(work_text);
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Work, Real_Intro, Intro, Demo1, Demo2,],
    title: "Adventure Game",
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
});

