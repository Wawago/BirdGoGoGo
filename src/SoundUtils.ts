class SoundUtils {

    public static playSfxOnTime(sfx:egret.Sound):void {
        if (GameData.isSoundOn) {
            sfx.play(0, 1);
        }
    }

}