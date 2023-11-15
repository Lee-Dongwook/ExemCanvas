type DashboardGradientColor = string[]
type DashboardAnimationColor = string
type DashboardAnimationRange = {
    x: number,
    y: number
}
type DashboardAnimationDuration = {
    min: number,
    max: number
}

interface DashboardCanvasConfig {
    dashboardCanvas: any
    dashboardCanvasWidth: number
    dashboardCanvasHeight: number
}

interface DashboardGradientConfig extends DashboardCanvasConfig {
    dashboardCanvasContext: any
    radiusStart: number 
    radiusInc: number
    count: number
    sizes: number[]
    gradients: any[]
    colors: DashboardGradientColor[]   
}

interface DashboardAnimationConfig extends DashboardCanvasConfig {
    dashboardCanvasContext: any
    count: number
    range: DashboardAnimationRange
    duration: DashboardAnimationDuration
    thickness: number
    strokeColor: DashboardAnimationColor
    level: number
    curved: boolean
}


const dashboardCanvasConfig: DashboardCanvasConfig = {
    dashboardCanvas: document.getElementById('gradient') as HTMLCanvasElement,
    dashboardCanvasWidth: 500,
    dashboardCanvasHeight: 500
}

const dashboardGradientConfig: DashboardGradientConfig = {
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
}

const buildSizes = (config: DashboardGradientConfig): number[] => {

    const {count, radiusStart, radiusInc, sizes} = config;

    for(let i = 0; i < count; i++) {
        let rad = radiusStart + radiusInc * (count - i - 1);
        sizes.push(rad)
    }
    return sizes
};

const buildGradients = (config: DashboardGradientConfig): any[] => {
    
    const sizes = buildSizes(config);
    config.sizes = sizes;

    const { count, dashboardCanvasContext, dashboardCanvasWidth, dashboardCanvasHeight, colors, gradients } = config
    
    for (let i = 0; i < count; i++) {
        let rad = sizes[i];
        let gradient; 

        if(i < count - 1) {
            gradient =  dashboardCanvasContext.createLinearGradient(
                dashboardCanvasWidth / 2 - rad,
                dashboardCanvasHeight / 2 - rad,
                dashboardCanvasWidth / 2 + rad,
                dashboardCanvasHeight / 2 + rad
            )
        } else {
            gradient = dashboardCanvasContext.createLinearGradient(
                dashboardCanvasWidth / 2 + rad,
                dashboardCanvasHeight / 2 - rad,
                dashboardCanvasWidth / 2 - rad,
                dashboardCanvasHeight / 2 + rad
            )
        }

        gradient.addColorStop(0, colors[i][0]);
        gradient.addColorStop(1, colors[i][1]);
        gradients.push(gradient);
    }

    return gradients;
}

const drawGradients = (config: DashboardGradientConfig): void => {

    const gradients = buildGradients(config);
    config.gradients = gradients;

    const {dashboardCanvasContext, dashboardCanvasWidth, dashboardCanvasHeight, count , radiusStart, radiusInc} = config

    dashboardCanvasContext.fillStyle = '#fff';
    dashboardCanvasContext.fillRect(0, 0, dashboardCanvasWidth, dashboardCanvasHeight);


    for(let i = 0; i < count; i++) {
        let rad = radiusStart + radiusInc * (count - i - 1);
        dashboardCanvasContext.beginPath();
        dashboardCanvasContext.arc(dashboardCanvasWidth / 2, dashboardCanvasHeight / 2, rad, 0 , Math.PI * 2);
        dashboardCanvasContext.fillStyle = gradients[i];
        dashboardCanvasContext.fill();
    }
}
