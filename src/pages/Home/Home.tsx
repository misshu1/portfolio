import { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DrawType, drawings } from '../../drawings';
import { Canvas } from '../../canvas';
import { Footer } from '../../components';
import { HomeStyle, NestedRoutesContainer } from './Home.style';
import { Routes } from '../../router';

export const Home = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const location = useLocation();

  return (
    <HomeStyle src={drawings[DrawType.FIREFLY].src}>
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
        options={{ fps: 1 }}
      />
      {location.pathname !== Routes.HOME && (
        <NestedRoutesContainer>
          <Outlet />
        </NestedRoutesContainer>
      )}
      <Footer />
    </HomeStyle>
  );
};
