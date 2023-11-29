const rectWaveCanvas = document.getElementById('rectWave');
const rectWaveCanvasContext = rectWaveCanvas.getContext('2d');
const rectWaveCanvasWidth = rectWaveCanvas.width;
const rectWaveCanvasHeight = rectWaveCanvas.height;

const rectWaveConfig = {
    center: {
      x: 0,
      y: 0,
    },
    
    outerRect: {
      width: 500,
      height: 500,
      radius: 10,
      lineWidth: 30,
      lineJoin: 'round',
      strokeStyle: '#7ab3f7'
    },

   innerRect: {
      width: 500,
      height: 500,
      radius: 10,
      fillStyle: '#000'
   },

   wave: {
     data: 70
   }
}

const buildInnerRect = (config) => {
    const { center, innerRect } = config;

    rectWaveCanvasContext.fillStyle = innerRect.fillStyle;
    rectWaveCanvasContext.fillRect(
        center.x + (innerRect.radius / 2),
        center.y + (innerRect.radius / 2),
        innerRect.width - innerRect.radius,
        innerRect.height - innerRect.radius
    );
}

const buildOuterRect = (config) => {
    const { center, outerRect } = config;

    rectWaveCanvasContext.beginPath();
    rectWaveCanvasContext.lineWidth = outerRect.lineWidth;
    rectWaveCanvasContext.lineJoin = outerRect.lineJoin;
    rectWaveCanvasContext.strokeStyle = outerRect.strokeStyle;
    rectWaveCanvasContext.strokeRect(
        center.x + (outerRect.radius / 2),
        center.y + (outerRect.radius / 2),
        outerRect.width - outerRect.radius,
        outerRect.height - outerRect.radius
    );
    rectWaveCanvasContext.stroke();
}

// Kafka Wave

class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.02 * (rectWaveConfig.wave.data / 10);
        this.cur = index; 
    }

    update() {
        this.cur += this.speed;
        this.y = this.fixedY + Math.sin(this.cur) * 45;
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
        this.centerY = stageHeight;
        this.pointGap = this.stageWidth / (this.totalPoints - 1);
        this.init();
    }

    init() {
        this.points = [];
        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(
                this.index + i,
                this.pointGap * i,
                this.centerY - rectWaveConfig.wave.data * 4.5,
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

        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
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
        this.canvas = rectWaveCanvas;
        this.ctx = this.canvas.getContext('2d');
        this.stageWidth = rectWaveCanvas.width;
        this.stageHeight = rectWaveCanvas.height / 2;

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
        buildInnerRect(rectWaveConfig);
        this.waveGroup.draw(this.ctx);
        buildOuterRect(rectWaveConfig);
        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}