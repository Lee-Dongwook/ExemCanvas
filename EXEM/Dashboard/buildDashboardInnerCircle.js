const buildDashboardInnerCircle = (config) => {
    const {center, innerCircle} = config;

    dashboardCanvasContext.beginPath();
    dashboardCanvasContext.arc(center.x, center.y, innerCircle.radius, innerCircle.angleStart, innerCircle.angleEnd, false);
    dashboardCanvasContext.lineWidth = innerCircle.lineWidth;
    dashboardCanvasContext.fillStyle = innerCircle.fillStyle;
    dashboardCanvasContext.fill();
}