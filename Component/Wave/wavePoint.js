class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.05; // Wave의 속도 조절 부분
        this.cur = index; 
    }

    update() {
        this.cur += this.speed;
        this.y = this.fixedY + Math.sin(this.cur) * 20;
    }
}