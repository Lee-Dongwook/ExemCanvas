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
var buildSizes = function (_a) {
    var count = _a.count, radiusStart = _a.radiusStart, radiusInc = _a.radiusInc, sizes = _a.sizes;
    for (var i = 0; i < count; i++) {
        var rad = radiusStart + radiusInc * (count - i - 1);
        sizes.push(rad);
    }
    return sizes;
};
var buildGradients = function (dashboardCanvasConfig, _a) {
    var dashboardCanvasContext = _a.dashboardCanvasContext, dashboardCanvasWidth = _a.dashboardCanvasWidth, dashboardCanvasHeight = _a.dashboardCanvasHeight, count = _a.count, colors = _a.colors, gradients = _a.gradients;
    var sizes = buildSizes(dashboardCanvasConfig);
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
var drawGradients = function (_a) {
    var dashboardCanvasContext = _a.dashboardCanvasContext, dashboardCanvasWidth = _a.dashboardCanvasWidth, dashboardCanvasHeight = _a.dashboardCanvasHeight, count = _a.count, radiusStart = _a.radiusStart, radiusInc = _a.radiusInc;
    dashboardCanvasContext.fillStyle = '#fff';
    dashboardCanvasContext.fillRect(0, 0, dashboardCanvasWidth, dashboardCanvasHeight);
    var gradients = buildGradients();
    for (var i = 0; i < count; i++) {
        var rad = radiusStart + radiusInc * (count - i - 1);
        dashboardCanvasContext.beginPath();
        dashboardCanvasContext.arc(dashboardCanvasWidth / 2, dashboardCanvasHeight / 2, rad, 0, Math.PI * 2);
        dashboardCanvasContext.fillStyle = gradients[i];
        dashboardCanvasContext.fill();
    }
};
