import { useEffect } from 'react';
import { drawCircle } from './canvas/drawCircle';
import Canvas from './canvas/canvas';

function App() {
  return (
    <div>
      <Canvas draw={drawCircle} />
      <Canvas draw={drawCircle} />
    </div>
  );
}

export default App;
