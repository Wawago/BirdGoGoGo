class GameView extends egret.Sprite {
	// p2 world
	public world:p2.World;

	// bird
	public bird:Bird;
	public birdBody:p2.Body;
	private birdBodyRadius:number = 38;

	// ground and pipes
	public groundBody:p2.Body;
	public pipeGroup1:PipeGroup;
	public pipeGroup2:PipeGroup;
	public pipeGroup3:PipeGroup;

	// speeds
	public static speedX:number = -3;
	private gravity:number = 20;
	private birdJumpVelocity:number = -10.5;
	private birdJumpAngle:number = 0.8;
	private birdJumpAngularVelocity:number = -5;

	// game state
	public isPrepared:boolean = false;
	public isStart:boolean = false;

	// gui
	public scoreLabel:egret.BitmapText;
	public soundButton:eui.Button;
	public guide:egret.Bitmap;
	public gameOverPanel:GameOverPanel;

	// music
	private music:egret.Sound = RES.getRes("music_game_mp3");
    private musicChanel:egret.SoundChannel;

	constructor() {
		super();

		this.initView();
		this.initSprites();
		this.initContactMaterials();
		this.initEvents();
		this.initGUI();
	}

	private initView():void {
		this.anchorOffsetX = GameData.stageW/2
		this.anchorOffsetY = GameData.stageH/2
		this.width = GameData.stageW;
		this.height = GameData.stageH;
		
		// create background
		let bg = Utils.createBitmapByName("background_png");
		bg.width = GameData.stageW;
        bg.height = GameData.stageH;
        this.addChild(bg);

		// create world
        this.world = new p2.World({
            gravity: [0, 0]
        });
        this.world.sleepMode = p2.World.BODY_SLEEPING;
		
		// enable touch event
		this.touchEnabled = true;
	}

	private initSprites():void {
		this.createBird();

		this.createPipeGroups();

		// create groud sprite
		this.groundBody = PipeGroup.createBlock(this.world, this, 
			0, GameData.stageH-PipeGroup.groundHeight,
			0, "ground_png");
	}

	private initContactMaterials() {
		var birdMaterial = new p2.Material(0);
		var groundMaterial = new p2.Material(1);
		this.birdBody.shapes[0].material = birdMaterial;
		this.groundBody.shapes[0].material = groundMaterial;
		this.pipeGroup1.upperPipe.shapes[0].material = groundMaterial;
		this.pipeGroup1.lowerPipe.shapes[0].material = groundMaterial;
		this.pipeGroup2.upperPipe.shapes[0].material = groundMaterial;
		this.pipeGroup2.lowerPipe.shapes[0].material = groundMaterial;
		this.pipeGroup3.upperPipe.shapes[0].material = groundMaterial;
		this.pipeGroup3.lowerPipe.shapes[0].material = groundMaterial;
		var birdGroundContactMaterial = new p2.ContactMaterial(birdMaterial, groundMaterial, {
			friction: 100,
			stiffness: 10000,
			// restitution: 0,
			relaxation: 1,
			frictionRelaxation: 10
		});
		this.world.addContactMaterial(birdGroundContactMaterial);
	}

	private initEvents():void {
		// update for each frame
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		// register touch event
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchScreen, this);
	}

	private onTouchScreen() {
		if (this.bird.isAlive) {

			if (!this.isPrepared)
				this.prepareGameStart();

			if (!this.isStart)
				this.gameStart();

			this.birdBody.velocity[1] = this.birdJumpVelocity;
			this.birdBody.angle = this.birdJumpAngle;
			this.birdBody.angularVelocity = this.birdJumpAngularVelocity;
			this.bird.jump();
		}
	}

	private initGUI() {
		this.guide = Utils.createBitmapByName("guide_png");
		this.guide.x = this.width/2-30;
		this.guide.y = 400;
		this.addChild(this.guide);

		var scoreboard:egret.Bitmap = Utils.createBitmapByName("scoreboard_png");
		scoreboard.anchorOffsetX = scoreboard.width*0.5;
		scoreboard.x = this.width/2;
		scoreboard.y = 0;
		this.addChild(scoreboard);

		this.scoreLabel = new egret.BitmapText();
		this.scoreLabel.scaleX = 0.5;
		this.scoreLabel.scaleY = 0.5;
        this.scoreLabel.font = GameData.fontRed;
		this.scoreLabel.x = this.width/2 + 20;
		this.scoreLabel.y = 18;
        this.addChild(this.scoreLabel);
		this.updateScoreLabel();

		this.soundButton = new eui.Button();
		this.soundButton.x = GameData.stageW - 20 - 79;
		this.soundButton.y = 20;
		this.soundButton.skinName = "skins.SoundButtonSkin";
		this.soundButton.touchEnabled = true;
		this.addChild(this.soundButton);
		this.updateSoundButton();
		this.soundButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundButton, this);
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

	private createPipeGroups() {
		this.pipeGroup1 = new PipeGroup(this.world, this);
		this.pipeGroup2 = new PipeGroup(this.world, this);
		this.pipeGroup3 = new PipeGroup(this.world, this);
	}

	private createBird() {
		this.bird = new Bird();
		this.bird.x = GameData.stageW/3;
		this.bird.y = GameData.stageH/2;
		this.addChild(this.bird);

		this.birdBody = new p2.Body({
			mass: 5,
			type: p2.Body.DYNAMIC,
			position: P2Space.getP2Pos(this.bird.x, this.bird.y),
			allowSleep: false
		});
		this.birdBody.angularDamping = 0.98;
		var circle = new p2.Circle({
			radius: P2Space.extentP2(this.birdBodyRadius)
		});

		this.birdBody.addShape(circle);
		this.world.addBody(this.birdBody);
		this.birdBody.displays = [this.bird];
	}

	private onEnterFrame() {
        this.world.step(60/1000);

		// update ground position
		var pos = P2Space.getEgretLoc(this.groundBody);
		if (pos[0] <= 0)
			this.groundBody.position[0] = P2Space.extentP2(GameData.stageW);

		// update pipe positions
		this.pipeGroup1.updatePipePostions();
		this.pipeGroup2.updatePipePostions();
		this.pipeGroup3.updatePipePostions();

		// update physics world, sync p2 body and egret display object positions
		P2Space.syncDisplayForGroup(this.world.bodies);

		this.checkGetPoint();
		this.checkCollision();
    }

	private checkCollision() {
		if (this.bird.isAlive &&
			(this.birdBody.overlaps(this.groundBody) ||
			this.pipeGroup1.collides(this.birdBody) ||
			this.pipeGroup2.collides(this.birdBody) ||
			this.pipeGroup3.collides(this.birdBody))) {
			this.gameOver();
		}
	}

	private checkGetPoint() {
		if (this.pipeGroup1.checkGetPoint(this.birdBody) ||
			this.pipeGroup2.checkGetPoint(this.birdBody) ||
			this.pipeGroup3.checkGetPoint(this.birdBody)) {
			
			GameData.score++;
			this.updateScoreLabel();
		}
	}

	private updateScoreLabel() {
		this.scoreLabel.text = `${GameData.score}`;
	}

	private gameStart() {
		this.isStart = true;
		// resume velocity
		this.groundBody.velocity[0] = GameView.speedX;
		this.pipeGroup1.start();
		this.pipeGroup2.start();
		this.pipeGroup3.start();
		this.world.gravity[1] = this.gravity;

		// play music
		this.musicChanel = SoundUtils.playMusic(this.music);
        this.updateSoundButton();
	}

	private prepareGameStart() {
		if (this.guide && this.guide.parent)
			this.guide.parent.removeChild(this.guide);
		if (this.gameOverPanel && this.gameOverPanel.parent)
			this.gameOverPanel.parent.removeChild(this.gameOverPanel);

		// reset sprite positions and states
		this.world.gravity[1] = 0;
		this.birdBody.position = P2Space.getP2Pos(GameData.stageW/3, GameData.stageH/2);
		this.birdBody.velocity = [0, 0];
		this.birdBody.angle = 0;
		this.birdBody.angularVelocity = 0;
		this.bird.fly();

		this.pipeGroup1.moveToX(GameData.stageW+PipeGroup.pipeWidth/2);
		this.pipeGroup2.moveToX(GameData.stageW+PipeGroup.pipeWidth/2 + PipeGroup.pipeGapX);
		this.pipeGroup3.moveToX(GameData.stageW+PipeGroup.pipeWidth/2 + PipeGroup.pipeGapX*2);

		// reset current score
		GameData.score = 0;
		this.updateScoreLabel();

		this.isPrepared = true;
	}

	private gameOver() {
		this.updateHighestScore();

		this.isPrepared = false;
		this.isStart = false;
		this.groundBody.velocity[0] = 0;
		this.pipeGroup1.stop();
		this.pipeGroup2.stop();
		this.pipeGroup3.stop();

		// stop music
		if (this.musicChanel) {
			this.musicChanel.stop();
			this.musicChanel = null;
		}
			
		this.bird.die();
		ShakeUtils.getInstance().shakeObj(this, 0.5, 10, 8);
		egret.setTimeout(this.showGameOverPanel, this, 500);
	}

	public updateHighestScore() {
		if (GameData.score > GameData.highestScore)
			GameData.highestScore = GameData.score;
	}

	private showGameOverPanel() {
		if (this.gameOverPanel == null) {
			this.gameOverPanel = new GameOverPanel();
			this.gameOverPanel.x = this.width/2;
			this.gameOverPanel.y = this.height/2;
			this.gameOverPanel.addEventListener(GameData.gameRestartEvent, this.prepareGameStart, this);
		}

		this.addChild(this.gameOverPanel);
		this.gameOverPanel.updateGUI();
	}
}