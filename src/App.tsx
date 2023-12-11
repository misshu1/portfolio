import { Canvas } from './canvas/Canvas';
import { drawings } from './canvas/drawings';

function App() {
  const { drawFireflies } = drawings;

  return (
    <>
      <Canvas
        draw={drawFireflies}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
}

export default App;
