import { useEffect } from 'react';
import { drawCircle, type Arc, type Circle } from './canvas/drawCircle';
import Canvas from './canvas/canvas';

function App() {
  useEffect(() => {
    const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
    if (canvas1) {
      const ctx1 = canvas1.getContext('2d');
      if (ctx1) {
        const arc1: Arc = {
          x: 100,
          y: 100,
          radius: 20,
          startAngle: 0,
          endAngle: Math.PI * 2,
        };

        const fillStyle1 = 'red';

        const draw1: Circle = {
          canvas: canvas1,
          ctx: ctx1,
          arc: arc1,
          fillStyle: fillStyle1,
        };

        drawCircle(draw1);
      }
    }
    const canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;
    if (canvas2) {
      const ctx2 = canvas2.getContext('2d');
      if (ctx2) {
        const arc2: Arc = {
          x: 200,
          y: 200,
          radius: 30,
          startAngle: 0,
          endAngle: Math.PI * 2,
        };

        const fillStyle2 = 'yellow';

        const draw2: Circle = {
          canvas: canvas2,
          ctx: ctx2,
          arc: arc2,
          fillStyle: fillStyle2,
        };

        ctx2.beginPath()
        ctx2.arc
        (
          arc2.x, 
          arc2.y, 
          arc2.radius, 
          arc2.startAngle, 
          arc2.endAngle, 
          arc2.clockwise
        )

        ctx2.fillStyle = fillStyle2
        ctx2.fill()
        ctx2.closePath()
      }
    }
  }, []);

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }

  return (
    <div>
      <canvas id='canvas1'></canvas>
      <Canvas draw={draw} />
      <canvas id='canvas2'></canvas>
    </div>
  );
}

export default App;
