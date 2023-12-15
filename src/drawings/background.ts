import { RefObject } from 'react';
import { DrawFunc } from '.';

class Cell {
  #effect: Effect;
  #x: number;
  #y: number;
  #width: number;
  #height: number;
  #cellWidth: number;
  #cellHeight: number;
  #imgRef?: RefObject<HTMLImageElement>;
  #cellId: string;

  constructor(
    effect: Effect,
    x: number,
    y: number,
    cellWidth: number,
    cellHeight: number
  ) {
    this.#effect = effect;
    this.#x = x;
    this.#y = y;
    this.#cellWidth = cellWidth;
    this.#cellHeight = cellHeight;
    this.#width = this.#effect.cellWidth;
    this.#height = this.#effect.cellHeight;
    this.#imgRef = this.#effect.imgRef;
    this.#cellId = `${this.#x}_${this.#y}`;
  }

  getCellId(): string {
    return this.#cellId;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.#imgRef?.current) {
      //   ctx.globalAlpha = 1;

      //   ctx.fillStyle = '#16192e';
      //   ctx.fillRect(150, 300, this.#width, this.#height);

      //   ctx.drawImage(
      //     this.#imgRef.current,
      //     this.#x,
      //     this.#y,
      //     this.#width,
      //     this.#height
      //   );

      ctx.drawImage(
        this.#imgRef.current,
        (this.#x / this.#cellWidth) % 2 === 0 ? 0 : 25,
        (this.#y / this.#cellHeight) % 2 === 0 ? 0 : 25,
        this.#width,
        this.#height,
        this.#x,
        this.#y,
        this.#width,
        this.#height
      );
    }
  }
}

class Effect {
  #ctx: CanvasRenderingContext2D;
  #width: number;
  #height: number;
  #imageGrid: Cell[] = [];
  #timeouts: number[] = [];
  #colors = ['red', 'orange', 'blue', 'yellow', 'coral', 'pink'];
  cellWidth: number;
  cellHeight: number;
  imgRef?: RefObject<HTMLImageElement>;

  static #initialized = false;
  static #mouseMoveEvent: (e: MouseEvent) => void;

  constructor(
    ctx: CanvasRenderingContext2D,
    imgRef?: RefObject<HTMLImageElement>
  ) {
    this.#ctx = ctx;
    this.#width = this.#ctx.canvas.width;
    this.#height = this.#ctx.canvas.height;
    this.cellWidth = 25;
    this.cellHeight = 25;
    this.#imageGrid = [];
    this.imgRef = imgRef;
    if (!Effect.#initialized) {
      this.#createGrid();
      Effect.#mouseMoveEvent = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        for (let index = 0; index < this.#imageGrid.length; index++) {
          const cell = this.#imageGrid[index];
          const [x, y] = cell.getCellId().split('_');
          const dx = e.x - +x;
          const dy = e.y - +y;
          const distance = Math.hypot(dx, dy);
          if (distance < 25) {
            const random = Math.floor(Math.random() * 6) + 1;
            ctx.fillStyle = this.#colors[random];
            ctx.fillRect(+x, +y, this.cellWidth, this.cellHeight);
            this.#timeouts.push(
              setTimeout(() => {
                ctx.clearRect(+x, +y, this.cellWidth, this.cellHeight);
                cell.draw(ctx);
              }, 300)
            );
            break;
          }
        }
      };
      this.#ctx.canvas.addEventListener('mousemove', Effect.#mouseMoveEvent);
      Effect.#initialized = true;
    }
  }

  #createGrid() {
    for (let y = 0; y < this.#height; y += this.cellHeight) {
      for (let x = 0; x < this.#width; x += this.cellWidth) {
        this.#imageGrid.push(
          new Cell(this, x, y, this.cellWidth, this.cellHeight)
        );
      }
    }
  }

  reset() {
    Effect.#initialized = false;
    this.#ctx.canvas.removeEventListener('mousemove', Effect.#mouseMoveEvent);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.#imageGrid.forEach((cell) => {
      cell.draw(ctx);
    });
    this.#timeouts.forEach((time) => clearTimeout(time));
  }
}

export const drawBackground: DrawFunc = (ctx, imgRef) => {
  const effect = new Effect(ctx, imgRef);
  effect.render(ctx);
};

export const resetBackground = (ctx: CanvasRenderingContext2D) => {
  const effect = new Effect(ctx);
  effect.reset();
};
