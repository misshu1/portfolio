import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { DrawType, drawings } from '../../drawings';
import { Canvas } from '../../canvas';
import { Footer } from '../../components';

export const Home = () => {
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
      <Outlet />
      <Footer />
    </>
  );
};