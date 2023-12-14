import { CanvasHTMLAttributes, DetailedHTMLProps, FC, RefObject } from 'react';
import { CanvasOptions, useCanvas } from './useCanvas';
import { DrawFunc } from '../drawings';

type CanvasProps = DetailedHTMLProps<
  CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {
  draw: DrawFunc;
  imgRef?: RefObject<HTMLImageElement>;
  reset?: () => void;
  options?: Partial<CanvasOptions>;
};

export const Canvas: FC<CanvasProps> = (props) => {
  const { draw, reset, imgRef, options, ...rest } = props;
  const canvasRef = useCanvas({ draw, imgRef, reset, options });

  return <canvas ref={canvasRef} {...rest} />;
};
