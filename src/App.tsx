import { useRef } from 'react';
import { Canvas } from './canvas';
import { DrawType, drawings } from './drawings';
import { Footer } from './components';

function App() {
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <>
      <img
        src={drawings[DrawType.FIREFLY].src}
        ref={imgRef}
        style={{ display: 'none' }} // used inside canvas
      />
      <Canvas
        draw={drawings[DrawType.FIREFLY].draw}
        reset={drawings[DrawType.FIREFLY].reset}
        imgRef={imgRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <Footer />
    </>
  );
}

export default App;
