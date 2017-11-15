var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PipeGroup = (function () {
    function PipeGroup(world, parent) {
        this.haveGotPoint = false;
        this.sfxPoint = RES.getRes("sfx_point_mp3");
        this.pipeRebornX = PipeGroup.pipeGapX * 3 - PipeGroup.pipeWidth / 2;
        this.totalPipeLength = GameData.stageH - PipeGroup.groundHeight - PipeGroup.pipeGapY;
        this.createPipes(world, parent);
    }
    PipeGroup.prototype.createPipes = function (world, parent) {
        var upperPipeHeight = this.getRandomPipeHeight();
        this.upperPipe = PipeGroup.createBlock(world, parent, GameData.stageW, // x
        upperPipeHeight - PipeGroup.pipeHeight, // y
        PipeGroup.pipeWidth, // width
        PipeGroup.pipeHeight, // height
        0, "upper_pipe_png");
        this.lowerPipe = PipeGroup.createBlock(world, parent, GameData.stageW, upperPipeHeight + PipeGroup.pipeGapY, PipeGroup.pipeWidth, PipeGroup.pipeHeight, 0, "lower_pipe_png");
        this.coin = this.createCoin(world, parent, GameData.stageW, upperPipeHeight + PipeGroup.pipeGapY / 2 - 85 / 2);
        // this.coin.position[0] = this.upperPipe.position[0];
    };
    PipeGroup.prototype.createCoin = function (world, parent, x, y) {
        var body = new p2.Body({
            mass: 1,
            fixedRotation: true,
            position: P2Space.getP2Pos(x + 84 / 2, y + 85 / 2),
            collisionResponse: false,
            type: p2.Body.KINEMATIC,
        });
        world.addBody(body);
        var circle = new p2.Circle({
            radius: P2Space.extentP2(84)
        });
        body.addShape(circle);
        var bitmap = Utils.createBitmapByName("coin_png");
        // bitmap.width = width;
        // bitmap.height = height;
        bitmap.anchorOffsetX = bitmap.width * 0.5;
        bitmap.anchorOffsetY = bitmap.height * 0.5;
        body.displays = [bitmap];
        parent.addChild(bitmap);
        return body;
    };
    PipeGroup.createBlock = function (world, parent, x, y, width, height, vx, resName) {
        var body = new p2.Body({
            mass: 1,
            fixedRotation: true,
            position: P2Space.getP2Pos(x + width / 2, y + height / 2),
            // type: vx == 0 ? p2.Body.STATIC : p2.Body.KINEMATIC,
            type: p2.Body.KINEMATIC,
            velocity: [vx, 0]
        });
        world.addBody(body);
        var box = new p2.Box({
            width: P2Space.extentP2(width),
            height: P2Space.extentP2(height)
        });
        body.addShape(box);
        var bitmap = Utils.createBitmapByName(resName);
        bitmap.width = width;
        bitmap.height = height;
        bitmap.anchorOffsetX = bitmap.width * 0.5;
        bitmap.anchorOffsetY = bitmap.height * 0.5;
        body.displays = [bitmap];
        parent.addChild(bitmap);
        return body;
    };
    PipeGroup.prototype.updatePipePostions = function () {
        if (P2Space.extentEgret(this.upperPipe.position[0]) <= -PipeGroup.pipeWidth / 2) {
            var upperPipeHeight = this.getRandomPipeHeight();
            this.moveToX(this.pipeRebornX);
            this.upperPipe.position[1] = P2Space.extentP2(upperPipeHeight - PipeGroup.pipeHeight * 0.5);
            this.lowerPipe.position[1] = P2Space.extentP2(upperPipeHeight + PipeGroup.pipeGapY + PipeGroup.pipeHeight * 0.5);
            this.coin.position[1] = P2Space.extentP2(upperPipeHeight + PipeGroup.pipeGapY / 2);
        }
    };
    PipeGroup.prototype.moveToX = function (x) {
        this.upperPipe.position[0] = P2Space.extentP2(x);
        this.lowerPipe.position[0] = P2Space.extentP2(x);
        this.coin.position[0] = P2Space.extentP2(x);
        this.coin.displays[0].visible = true;
        this.haveGotPoint = false;
    };
    PipeGroup.prototype.getRandomPipeHeight = function () {
        return Math.floor((this.totalPipeLength - PipeGroup.minPipeHeight * 2) * Math.random() + PipeGroup.minPipeHeight);
    };
    PipeGroup.prototype.stop = function () {
        this.upperPipe.velocity[0] = 0;
        this.lowerPipe.velocity[0] = 0;
        this.coin.velocity[0] = 0;
    };
    PipeGroup.prototype.start = function () {
        this.upperPipe.velocity[0] = GameView.speedX;
        this.lowerPipe.velocity[0] = GameView.speedX;
        this.coin.velocity[0] = GameView.speedX;
    };
    PipeGroup.prototype.collides = function (body) {
        return body.overlaps(this.upperPipe) || body.overlaps(this.lowerPipe);
    };
    PipeGroup.prototype.checkGetPoint = function (bird) {
        if (this.coin.overlaps(bird) && !this.haveGotPoint) {
            this.haveGotPoint = true;
            this.sfxPoint.play(0, 1);
            this.coin.displays[0].visible = false;
            return true;
        }
        return false;
    };
    PipeGroup.groundHeight = 210;
    PipeGroup.pipeHeight = 753;
    PipeGroup.pipeWidth = 142;
    PipeGroup.pipeGapX = 400;
    PipeGroup.pipeGapY = 280;
    PipeGroup.minPipeHeight = 130;
    return PipeGroup;
}());
__reflect(PipeGroup.prototype, "PipeGroup");
//# sourceMappingURL=PipeGroup.js.map