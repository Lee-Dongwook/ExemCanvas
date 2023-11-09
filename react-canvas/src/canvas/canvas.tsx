import React, { useRef, useEffect } from 'react'

const Canvas = (props: { [x: string]: any; draw: any }) => {
  
  const { draw, ...rest } = props
  const canvasRef = useRef(null)
  
  useEffect(() => {
    
    const canvas = canvasRef.current as unknown as HTMLCanvasElement
    if(canvas){
        const context = canvas.getContext('2d')
        const render = () => {
          draw(context)
        }
        render()
    }
  }, [draw])
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas