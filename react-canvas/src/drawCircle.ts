export interface Arc {
    x: number
    y: number
    radius: number
    startAngle: number
    endAngle: number
    clockwise?: boolean
}

export interface Circle {
    canvas: HTMLCanvasElement | null
    ctx: CanvasRenderingContext2D
    arc: Arc
    fillStyle: string
}


export const drawCircle = ({
    canvas,
    ctx,
    arc,
    fillStyle
}:Circle): void => {
    if(canvas){
        canvas.width = canvas.width
        canvas.height = canvas.height
        ctx.beginPath();
        ctx.arc(arc.x, arc.y, arc.radius, arc.startAngle, arc.endAngle, arc.clockwise);
        ctx.fillStyle = fillStyle;
        ctx.fill();
        ctx.closePath();
    }
    else {
        throw new Error("Canvas element is null")
    }
}