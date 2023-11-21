class InnerCircle {
    constructor(config) {
        this.centerX = config.centerX;
        this.centerY = config.centerY;
        this.radius = config.radius;
        this.angleStart = config.angleStart;
        this.angleEnd = config.angleEnd;
        this.gradient = config.gradient;
        this.fillStyle = config.fillStyle;
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
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        ctx.closePath();
    }
}