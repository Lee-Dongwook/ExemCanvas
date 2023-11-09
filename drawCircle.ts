interface Arc {
    x: number
    y: number
    radius: number
    startAngle: number
    endAngle: number
    clockwise?: boolean
}

interface Circle {
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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