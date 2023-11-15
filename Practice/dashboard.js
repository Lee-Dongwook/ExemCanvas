/*
    Gradient
*/
const buildSizes = (config) => {
    const { count, radiusStart, radiusInc, sizes } = config;
    for (let i = 0; i < count; i++) {
        let rad = radiusStart + radiusInc * (count - i - 1);
        sizes.push(rad);
    }
    return sizes;
};
const buildGradients = (config) => {
    const { dashboardCanvasContext, dashboardCanvasWidth, dashboardCanvasHeight, count, sizes, colors, gradients } = config;
    for (let i = 0; i < count; i++) {
        let rad = sizes[i];
        let gradient;
        if (i < count - 1) {
            gradient = dashboardCanvasContext.createLinearGradient(dashboardCanvasWidth / 2 - rad, dashboardCanvasHeight / 2 - rad, dashboardCanvasWidth / 2 + rad, dashboardCanvasHeight / 2 + rad);
        }
        else {
            gradient = dashboardCanvasContext.createLinearGradient(dashboardCanvasWidth / 2 + rad, dashboardCanvasHeight / 2 - rad, dashboardCanvasWidth / 2 - rad, dashboardCanvasHeight / 2 + rad);
        }
        gradient.addColorStop(0, colors[i][0]);
        gradient.addColorStop(1, colors[i][1]);
        gradients.push(gradient);
    }
    return gradients;
};
const drawGradients = (config) => {
    const { dashboardCanvasContext, dashboardCanvasWidth, dashboardCanvasHeight, count, gradients, radiusStart, radiusInc } = config;
    dashboardCanvasContext.fillStyle = '#fff';
    dashboardCanvasContext.fillRect(0, 0, dashboardCanvasWidth, dashboardCanvasHeight);
    for (let i = 0; i < count; i++) {
        let rad = radiusStart + radiusInc * (count - i - 1);
        dashboardCanvasContext.beginPath();
        dashboardCanvasContext.arc(dashboardCanvasWidth / 2, dashboardCanvasHeight / 2, rad, 0, Math.PI * 2);
        dashboardCanvasContext.fillStyle = gradients[i];
        dashboardCanvasContext.fill();
    }
};
const dashboardCanvasConfig = {
    dashboardCanvas: document.getElementById('dashboardCanvas'),
    dashboardCanvasWidth: 500,
    dashboardCanvasHeight: 500
};
const dashboardGradientConfig = {
    dashboardCanvas: dashboardCanvasConfig.dashboardCanvas,
    dashboardCanvasContext: dashboardCanvasConfig.dashboardCanvas.getContext('2d'),
    dashboardCanvasWidth: dashboardCanvasConfig.dashboardCanvasWidth,
    dashboardCanvasHeight: dashboardCanvasConfig.dashboardCanvasHeight,
    radiusStart: 30,
    radiusInc: 30,
    count: 2,
    sizes: [],
    gradients: [],
    colors: [
        ['#196df3', '#25273d'],
        ['#594ed7', '#7b61ff']
    ],
};
/*
    Animation
*/
const dashboardAnimationConfig = {
    dashboardCanvas: dashboardCanvasConfig.dashboardCanvas,
    dashboardCanvasContext: dashboardCanvasConfig.dashboardCanvas.getContext('2d'),
    dashboardCanvasWidth: dashboardCanvasConfig.dashboardCanvasWidth,
    dashboardCanvasHeight: dashboardCanvasConfig.dashboardCanvasHeight,
    count: 5,
    range: {
        x: 20,
        y: 80
    },
    duration: {
        min: 20,
        max: 40
    },
    thickness: 10,
    strokeColor: '#444',
    level: .35,
    curved: true
};
const dashboardAnimationPoints = [];
class DashboardAnimation {
    anchorX;
    anchorY;
    x;
    y;
    initialX;
    initialY;
    targetX;
    targetY;
    time;
    duration;
    constructor(config) {
        this.anchorX = config.x;
        this.anchorY = config.y;
        this.x = config.x;
        this.y = config.y;
        this.initialX = 0;
        this.initialY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.time = 0;
        this.duration = 0;
        this.setTarget();
    }
    rand(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }
    ease(time, coordinateConfig) {
        const { begin, change, duration } = coordinateConfig;
        if ((time /= duration / 2) < 1)
            return change / 2 * time * time + begin;
        return -change / 2 * ((--time) * (time - 2) - 1) + begin;
    }
    setTarget() {
        this.initialX = this.x;
        this.initialY = this.y;
        this.targetX = this.anchorX + this.rand(0, dashboardAnimationConfig.range.x * 2);
        this.targetY = this.anchorY + this.rand(0, dashboardAnimationConfig.range.y * 2);
        this.time = 0;
        this.duration = this.rand(dashboardAnimationConfig.duration.min, dashboardAnimationConfig.duration.max);
    }
    update() {
        let dx = this.targetX - this.x;
        let dy = this.targetY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (Math.abs(distance) <= 0) {
            this.setTarget();
        }
        else {
            let time = this.time;
            let xCoordinateConfig = {
                begin: this.initialX,
                change: this.targetX - this.initialX,
                duration: this.duration
            };
            let yCoordinateConfig = {
                begin: this.initialY,
                change: this.targetY - this.initialY,
                duration: this.duration
            };
            this.x = this.ease(time, xCoordinateConfig);
            this.y = this.ease(time, yCoordinateConfig);
            this.time++;
        }
    }
    render() {
        dashboardAnimationConfig.dashboardCanvasContext.beginPath();
        dashboardAnimationConfig.dashboardCanvasContext.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
        dashboardAnimationConfig.dashboardCanvasContext.fillStyle = '#000';
        dashboardAnimationConfig.dashboardCanvasContext.fill();
    }
}
const updatePoints = () => {
    dashboardAnimationPoints.forEach((point) => {
        point.update();
    });
};
const renderPoints = () => {
    dashboardAnimationPoints.forEach((point) => {
        point.render();
    });
};
const renderShape = () => {
    dashboardAnimationConfig.dashboardCanvasContext.beginPath();
};
/*
    Complete
*/
const drawDashboard = () => {
    const sizes = buildSizes(dashboardGradientConfig);
    dashboardGradientConfig.sizes = sizes;
    const gradients = buildGradients(dashboardGradientConfig);
    dashboardGradientConfig.gradients = gradients;
    drawGradients(dashboardGradientConfig);
};
