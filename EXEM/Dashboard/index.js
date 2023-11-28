const dashboardCanvas = document.getElementById('dashboardMotion');
const dashboardCanvasContext = dashboardCanvas.getContext('2d');
const dashboardCanvasWidth = dashboardCanvas.width;
const dashboardCanvasHeight = dashboardCanvas.height;

const dashboardConfig = {
    center: {
        x: 300,
        y: 300,
    },
    outerCircle: {
        radius: 250,
        angleStart: 0,
        angleEnd: 2 * Math.PI,
        lineWidth: 50,
        strokeStyle: '#196df3'
    },

    innerCircle: {
        radius: 250,
        angleStart: 0,
        angleEnd: 2 * Math.PI,
        lineWidth: 20,
        fillStyle: '#000'
    },
    wave: {
       data: 25,
    }
};

const buildDashboardInnerCircle = (config) => {
    const {center, innerCircle} = config;

    dashboardCanvasContext.beginPath();
    dashboardCanvasContext.arc(center.x, center.y, innerCircle.radius, innerCircle.angleStart, innerCircle.angleEnd, false);
    dashboardCanvasContext.lineWidth = innerCircle.lineWidth;
    dashboardCanvasContext.fillStyle = innerCircle.fillStyle;
    dashboardCanvasContext.fill();
}

const buildDashboardOuterCircle = (config) => {
    const {center, outerCircle} = config;

    dashboardCanvasContext.beginPath();
    dashboardCanvasContext.arc(center.x, center.y, outerCircle.radius, outerCircle.angleStart, outerCircle.angleEnd, false);
    dashboardCanvasContext.lineWidth = outerCircle.lineWidth;
    dashboardCanvasContext.strokeStyle = outerCircle.strokeStyle;
    dashboardCanvasContext.stroke();
}

class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.05;
        this.cur = index;
    }

    update() {
        this.cur += this.speed;
        this.y = this.fixedY + Math.sin(this.cur) * 20;
    }
}

class Wave {
    constructor(index, totalPoints, color) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth / 2;
        this.centerY = dashboardConfig.center.y + dashboardConfig.outerCircle.radius;

        this.pointGap = (this.stageWidth) / (this.totalPoints - 1);

        this.init();
    }

    init() {
        this.points = [];
        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(
                this.index + i,
                90 + (this.pointGap * i * 0.75),
                this.centerY - dashboardConfig.wave.data * 3.5,
            );
            this.points[i] = point;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for (let i = 1; i < this.totalPoints; i++) {
            if (i < this.totalPoints - 1) {
                this.points[i].update();
            }

            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        ctx.arcTo(this.stageWidth / 2, this.stageHeight - dashboardConfig.wave.data, this.points[0].x, this.points[0].y, 0);
        ctx.fill();
        ctx.closePath();
    }
}

class WaveGroup {
    constructor() {
        this.totalWaves = 3;
        this.totalPoints = 6;

        this.color = ['rgba(0,199,235,0.4)', 'rgba(0,146,199,0.4)', 'rgba(0,87,158,0.4)'];

        this.waves = [];

        for (let i = 0; i < this.totalWaves; i++) {
            const wave = new Wave(
                i,
                this.totalPoints,
                this.color[i],
            );
            this.waves[i] = wave;
        }
    }

    resize(stageWidth, stageHeight) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.resize(stageWidth, stageHeight);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.draw(ctx);
        }
    }
}

class App {
    constructor() {
        this.canvas = document.getElementById('dashboardMotion');
        this.ctx = this.canvas.getContext('2d');
        this.stageWidth = dashboardCanvas.width;
        this.stageHeight = dashboardCanvas.height / 2;

        document.body.appendChild(this.canvas);

        this.waveGroup = new WaveGroup();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;

        this.waveGroup.resize(this.stageWidth, this.stageHeight);
    }

    animate(time) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        buildDashboardInnerCircle(dashboardConfig);
        this.waveGroup.draw(this.ctx);
        buildDashboardOuterCircle(dashboardConfig);
        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}
