var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundUtils = (function () {
    function SoundUtils() {
    }
    SoundUtils.playSfxOnTime = function (sfx) {
        if (GameData.isSoundOn) {
            sfx.play(0, 1);
        }
    };
    return SoundUtils;
}());
__reflect(SoundUtils.prototype, "SoundUtils");
//# sourceMappingURL=SoundUtils.js.map