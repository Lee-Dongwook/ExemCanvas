class OuterCircle {
    constructor(config) {
        this.centerX = config.centerX;
        this.centerY = config.centerY;
        this.radius = config.radius;
        this.angleStart = config.angleStart;
        this.angleEnd = config.angleEnd;
        this.lineWidth = config.lineWidth;
        this.strokeStyle = config.strokeStyle;
    }

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.radius, this.angleStart, this.angleEnd, false);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
        ctx.closePath();
    }
}