var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var P2Space = (function () {
    function P2Space() {
    }
    /**
     * 同步p2世界中的刚体，使其对应的显示对象正确显示
     * @param 刚体
     */
    P2Space.syncDisplay = function (body, comment) {
        if (comment === void 0) { comment = ""; }
        /// debug
        if (!body)
            return;
        var disp = body.displays[0];
        if (disp) {
            var loc = P2Space.getEgretLoc(body, comment);
            disp.x = loc[0];
            disp.y = loc[1];
            disp.rotation = 360 - body.angle * 180 / Math.PI;
            if (comment.length) {
                console.log(comment + "的锚点", disp.anchorOffsetX, disp.anchorOffsetY);
            }
        }
    };
    /**
     * 同步p2世界中的刚体数组，使其对应的显示对象正确显示
     * @param 刚体数组
     */
    P2Space.syncDisplayForGroup = function (bodys) {
        for (var _i = 0, bodys_1 = bodys; _i < bodys_1.length; _i++) {
            var body = bodys_1[_i];
            this.syncDisplay(body);
        }
    };
    /**
     * 由p2空间尺寸得到显示空间尺寸
     * @param extentP2          p2空间尺寸
     * @returns {number}        显示空间尺寸
     */
    P2Space.extentEgret = function (extentP2) {
        return extentP2 * this.$factor;
    };
    /**
     * 由显示空间尺寸得到p2空间尺寸
     * @param extentEgret       显示空间尺寸
     * @returns {number}        p2空间尺寸
     */
    P2Space.extentP2 = function (extentEgret) {
        return extentEgret / this.$factor;
    };
    /**
     * 由Egret显示坐标系的坐标获得对应p2坐标系的坐标
     * @param xEgret
     * @param yEgret
     * @returns {any[]}     以数组返回计算出的p2空间坐标
     */
    P2Space.getP2Pos = function (xEgret, yEgret) {
        return [xEgret / this.$factor, (yEgret) / this.$factor];
    };
    /**
     * 根据p2空间的刚体坐标计算出其对应的显示空间坐标
     * @param body
     * @returns {any[]}
     */
    P2Space.getEgretLoc = function (body, comment) {
        if (comment === void 0) { comment = ""; }
        //var shp:p2.Shape = body.shapes[0];
        var xP2 = body.position[0];
        var yP2 = body.position[1];
        if (comment.length) {
            console.log("[" + comment + "]getEgretLoc:", xP2, yP2, "(p2->egret)", xP2 * this.$factor, /*this._rectWorld.height -*/ yP2 * this.$factor);
        }
        return [xP2 * this.$factor, /*this._rectWorld.height - */ yP2 * this.$factor];
    };
    /**
     * p2世界坐标系与实际显示空间坐标系的比例因子
     * 通常p2进行物理运算时，使用p2世界坐标系
     * 当物理世界的刚体需要显示时，使用显示坐标系
     */
    P2Space.$factor = 50;
    return P2Space;
}());
__reflect(P2Space.prototype, "P2Space");
//# sourceMappingURL=P2Space.js.map