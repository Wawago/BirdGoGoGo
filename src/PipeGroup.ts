class PipeGroup {

    public upperPipe:p2.Body;
    public lowerPipe:p2.Body;
    public coin:p2.Body;

    public static groundHeight:number = 210;
    public static pipeHeight:number = 753;
	public static pipeWidth:number = 142;
    public static pipeGapX:number = 400;
	public static pipeGapY:number = 280;
    public static minPipeHeight:number = 130;
	private pipeRebornX:number;
	private totalPipeLength:number;

    public haveGotPoint:boolean = false;

    private sfxPoint:egret.Sound = RES.getRes("sfx_point_mp3");

    constructor(world:p2.World, parent:egret.Sprite) {
        this.pipeRebornX = PipeGroup.pipeGapX*3-PipeGroup.pipeWidth/2;
        this.totalPipeLength = GameData.stageH - PipeGroup.groundHeight - PipeGroup.pipeGapY;
        this.createPipes(world, parent);
	}

    public createPipes(world:p2.World, parent:egret.Sprite):void {
        var upperPipeHeight = this.getRandomPipeHeight();

        this.upperPipe = PipeGroup.createBlock(world, parent, 
            GameData.stageW,                        // x
            upperPipeHeight-PipeGroup.pipeHeight,   // y
            PipeGroup.pipeWidth,                    // width
            PipeGroup.pipeHeight,                   // height
            0, "upper_pipe_png");

		this.lowerPipe = PipeGroup.createBlock(world, parent, 
            GameData.stageW, 
            upperPipeHeight+PipeGroup.pipeGapY, 
            PipeGroup.pipeWidth, 
            PipeGroup.pipeHeight, 
            0, "lower_pipe_png");

        this.coin = this.createCoin(world, parent, GameData.stageW, upperPipeHeight+PipeGroup.pipeGapY/2-85/2);
        // this.coin.position[0] = this.upperPipe.position[0];
    }

    public createCoin(world:p2.World, parent:egret.Sprite, x:number, y:number):p2.Body {
        var body:p2.Body = new p2.Body({
			mass:1,
			fixedRotation: true,
			position: P2Space.getP2Pos(x+84/2, y+85/2),
            collisionResponse: false,
            type: p2.Body.KINEMATIC,
        });

        world.addBody(body);

        var circle:p2.Circle = new p2.Circle({
            radius: P2Space.extentP2(84)
        })

        body.addShape(circle);

        var bitmap:egret.Bitmap = Utils.createBitmapByName("coin_png");
		// bitmap.width = width;
		// bitmap.height = height;
		bitmap.anchorOffsetX = bitmap.width*0.5;
		bitmap.anchorOffsetY = bitmap.height*0.5;
		body.displays = [bitmap];

		parent.addChild(bitmap);

        return body;
    }

    public static createBlock(world:p2.World, parent:egret.Sprite, x:number, y:number, width:number, height:number, vx:number, resName:string):p2.Body {
		var body:p2.Body = new p2.Body({
			mass:1,
			fixedRotation: true,
			position: P2Space.getP2Pos(x+width/2, y+height/2),
			// type: vx == 0 ? p2.Body.STATIC : p2.Body.KINEMATIC,
            type: p2.Body.KINEMATIC,
			velocity:[ vx, 0 ]
        });

		world.addBody(body);

		var box:p2.Box = new p2.Box({
			width : P2Space.extentP2(width),
			height : P2Space.extentP2(height) 
        });

		body.addShape(box);

		var bitmap:egret.Bitmap = Utils.createBitmapByName(resName);
		bitmap.width = width;
		bitmap.height = height;
		bitmap.anchorOffsetX = bitmap.width*0.5;
		bitmap.anchorOffsetY = bitmap.height*0.5;
		body.displays = [bitmap];

		parent.addChild(bitmap);

		return body;
	}

    public updatePipePostions():void {
        if (P2Space.extentEgret(this.upperPipe.position[0]) <= -PipeGroup.pipeWidth/2) {
            var upperPipeHeight = this.getRandomPipeHeight();

            this.moveToX(this.pipeRebornX);
            this.upperPipe.position[1] = P2Space.extentP2(upperPipeHeight-PipeGroup.pipeHeight*0.5);
            this.lowerPipe.position[1] = P2Space.extentP2(upperPipeHeight+PipeGroup.pipeGapY+PipeGroup.pipeHeight*0.5);
            this.coin.position[1] = P2Space.extentP2(upperPipeHeight+PipeGroup.pipeGapY/2);
        }
    }

    public moveToX(x:number):void {
        this.upperPipe.position[0] = P2Space.extentP2(x);
        this.lowerPipe.position[0] = P2Space.extentP2(x);
        this.coin.position[0] = P2Space.extentP2(x);
        this.coin.displays[0].visible = true;
        this.haveGotPoint = false;
    }

    private getRandomPipeHeight():number {
		return Math.floor((this.totalPipeLength-PipeGroup.minPipeHeight*2)*Math.random() + PipeGroup.minPipeHeight);
	}

    public stop() {
        this.upperPipe.velocity[0] = 0;
        this.lowerPipe.velocity[0] = 0;
        this.coin.velocity[0] = 0
    }

    public start() {
        this.upperPipe.velocity[0] = GameView.speedX;
        this.lowerPipe.velocity[0] = GameView.speedX;
        this.coin.velocity[0] = GameView.speedX;
    }

    public collides(body:p2.Body):boolean {
        return body.overlaps(this.upperPipe) || body.overlaps(this.lowerPipe);
    }

    public checkGetPoint(bird:p2.Body):boolean {
        if (this.coin.overlaps(bird) && !this.haveGotPoint) {
            this.haveGotPoint = true;
            this.sfxPoint.play(0, 1);
            this.coin.displays[0].visible = false
            return true;
        }
        return false;
    }
}