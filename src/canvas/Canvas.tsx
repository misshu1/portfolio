import { CanvasHTMLAttributes, DetailedHTMLProps, FC, useEffect } from 'react';
import { useCanvas } from './useCanvas';
import { Draw } from './types';

type CanvasProps = DetailedHTMLProps<
  CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & { draw: Draw };

export const Canvas: FC<CanvasProps> = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);

  const resizeCanvas = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = canvas.getBoundingClientRect();
    if (window.innerWidth !== width || window.innerHeight !== height) {
      const { devicePixelRatio: ratio = 1 } = window;
      const context = canvas.getContext('2d');
      if (!context) return;
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      context.scale(ratio, ratio);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} {...rest} />;
};
