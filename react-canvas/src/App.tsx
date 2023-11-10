import { useEffect } from 'react';
import { drawDoubleCircle } from './canvas/drawCircle';
import Canvas from './canvas/canvas';

function App() {
  return (
    <div id ="stage">
      <Canvas draw={drawDoubleCircle} id="outer-layer" />
    </div>
  );
}

export default App;
