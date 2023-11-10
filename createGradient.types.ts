export interface AddColorStop {
    offset: number,
    color: string
}

interface Coordinate {
    startX: number
    startY: number
    endX: number
    endY: number
}

export interface Gradient {
    context: CanvasRenderingContext2D | null,
    gradientId: string,
    coordinate: Coordinate
}