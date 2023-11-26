const buildDashboardOuterCircle = (config) => {
    const {center, outerCircle} = config;

    dashboardCanvasContext.beginPath();
    dashboardCanvasContext.arc(center.x, center.y, outerCircle.radius, outerCircle.angleStart, outerCircle.angleEnd, false);
    dashboardCanvasContext.lineWidth = outerCircle.lineWidth;
    dashboardCanvasContext.strokeStyle = outerCircle.strokeStyle;
    dashboardCanvasContext.stroke();
}
