const circleCanvas = document.getElementById('circle');
const circleCanvasContext = circleCanvas.getContext('2d');

const circleCanvasWidth = circleCanvas.width;
const circleCanvasHeight = circleCanvas.height;

const innerCircleConfig = {
    centerX: 250,
    centerY: 250,
    radius: 200,
    angleStart: 0,
    angleEnd: 2 * Math.PI,
    lineWidth: 10,
    fillStyle: '#000',
    gradient: {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        colorSet : [{
           offset: 0,
           color: '#FFFFFF'
        }, {
           offset: 1,
           color: '#EEEEEE'
        }]       
    }
}

const outerCircleConfig = {
    centerX: 250,
    centerY: 250,
    radius: 200,
    angleStart: 0,
    angleEnd: 2 * Math.PI,
    lineWidth: 50,
    strokeStyle: '#196df3',
}

class App {
    constructor(){
        this.canvas = circleCanvas;
        this.ctx = circleCanvasContext;
        this.stageWidth = circleCanvasWidth;
        this.stageHeight = circleCanvasHeight;

        document.body.appendChild(this.canvas);

        this.innerCircle = new InnerCircle(innerCircleConfig);
        this.outerCircle = new OuterCircle(outerCircleConfig);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        if(innerCircleConfig.gradient) {
            const gradientObject = new Gradient(innerCircleConfig);
            const gradient = gradientObject.createGradient(this.ctx);
            innerCircleConfig.fillStyle = gradient;
        }

        if(outerCircleConfig.gradient) {
            const gradientObject = new Gradient(outerCircleConfig);
            const gradient = gradientObject.createGradient(this.ctx);
            outerCircleConfig.fillStyle = gradient;
        }

        this.innerCircle.draw(this.ctx);
        this.outerCircle.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}