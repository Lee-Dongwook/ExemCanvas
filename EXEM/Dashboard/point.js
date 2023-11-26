class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.1;
        this.cur = index;
    }

    update() {
        this.cur += this.speed;
        this.y = this.fixedY + Math.sin(this.cur) * 50;
    }
}