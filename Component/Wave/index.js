const waveCanvas = document.getElementById('wave');
const waveCanvasContext = waveCanvas.getContext('2d');

const waveCanvasWidth = waveCanvas.width;
const waveCanvasHeight = waveCanvas.height;

// const kafkaConfig = {
//     center: {
//         x: 0,
//         y: 0,
//     },
//     outerRect: {
//         width: 500,
//         height: 500,
//         radius: 0,
//         lineWidth: 15,
//         lineJoin: 'round',
//         strokeStyle: '#7ab3f7'
//     },
//     innerRect: {
//         width: 500,
//         height: 500,
//         radius: 10,
//         fillStyle: '#000'
//     },
// }

// const buildKafkaOuterRect = (config) => {
//     const { center, outerRect } = config;

//     waveCanvasContext.beginPath();
//     waveCanvasContext.lineWidth = outerRect.lineWidth;
//     waveCanvasContext.lineJoin = outerRect.lineJoin;
//     waveCanvasContext.strokeStyle = outerRect.strokeStyle;
//     waveCanvasContext.strokeRect(
//         center.x + (outerRect.radius / 2),
//         center.y + (outerRect.radius / 2),
//         outerRect.width - outerRect.radius,
//         outerRect.height - outerRect.radius
//     );
//     waveCanvasContext.stroke();
// }

// const buildKafkaInnerRect = (config) => {
//     const { center, innerRect } = config;

//     waveCanvasContext.fillStyle = innerRect.fillStyle;
//     waveCanvasContext.fillRect(
//         center.x + (innerRect.radius / 2),
//         center.y + (innerRect.radius / 2),
//         innerRect.width - innerRect.radius,
//         innerRect.height - innerRect.radius
//     );
// }

class App {
    constructor() {
        this.canvas = document.getElementById('wave');
        this.ctx = this.canvas.getContext('2d');
        this.stageWidth = waveCanvas.width;
        this.stageHeight = waveCanvas.height / 2;

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

        // buildKafkaOuterRect(kafkaConfig);
        // buildKafkaInnerRect(kafkaConfig);

        this.waveGroup.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}