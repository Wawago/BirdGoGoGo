class Bird extends egret.Sprite {

    private mc:egret.MovieClip;
    private sfxDie:egret.Sound = RES.getRes("sfx_die_mp3");
    private sfxHit:egret.Sound = RES.getRes("sfx_hit_mp3");
    private sfxPoint:egret.Sound = RES.getRes("sfx_point_mp3");
    private sfxJump:egret.Sound = RES.getRes("sfx_jump_mp3");

    public isAlive:boolean = true;

    constructor() {
        super();
        this.initView();
    }

    private initView():void {
        let data = RES.getRes("bird_json");
        let txtr = RES.getRes("bird_png");

        let mcDataFactory = new egret.MovieClipDataFactory(data, txtr);
        this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData("bird"));
        this.addChild(this.mc);
        this.anchorOffsetX = 0.5*this.mc.width;
        this.anchorOffsetY = 0.5*this.mc.height;

        this.fly();
    }

    public fly():void {
        this.isAlive = true;
        this.mc.gotoAndPlay("fly", -1);
    }

    public jump():void {
        this.sfxJump.play(0,1);
    }

    public die():void {
        this.isAlive = false;
        this.mc.gotoAndPlay("die", 1);
        this.sfxHit.play(0,1);
    }

    public point():void {
        this.sfxPoint.play(0,1);
    }

    public dispose():void {
        this.removeChildren();
    }
}