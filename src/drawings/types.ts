export type DrawFunc = (
  ctx: CanvasRenderingContext2D,
  imgRef?: React.RefObject<HTMLImageElement>,
  frameCount?: number
) => void;

export type Drawings = Record<
  (typeof DrawType)[keyof typeof DrawType],
  {
    draw: DrawFunc;
    src: string;
    reset?: () => void;
  }
>;

export const DrawType = {
  FIREFLY: 'FIREFLY',
} as const;
