import { CanvasHTMLAttributes, DetailedHTMLProps, FC, RefObject } from 'react';
import { useCanvas } from './useCanvas';
import { DrawFunc } from '../drawings';

type CanvasProps = DetailedHTMLProps<
  CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & { draw: DrawFunc; imgRef: RefObject<HTMLImageElement>; reset?: () => void };

export const Canvas: FC<CanvasProps> = (props) => {
  const { draw, reset, imgRef, ...rest } = props;
  const canvasRef = useCanvas(draw, imgRef, reset);

  return <canvas ref={canvasRef} {...rest} />;
};
