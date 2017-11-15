var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.birdBodyRadius = 38;
        _this.gravity = 25;
        _this.birdJumpSpeed = -13;
        // game state
        _this.isStart = false;
        _this.initView();
        _this.initSprites();
        _this.initContactMaterials();
        _this.initEvents();
        _this.initGUI();
        return _this;
    }
    GameView.prototype.initView = function () {
        this.anchorOffsetX = GameData.stageW / 2;
        this.anchorOffsetY = GameData.stageH / 2;
        this.width = GameData.stageW;
        this.height = GameData.stageH;
        // create background
        var bg = Utils.createBitmapByName("background_png");
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
    };
    GameView.prototype.initSprites = function () {
        this.createBird();
        this.createPipeGroups();
        // create groud sprite
        this.groundBody = PipeGroup.createBlock(this.world, this, 0, GameData.stageH - PipeGroup.groundHeight, GameData.stageW * 2, PipeGroup.groundHeight, 0, "ground_png");
    };
    GameView.prototype.initContactMaterials = function () {
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
    };
    GameView.prototype.initGUI = function () {
        this.startButton = new eui.Button();
        this.startButton.label = "Go!";
        this.startButton.horizontalCenter = 0;
        this.startButton.verticalCenter = 0;
        // this.startButton.percentWidth = 20;
        // this.startButton.percentHeight = 80;
        // this.startButton.width = 100;
        // this.startButton.height = 30;
        // console.log(this.startButton.getBounds().width);
        this.startButton.x = GameData.stageW / 2 - 100 / 2;
        this.startButton.y = GameData.stageH / 2 - 50 / 2;
        this.addChild(this.startButton);
        this.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
        this.scoreLabel = new eui.Label();
        this.updateScoreLabel();
        this.addChild(this.scoreLabel);
    };
    GameView.prototype.createPipeGroups = function () {
        this.pipeGroup1 = new PipeGroup(this.world, this);
        this.pipeGroup2 = new PipeGroup(this.world, this);
        this.pipeGroup3 = new PipeGroup(this.world, this);
    };
    GameView.prototype.createBird = function () {
        // create bird sprite
        this.bird = new Bird();
        this.bird.x = GameData.stageW / 3;
        this.bird.y = GameData.stageH / 2;
        this.addChild(this.bird);
        this.birdBody = new p2.Body({
            mass: 5,
            type: p2.Body.DYNAMIC,
            position: P2Space.getP2Pos(this.bird.x, this.bird.y),
            allowSleep: false
        });
        this.birdBody.angularDamping = 0.98;
        // var box = new p2.Box({
        // 	width: P2Space.extentP2(this.birdBodyWidth),
        // 	height: P2Space.extentP2(this.birdBodyHeight)
        // })
        var circle = new p2.Circle({
            radius: P2Space.extentP2(this.birdBodyRadius)
        });
        this.birdBody.addShape(circle);
        this.world.addBody(this.birdBody);
        this.birdBody.displays = [this.bird];
    };
    GameView.prototype.initEvents = function () {
        // update for each frame
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        // register touch event
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchScreen, this);
    };
    GameView.prototype.onTouchScreen = function () {
        if (this.isStart && this.bird.isAlive) {
            this.birdBody.velocity[1] = this.birdJumpSpeed;
            this.bird.jump();
        }
    };
    GameView.prototype.onEnterFrame = function () {
        this.world.step(60 / 1000);
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
    };
    GameView.prototype.checkCollision = function () {
        if (this.bird.isAlive &&
            (this.birdBody.overlaps(this.groundBody) ||
                this.pipeGroup1.collides(this.birdBody) ||
                this.pipeGroup2.collides(this.birdBody) ||
                this.pipeGroup3.collides(this.birdBody))) {
            this.gameOver();
        }
    };
    GameView.prototype.checkGetPoint = function () {
        if (this.pipeGroup1.checkGetPoint(this.birdBody) ||
            this.pipeGroup2.checkGetPoint(this.birdBody) ||
            this.pipeGroup3.checkGetPoint(this.birdBody)) {
            GameData.score++;
            this.updateScoreLabel();
        }
    };
    GameView.prototype.updateScoreLabel = function () {
        this.scoreLabel.text = "SCORE: " + GameData.score;
    };
    GameView.prototype.gameStart = function () {
        this.startButton.visible = false;
        this.isStart = true;
        GameData.score = 0;
        this.updateScoreLabel();
        // reset sprite positions and states
        this.birdBody.position = P2Space.getP2Pos(GameData.stageW / 3, GameData.stageH / 2);
        this.birdBody.velocity = [0, 0];
        this.birdBody.angle = 0;
        this.birdBody.angularVelocity = 0;
        this.bird.fly();
        this.pipeGroup1.moveToX(GameData.stageW + PipeGroup.pipeWidth / 2);
        this.pipeGroup2.moveToX(GameData.stageW + PipeGroup.pipeWidth / 2 + PipeGroup.pipeGapX);
        this.pipeGroup3.moveToX(GameData.stageW + PipeGroup.pipeWidth / 2 + PipeGroup.pipeGapX * 2);
        // resume velocity
        this.groundBody.velocity[0] = GameView.speedX;
        this.pipeGroup1.start();
        this.pipeGroup2.start();
        this.pipeGroup3.start();
        this.world.gravity[1] = this.gravity;
    };
    GameView.prototype.gameOver = function () {
        this.isStart = false;
        this.groundBody.velocity[0] = 0;
        this.pipeGroup1.stop();
        this.pipeGroup2.stop();
        this.pipeGroup3.stop();
        this.bird.die();
        ShakeUtils.getInstance().shakeObj(this, 0.5, 10, 8);
        egret.setTimeout(this.showRestartButton, this, 500);
    };
    GameView.prototype.showRestartButton = function () {
        this.startButton.label = "Restart";
        this.startButton.visible = true;
    };
    // speeds
    GameView.speedX = -2.5;
    return GameView;
}(egret.Sprite));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map