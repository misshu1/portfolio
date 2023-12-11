export type Draw = (ctx: CanvasRenderingContext2D, frameCount: number) => void;
export type Drawings = { [key: string]: Draw };
