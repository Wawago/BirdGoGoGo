class StartView extends egret.Sprite {

    public logo:egret.Bitmap;

    public bird:Bird;
    public ground:egret.Bitmap;

    public startButton:eui.Button;
    public rankButton:eui.Button;
    public shareButton:eui.Button;
    public soundButton:eui.Button;

    private logoPosY:number = 120;
    private startButtonWidth:number = 282;
    private startButtonHeight:number = 103
    private soundButtonWidth:number = 79;
    private rankButtonWidth:number = 192;

    private music:egret.Sound = RES.getRes("music_start_mp3");
    private musicChanel:egret.SoundChannel;

    constructor() {
		super();

		this.initView();
		this.initGUI();
	}

    private initView() {
        this.anchorOffsetX = GameData.stageW/2
		this.anchorOffsetY = GameData.stageH/2
		this.width = GameData.stageW;
		this.height = GameData.stageH;

        // create background
		let bg = Utils.createBitmapByName("background_png");
		bg.width = GameData.stageW;
        bg.height = GameData.stageH;
        this.addChild(bg);

        // enable touch event
		this.touchEnabled = true;
    }

    private initGUI() {
        // logo
        this.logo = Utils.createBitmapByName("logo_png");
        this.logo.anchorOffsetX = this.logo.width*0.5;
        this.logo.x = GameData.stageW/2;
        this.logo.y = this.logoPosY;
        this.addChild(this.logo);
        
        // bird
        this.bird = new Bird();
        this.bird.x = GameData.stageW/2;
        this.bird.y = this.logo.y+this.logo.height+80;
        this.addChild(this.bird);

        // start button
        this.startButton = new eui.Button();
		this.startButton.x = GameData.stageW*0.5 - this.startButtonWidth/2;
		this.startButton.y = GameData.stageH*0.5 - this.startButtonHeight/2 + 20;
		this.startButton.skinName = "skins.StartButtonSkin";
		this.addChild(this.startButton);
		this.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartButton, this);

        // rank button
        this.rankButton = new eui.Button();
		this.rankButton.x = GameData.stageW*0.5 - this.rankButtonWidth - 20;
		this.rankButton.y = this.startButton.y + this.startButtonHeight+35;
		this.rankButton.skinName = "skins.RankButtonSkin";
		this.addChild(this.rankButton);
		this.rankButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankButton, this);

        // share button
        this.shareButton = new eui.Button();
		this.shareButton.x = GameData.stageW*0.5 + 20;
		this.shareButton.y = this.rankButton.y;
		this.shareButton.skinName = "skins.ShareButtonSkin";
		this.addChild(this.shareButton);
		this.shareButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareButton, this);

        // sound button
        this.soundButton = new eui.Button();
		this.soundButton.x = GameData.stageW - 20 - this.soundButtonWidth;
		this.soundButton.y = 20;
		this.soundButton.skinName = "skins.SoundButtonSkin";
		this.addChild(this.soundButton);
		this.soundButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundButton, this);

        // ground
        this.ground = Utils.createBitmapByName("ground_png");
		this.ground.anchorOffsetX = this.ground.width*0.5;
		this.ground.anchorOffsetY = this.ground.height*0.5;
        this.ground.x = GameData.stageW;
        this.ground.y = GameData.stageH - 0.5*this.ground.height;
		this.addChild(this.ground);
        egret.Tween.get(this.ground, {
            loop: true
        }).to({x: 0},5000).call(this.onGroundComplete, this);

        // fonts
        GameData.fontRed = RES.getRes("font_red_fnt");
        GameData.fontGrey = RES.getRes("font_grey_fnt");

        // music
        this.musicChanel = SoundUtils.playMusic(this.music);
        this.updateSoundButton();
    }

    private onGroundComplete() {
        this.ground.x = GameData.stageW;
    }

    private onStartButton() {
        this.dispatchEventWith(GameData.gameStartEvent);
    }

    private onRankButton() {

    }

    private onShareButton() {

    }

    private onSoundButton() {
		GameData.isSoundOn = !GameData.isSoundOn;
		this.updateSoundButton();
	}

    private updateSoundButton() {
        this.soundButton.currentState = GameData.isSoundOn ? "on" : "off";
        if (this.musicChanel) {
            this.musicChanel.volume = GameData.isSoundOn ? 1 : 0;
        }
    }

    public end() {
        this.startButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartButton, this);
        this.rankButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankButton, this);
        this.shareButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareButton, this);
        this.soundButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundButton, this);
        if (this.musicChanel) {
            this.musicChanel.stop();
            this.musicChanel = null;
        }
    }
}