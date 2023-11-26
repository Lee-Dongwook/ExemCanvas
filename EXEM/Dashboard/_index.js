const dashboardCanvas = document.getElementById('dashboardMotion');
const dashboardCanvasContext = dashboardCanvas.getContext('2d');
const dashboardCanvasWidth = dashboardCanvas.width;
const dashboardCanvasHeight = dashboardCanvas.height;

const dashboardConfig = {
    center: {
        x: 250,
        y: 250,
    },
    outerCircle: {
        radius: 200,
        angleStart: 0,
        angleEnd: 2 * Math.PI,
        lineWidth: 50,
        strokeStyle: '#196df3'
    },

    innerCircle: {
        radius: 200,
        angleStart: 0,
        angleEnd: 2 * Math.PI,
        lineWidth: 10,
        fillStyle: '#000'
    }
};

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

        buildDashboardOuterCircle(dashboardConfig);
        buildDashboardInnerCircle(dashboardConfig);

        this.waveGroup.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}
