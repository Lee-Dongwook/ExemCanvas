import {useEffect} from 'react'
import { drawCircle, type Arc, type Circle } from './drawCircle'

function App() {


  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    if(canvas){
      const ctx = canvas.getContext('2d')
      if(ctx){
        const arc: Arc = {
          x: 100,
          y: 100,
          radius: 20, 
          startAngle: 0,
          endAngle: Math.PI * 2
        }
  
        const fillStyle = 'red'
  
        const draw: Circle = {
          canvas,
          ctx,
          arc,
          fillStyle
        }

        drawCircle(draw)
      }
    }
  }, [])

  return(
    <div>
      <canvas id='canvas'></canvas>
    </div>
  )
}

export default App