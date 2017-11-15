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
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        var _this = _super.call(this) || this;
        _this.sfxDie = RES.getRes("sfx_die_mp3");
        _this.sfxHit = RES.getRes("sfx_hit_mp3");
        _this.sfxPoint = RES.getRes("sfx_point_mp3");
        _this.sfxJump = RES.getRes("sfx_jump_mp3");
        _this.isAlive = true;
        _this.initView();
        return _this;
    }
    Bird.prototype.initView = function () {
        var data = RES.getRes("bird_json");
        var txtr = RES.getRes("bird_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, txtr);
        this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData("bird"));
        this.addChild(this.mc);
        this.anchorOffsetX = 0.5 * this.mc.width;
        this.anchorOffsetY = 0.5 * this.mc.height;
        this.fly();
    };
    Bird.prototype.fly = function () {
        this.isAlive = true;
        this.mc.gotoAndPlay("fly", -1);
    };
    Bird.prototype.jump = function () {
        this.sfxJump.play(0, 1);
    };
    Bird.prototype.die = function () {
        this.isAlive = false;
        this.mc.gotoAndPlay("die", 1);
        this.sfxHit.play(0, 1);
    };
    Bird.prototype.point = function () {
        this.sfxPoint.play(0, 1);
    };
    Bird.prototype.dispose = function () {
        this.removeChildren();
    };
    return Bird;
}(egret.Sprite));
__reflect(Bird.prototype, "Bird");
//# sourceMappingURL=Bird.js.map