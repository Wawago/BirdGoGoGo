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
var StartView = (function (_super) {
    __extends(StartView, _super);
    function StartView() {
        var _this = _super.call(this) || this;
        _this.logoPosY = 120;
        _this.startButtonWidth = 282;
        _this.startButtonHeight = 103;
        _this.soundButtonWidth = 79;
        _this.rankButtonWidth = 192;
        _this.initView();
        _this.initGUI();
        return _this;
    }
    StartView.prototype.initView = function () {
        this.anchorOffsetX = GameData.stageW / 2;
        this.anchorOffsetY = GameData.stageH / 2;
        this.width = GameData.stageW;
        this.height = GameData.stageH;
        // create background
        var bg = Utils.createBitmapByName("background_png");
        bg.width = GameData.stageW;
        bg.height = GameData.stageH;
        this.addChild(bg);
        // enable touch event
        this.touchEnabled = true;
    };
    StartView.prototype.initGUI = function () {
        // logo
        this.logo = Utils.createBitmapByName("logo_png");
        this.logo.anchorOffsetX = this.logo.width * 0.5;
        this.logo.x = GameData.stageW / 2;
        this.logo.y = this.logoPosY;
        this.addChild(this.logo);
        // bird
        this.bird = new Bird();
        this.bird.x = GameData.stageW / 2;
        this.bird.y = this.logo.y + this.logo.height + 80;
        this.addChild(this.bird);
        // start button
        this.startButton = new eui.Button();
        this.startButton.x = GameData.stageW * 0.5 - this.startButtonWidth / 2;
        this.startButton.y = GameData.stageH * 0.5 - this.startButtonHeight / 2 + 20;
        this.startButton.skinName = "skins.StartButtonSkin";
        this.addChild(this.startButton);
        this.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartButton, this);
        // rank button
        this.rankButton = new eui.Button();
        this.rankButton.x = GameData.stageW * 0.5 - this.rankButtonWidth - 20;
        this.rankButton.y = this.startButton.y + this.startButtonHeight + 35;
        this.rankButton.skinName = "skins.RankButtonSkin";
        this.addChild(this.rankButton);
        this.rankButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankButton, this);
        // share button
        this.shareButton = new eui.Button();
        this.shareButton.x = GameData.stageW * 0.5 + 20;
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
        this.updateSoundButton();
        this.soundButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundButton, this);
        // ground
        this.ground = Utils.createBitmapByName("ground_png");
        this.ground.anchorOffsetX = this.ground.width * 0.5;
        this.ground.anchorOffsetY = this.ground.height * 0.5;
        this.ground.x = GameData.stageW;
        this.ground.y = GameData.stageH - 0.5 * this.ground.height;
        this.addChild(this.ground);
        egret.Tween.get(this.ground, {
            loop: true
        }).to({ x: 0 }, 5000).call(this.onGroundComplete, this);
        // fonts
        GameData.fontRed = RES.getRes("font_red_fnt");
        GameData.fontGrey = RES.getRes("font_grey_fnt");
    };
    StartView.prototype.onGroundComplete = function () {
        this.ground.x = GameData.stageW;
    };
    StartView.prototype.onStartButton = function () {
        this.dispatchEventWith(GameData.gameStartEvent);
    };
    StartView.prototype.onRankButton = function () {
    };
    StartView.prototype.onShareButton = function () {
    };
    StartView.prototype.onSoundButton = function () {
        GameData.isSoundOn = !GameData.isSoundOn;
        this.updateSoundButton();
    };
    StartView.prototype.updateSoundButton = function () {
        this.soundButton.currentState = GameData.isSoundOn ? "on" : "off";
    };
    StartView.prototype.end = function () {
        this.startButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartButton, this);
        this.rankButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankButton, this);
        this.shareButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareButton, this);
        this.soundButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundButton, this);
    };
    return StartView;
}(egret.Sprite));
__reflect(StartView.prototype, "StartView");
//# sourceMappingURL=StartView.js.map