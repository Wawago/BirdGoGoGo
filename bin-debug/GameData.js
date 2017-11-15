var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    GameData.stageW = 0;
    GameData.stageH = 0;
    GameData.closeMusic = false;
    GameData.closeBgMusic = false;
    GameData.isStart = false;
    GameData.curScene = 1;
    GameData.isPause = true;
    GameData.bgSpeed = 0;
    GameData.score = 0;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map