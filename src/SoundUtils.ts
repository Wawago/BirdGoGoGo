class SoundUtils {

    public static playSfxOneTime(sfx:egret.Sound):void {
        if (GameData.isSoundOn) {
            sfx.play(0, 1);
        }
    }

    public static playMusic(music:egret.Sound):egret.SoundChannel {
        return music.play(0, -1);
    }

}