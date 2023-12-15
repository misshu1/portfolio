import { DrawType, Drawings } from './types';
import fireflyBG from '../assets/autumn.jpg';
import bg from '../assets/bg.svg';
import { drawFireflies, resetFireflies } from './fireflies';
import { drawBackground, resetBackground } from './background';

export const drawings: Drawings = {
  [DrawType.FIREFLY]: {
    draw: (ctx, imgRef) => drawBackground(ctx, imgRef),
    reset: (ctx) => resetBackground(ctx),
    src: bg,
  },
  [DrawType.FIREFLY_DARK]: {
    draw: (ctx, imgRef) => drawFireflies(ctx, imgRef),
    reset: resetFireflies,
    src: fireflyBG,
  },
};
