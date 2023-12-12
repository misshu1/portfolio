import { useRef, useEffect, RefObject } from 'react';
import { DrawFunc } from '../drawings';
import { scaleCanvas } from './utils';

export const useCanvas = (
  draw: DrawFunc,
  imgRef: RefObject<HTMLImageElement>,
  reset?: () => void
) => {
  const resezeTime = useRef<number | undefined>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    scaleCanvas(canvas, context, window.innerWidth, window.innerHeight);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      frameCount++;
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      draw(context, imgRef, frameCount);

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      scaleCanvas(canvas, context, window.innerWidth, window.innerHeight);
      if (reset) {
        clearTimeout(resezeTime.current);
        resezeTime.current = setTimeout(function () {
          reset();
        }, 200);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [draw, imgRef, reset]);

  return canvasRef;
};
