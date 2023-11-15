"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Gradient
*/
var buildSizes = function (config) {
    var count = config.count, radiusStart = config.radiusStart, radiusInc = config.radiusInc, sizes = config.sizes;
    for (var i = 0; i < count; i++) {
        var rad = radiusStart + radiusInc * (count - i - 1);
        sizes.push(rad);
    }
    return sizes;
};
var buildGradients = function (config) {
    var sizes = buildSizes(config);
    config.sizes = sizes;
    var count = config.count, dashboardCanvasContext = config.dashboardCanvasContext, dashboardCanvasWidth = config.dashboardCanvasWidth, dashboardCanvasHeight = config.dashboardCanvasHeight, colors = config.colors, gradients = config.gradients;
    for (var i = 0; i < count; i++) {
        var rad = sizes[i];
        var gradient = void 0;
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
var drawGradients = function (config) {
    var gradients = buildGradients(config);
    config.gradients = gradients;
    var dashboardCanvasContext = config.dashboardCanvasContext, dashboardCanvasWidth = config.dashboardCanvasWidth, dashboardCanvasHeight = config.dashboardCanvasHeight, count = config.count, radiusStart = config.radiusStart, radiusInc = config.radiusInc;
    dashboardCanvasContext.fillStyle = '#fff';
    dashboardCanvasContext.fillRect(0, 0, dashboardCanvasWidth, dashboardCanvasHeight);
    for (var i = 0; i < count; i++) {
        var rad = radiusStart + radiusInc * (count - i - 1);
        dashboardCanvasContext.beginPath();
        dashboardCanvasContext.arc(dashboardCanvasWidth / 2, dashboardCanvasHeight / 2, rad, 0, Math.PI * 2);
        dashboardCanvasContext.fillStyle = gradients[i];
        dashboardCanvasContext.fill();
    }
};
var dashboardCanvasConfig = {
    dashboardCanvas: document.getElementById('gradient'),
    dashboardCanvasWidth: 500,
    dashboardCanvasHeight: 500
};
var dashboardGradientConfig = {
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
var dashboardAnimationConfig = {
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
var dashboardAnimationPoints = [];
var DashboardAnimation = /** @class */ (function () {
    function DashboardAnimation(config) {
        this.anchorX = config.x;
        this.anchorY = config.y;
        this.x = config.x;
        this.y = config.y;
        this.setTarget();
    }
    DashboardAnimation.prototype.rand = function (min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    };
    DashboardAnimation.prototype.ease = function (time, coordinateConfig) {
        var begin = coordinateConfig.begin, change = coordinateConfig.change, duration = coordinateConfig.duration;
        if ((time /= duration / 2) < 1)
            return change / 2 * time * time + begin;
        return -change / 2 * ((--time) * (time - 2) - 1) + begin;
    };
    DashboardAnimation.prototype.setTarget = function () {
        this.initialX = this.x;
        this.initialY = this.y;
        this.targetX = this.anchorX + this.rand(0, dashboardAnimationConfig.range.x * 2);
        this.targetY = this.anchorY + this.rand(0, dashboardAnimationConfig.range.y * 2);
        this.time = 0;
        this.duration = this.rand(dashboardAnimationConfig.duration.min, dashboardAnimationConfig.duration.max);
    };
    DashboardAnimation.prototype.update = function () {
        var dx = this.targetX - this.x;
        var dy = this.targetY - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (Math.abs(distance) <= 0) {
            this.setTarget();
        }
        else {
            var time = this.time;
            var xCoordinateConfig = {
                begin: this.initialX,
                change: this.targetX - this.initialX,
                duration: this.duration
            };
            var yCoordinateConfig = {
                begin: this.initialY,
                change: this.targetY - this.initialY,
                duration: this.duration
            };
            this.x = this.ease(time, xCoordinateConfig);
            this.y = this.ease(time, yCoordinateConfig);
            this.time++;
        }
    };
    DashboardAnimation.prototype.render = function () {
        dashboardAnimationConfig.dashboardCanvasContext.beginPath();
        dashboardAnimationConfig.dashboardCanvasContext.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
        dashboardAnimationConfig.dashboardCanvasContext.fillStyle = '#000';
        dashboardAnimationConfig.dashboardCanvasContext.fill();
    };
    return DashboardAnimation;
}());
var updatePoints = function () {
    dashboardAnimationPoints.forEach(function (point) {
        point.update();
    });
};
var renderPoints = function () {
    dashboardAnimationPoints.forEach(function (point) {
        point.render();
    });
};
var renderShape = function () {
    dashboardAnimationConfig.dashboardCanvasContext.beginPath();
};
