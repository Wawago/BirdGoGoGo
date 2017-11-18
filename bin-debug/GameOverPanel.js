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
var GameOverPanel = (function (_super) {
    __extends(GameOverPanel, _super);
    function GameOverPanel() {
        var _this = _super.call(this) || this;
        _this.restartButtonWidth = 145;
        _this.restartButtonHeight = 108;
        _this.initView();
        _this.initGUI();
        _this.updateGUI();
        return _this;
    }
    GameOverPanel.prototype.initView = function () {
        this.anchorOffsetX = GameData.stageW / 2;
        this.anchorOffsetY = GameData.stageH / 2;
        this.width = GameData.stageW;
        this.height = GameData.stageH;
        this.graphics.beginFill(0x000000, 0.5);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();
        // this.graphicsalpha = 0.5;
    };
    GameOverPanel.prototype.initGUI = function () {
        // score panel
        this.scorePanel = Utils.createBitmapByName("gameover_panel_png");
        this.scorePanel.anchorOffsetX = this.scorePanel.width * .5;
        this.scorePanel.x = this.width / 2;
        this.scorePanel.y = 270;
        this.addChild(this.scorePanel);
        // score labels
        this.currentScore = new egret.BitmapText();
        this.currentScore.font = GameData.fontRed;
        this.addChild(this.currentScore);
        this.highestScore = new egret.BitmapText();
        this.highestScore.font = GameData.fontGrey;
        this.highestScore.x = this.scorePanel.x + 75;
        this.highestScore.y = this.scorePanel.y + this.scorePanel.height - 63;
        this.addChild(this.highestScore);
        // restart button
        this.restartButton = new eui.Button();
        this.restartButton.width = this.restartButtonWidth;
        this.restartButton.height = this.restartButtonHeight;
        this.restartButton.x = this.width / 2 - this.restartButtonWidth / 2;
        this.restartButton.y = this.scorePanel.y + this.scorePanel.height + 40;
        this.restartButton.skinName = "skins.RestartButtonSkin";
        this.addChild(this.restartButton);
        this.restartButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestartButton, this);
        // rank button
        this.rankButton = new eui.Button();
        this.rankButton.width = this.restartButtonWidth;
        this.rankButton.height = this.restartButtonHeight;
        this.rankButton.x = this.restartButton.x - this.restartButtonWidth - 30;
        this.rankButton.y = this.restartButton.y;
        this.rankButton.skinName = "skins.RankButtonSmallSkin";
        this.addChild(this.rankButton);
        this.rankButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankButton, this);
        // share button
        this.shareButton = new eui.Button();
        this.shareButton.width = this.restartButtonWidth;
        this.shareButton.height = this.restartButtonHeight;
        this.shareButton.x = this.restartButton.x + this.restartButtonWidth + 30;
        this.shareButton.y = this.restartButton.y;
        this.shareButton.skinName = "skins.ShareButtonSmallSkin";
        this.addChild(this.shareButton);
        this.shareButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareButton, this);
    };
    GameOverPanel.prototype.updateGUI = function () {
        this.currentScore.text = "" + GameData.score;
        this.currentScore.anchorOffsetX = this.currentScore.textWidth * .5;
        this.currentScore.anchorOffsetY = this.currentScore.textHeight * .5;
        this.currentScore.x = this.scorePanel.x;
        this.currentScore.y = this.scorePanel.y + this.scorePanel.height / 2 + 50;
        this.highestScore.text = "" + GameData.highestScore;
    };
    GameOverPanel.prototype.onRestartButton = function () {
        this.dispatchEventWith(GameData.gameRestartEvent);
    };
    GameOverPanel.prototype.onRankButton = function () {
    };
    GameOverPanel.prototype.onShareButton = function () {
    };
    return GameOverPanel;
}(egret.Sprite));
__reflect(GameOverPanel.prototype, "GameOverPanel");
//# sourceMappingURL=GameOverPanel.js.map