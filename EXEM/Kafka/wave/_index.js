const kafkaCanvas = document.getElementById('wave');
const kafkaCanvasContext = kafkaCanvas.getContext('2d');
const kafkaCanvasWidth = kafkaCanvas.width;
const kafkaCanvasHeight = kafkaCanvas.height;

const kafkaConfig = {
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
}

class App {
    constructor() {
        this.canvas = document.getElementById('wave');
        this.ctx = this.canvas.getContext('2d');
        this.stageWidth = kafkaCanvas.width;
        this.stageHeight = kafkaCanvas.height / 2;

        document.body.appendChild(this.canvas);

        this.waveGroup = new WaveGroup();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;

        this.waveGroup.resize(this.stageWidth - kafkaConfig.innerRect.radius / 2, this.stageHeight);
    }

    animate(time) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        buildKafkaOuterRect(kafkaConfig);
        buildKafkaInnerRect(kafkaConfig);

        this.waveGroup.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}