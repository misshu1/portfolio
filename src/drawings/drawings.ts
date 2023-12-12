import { DrawType, Drawings } from './types';
import fireflyBG from '../assets/autumn.jpg';
import { drawFireflies, resetFireflies } from './fireflies';

export const drawings: Drawings = {
  [DrawType.FIREFLY]: {
    draw: (ctx, imgRef) => drawFireflies(ctx, imgRef),
    reset: resetFireflies,
    src: fireflyBG,
  },
};
