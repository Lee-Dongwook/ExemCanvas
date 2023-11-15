export interface DashboardCanvasConfig {
    dashboardCanvas: any
    dashboardCanvasWidth: number
    dashboardCanvasHeight: number
}

/*
    Gradient
*/

type DashboardGradientColor = string[]

export interface DashboardGradientConfig extends DashboardCanvasConfig {
    dashboardCanvasContext: any
    radiusStart: number 
    radiusInc: number
    count: number
    sizes: number[]
    gradients: any[]
    colors: DashboardGradientColor[]   
}

/*
    Animation
*/

type DashboardAnimationColor = string

type DashboardAnimationRange = {
    x: number,
    y: number
}

type DashboardAnimationDuration = {
    min: number,
    max: number
}

type DashboardAnimationPointConfig = {
    x: number,
    y: number
}

export interface DashboardAnimationConfig extends DashboardCanvasConfig {
    dashboardCanvasContext: any
    count: number
    range: DashboardAnimationRange
    duration: DashboardAnimationDuration
    thickness: number
    strokeColor: DashboardAnimationColor
    level: number
    curved: boolean
}

export interface DashboardAnimationCoordinateConfig {
    begin: number
    change: number
    duration: number
}

export interface DashboardAnimationPoint {
    anchorX: number
    anchorY: number
    x: number
    y: number
    initialX: number
    initialY: number
    targetX: number
    targetY: number
    time: number
    duration: number
}