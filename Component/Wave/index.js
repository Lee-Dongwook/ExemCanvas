const waveCanvas = document.getElementById('wave');
const waveCanvasContext = waveCanvas.getContext('2d');

const waveCanvasWidth = waveCanvas.width;
const waveCanvasHeight = waveCanvas.height;

const waveGroupConfig = {
    totalWaves: 3,
    totalPoints: 6,
    waves: [],
    color: ['rgba(0,199,235,0.4)', 'rgba(0,146,199,0.4)', 'rgba(0,87,158,0.4)']
}

class App {
    constructor() {
        this.canvas = waveCanvas;
        this.ctx = waveCanvasContext;
        this.stageWidth = waveCanvas.width;
        this.stageHeight = waveCanvas.height / 2;

        document.body.appendChild(this.canvas);

        this.waveGroup = new WaveGroup(waveGroupConfig);

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
        this.waveGroup.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}