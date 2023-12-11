import { Drawings } from './types';
import BG from '../assets/ww11.png';

const fireflies: Firefly[] = [];
class Firefly {
  x: number;
  y: number;
  s: number;
  ang: number;
  v: number;
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.x = Math.random() * ctx.canvas.width;
    this.y = Math.random() * ctx.canvas.height;
    this.s = Math.random() * 2;
    this.ang = Math.random() * 2 * Math.PI;
    this.v = (this.s * this.s) / 4;
  }
  move() {
    this.x += this.v * Math.cos(this.ang);
    this.y += this.v * Math.sin(this.ang);
    this.ang += (Math.random() * 20 * Math.PI) / 180 - (10 * Math.PI) / 180;
  }
  show() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.s, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#fddba3';
    this.ctx.fill();
  }
}

export const drawings: Drawings = {
  drawFireflies: (ctx) => {
    ctx.fillStyle = 'rgba(30,30,30,1)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    };
    img.src = BG;

    if (fireflies.length < 100) {
      for (let j = 0; j < 10; j++) {
        fireflies.push(new Firefly(ctx));
      }
    }
    //animation
    for (let i = 0; i < fireflies.length; i++) {
      fireflies[i].move();
      fireflies[i].show();
      if (
        fireflies[i].x < 0 ||
        fireflies[i].x > ctx.canvas.width ||
        fireflies[i].y < 0 ||
        fireflies[i].y > ctx.canvas.height
      ) {
        fireflies.splice(i, 1);
      }
    }
  },
};
