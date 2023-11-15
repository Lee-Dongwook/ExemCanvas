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
