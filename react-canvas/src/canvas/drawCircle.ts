const drawCircle = ({ctx, frameCount = 11, fillStyle}) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = fillStyle
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
}

export const drawDoubleCircle = (ctx) => {
    drawCircle({ctx,frameCount: 11, fillStyle: '#000000'})
    drawCircle({ctx,frameCount: 20, fillStyle: '#EEEEEE'})
}