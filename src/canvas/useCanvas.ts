import { useRef, useEffect, RefObject } from 'react';
import { DrawFunc } from '../drawings';
import { scaleCanvas } from './utils';

export type CanvasOptions = {
  fps: number;
  context: '2d'; // Add more if needed
};

type UseCanvasProps = {
  draw: DrawFunc;
  imgRef?: RefObject<HTMLImageElement>;
  reset?: () => void;
  options?: Partial<CanvasOptions>;
};

const defaultOptions: CanvasOptions = {
  fps: 60,
  context: '2d',
};

export const useCanvas = ({ draw, imgRef, reset, options }: UseCanvasProps) => {
  const canvasOptions = useRef({ ...defaultOptions, ...options });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const resizeTimeOut = useRef<number | undefined>();
  const lastTime = useRef<number>(0);
  const nextFrame = useRef<number>(1000 / canvasOptions.current.fps);
  const timer = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext(canvasOptions.current.context);
    if (!context) return;
    scaleCanvas(canvas, context, window.innerWidth, window.innerHeight);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext(canvasOptions.current.context);
    if (!context) return;
    let frameCount = 0;
    let animationFrameId: number;

    const animate = (timeStamp: number) => {
      const deltaTime = timeStamp - lastTime.current;
      lastTime.current = timeStamp;
      if (timer.current > nextFrame.current) {
        frameCount++;
        draw(context, imgRef, frameCount);
      } else {
        timer.current += deltaTime;
      }
      animationFrameId = window.requestAnimationFrame(animate);
    };
    animate(0);

    const handleResize = () => {
      scaleCanvas(canvas, context, window.innerWidth, window.innerHeight);
      if (reset) {
        clearTimeout(resizeTimeOut.current);
        resizeTimeOut.current = setTimeout(function () {
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
