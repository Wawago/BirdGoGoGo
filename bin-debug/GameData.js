var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    GameData.gameStartEvent = "gameStart";
    GameData.gameRestartEvent = "gameRestart";
    GameData.stageW = 640;
    GameData.stageH = 1136;
    GameData.isSoundOn = true;
    GameData.isStart = false;
    // public static curScene:number = 1;
    GameData.isPause = true;
    GameData.score = 0;
    GameData.highestScore = 0;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map