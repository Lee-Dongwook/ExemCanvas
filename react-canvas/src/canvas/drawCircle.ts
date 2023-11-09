interface Circle {
    ctx: CanvasRenderingContext2D
    frameCount: number
}

export const drawCircle = (ctx, frameCount = 11) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
}