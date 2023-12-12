export type DrawFunc = (
  ctx: CanvasRenderingContext2D,
  imgRef?: React.RefObject<HTMLImageElement>,
  frameCount?: number
) => void;

export type Drawings = {
  [key: string]: {
    draw: DrawFunc;
    src: string;
    reset?: () => void;
  };
};

export const DrawType = {
  FIREFLY: 'FIREFLY',
} as const;
