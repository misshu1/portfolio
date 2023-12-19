import { RefObject } from 'react';
import { DrawFunc } from './types';

class Cell {
  #effect: Effect;
  #x: number;
  #y: number;
  #width: number;
  #height: number;
  #imgRef?: RefObject<HTMLImageElement>;
  #cellId: string;
  #colors = ['#FFB067', '#057DCD', '#76B947'];
  #currentCellColor: string = '';
  #cellPadding: number = 2;
  #cellSize: number;
  #cellSizeWithPadding: number;

  constructor(effect: Effect, x: number, y: number, cellSize: number) {
    this.#effect = effect;
    this.#x = x;
    this.#y = y;
    this.#width = this.#effect.cellSize;
    this.#height = this.#effect.cellSize;
    this.#cellSize = cellSize;
    this.#cellSizeWithPadding = this.#effect.cellSize - this.#cellPadding * 2;
    this.#imgRef = this.#effect.imgRef;
    this.#cellId = `${this.#x}_${this.#y}`;
  }

  getCellId(): string {
    return this.#cellId;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.#imgRef?.current) {
      ctx.drawImage(
        this.#imgRef.current,
        (this.#x / this.#cellSize) % 2 === 0 ? 0 : 25,
        (this.#y / this.#cellSize) % 2 === 0 ? 0 : 25,
        this.#width,
        this.#height,
        this.#x,
        this.#y,
        this.#width,
        this.#height
      );
    }
  }

  drawCellColor(ctx: CanvasRenderingContext2D) {
    const random = Math.floor(Math.random() * this.#colors.length);
    this.#currentCellColor = this.#colors[random];
    ctx.fillStyle = this.#currentCellColor;
    ctx.fillRect(
      this.#x + this.#cellPadding,
      this.#y + this.#cellPadding,
      this.#cellSizeWithPadding,
      this.#cellSizeWithPadding
    );
  }

  removeCellColor(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(this.#x, this.#y, this.#cellSize, this.#cellSize);
    ctx.globalAlpha = 1;
    this.draw(ctx);
  }

  addCellOpacity(ctx: CanvasRenderingContext2D, opacity: number = 1) {
    ctx.clearRect(this.#x, this.#y, this.#cellSize, this.#cellSize);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = this.#currentCellColor;
    ctx.fillRect(
      this.#x + this.#cellPadding,
      this.#y + this.#cellPadding,
      this.#cellSizeWithPadding,
      this.#cellSizeWithPadding
    );
  }
}

type HoveredCells = {
  timeout: number;
  start: Date;
};

class Effect {
  #ctx: CanvasRenderingContext2D;
  #width: number;
  #height: number;
  #imageGrid: Cell[] = [];
  cellSize: number = 25;
  imgRef?: RefObject<HTMLImageElement>;
  static #initialized = false;
  static #mouseMoveEvent: (e: MouseEvent | TouchEvent) => void;
  static #hoveredCels = new Map<Cell, HoveredCells>([]);

  constructor(
    ctx: CanvasRenderingContext2D,
    imgRef?: RefObject<HTMLImageElement>
  ) {
    this.#ctx = ctx;
    this.#width = this.#ctx.canvas.width;
    this.#height = this.#ctx.canvas.height;
    this.imgRef = imgRef;

    this.#init(ctx);
  }

  #init(ctx: CanvasRenderingContext2D) {
    if (!Effect.#initialized) {
      this.#createGrid();
      Effect.#mouseMoveEvent = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();

        for (let index = 0; index < this.#imageGrid.length; index++) {
          const cell = this.#imageGrid[index];
          const [x, y] = cell.getCellId().split('_');
          let offsetX = 0;
          let offsetY = 0;

          if ('touches' in e && e.touches.length !== 0) {
            offsetX = e.touches[0].clientX;
            offsetY = e.touches[0].clientY;
          } else if (e instanceof MouseEvent) {
            offsetX = e.offsetX;
            offsetY = e.offsetY;
          }
          const dx = offsetX - +x;
          const dy = offsetY - +y;
          const distance = Math.hypot(dx, dy);
          const timeout = Math.floor(Math.random() * 1000);

          if (distance < 10 && !Effect.#hoveredCels.has(cell)) {
            cell.drawCellColor(ctx);
            Effect.#hoveredCels.set(cell, {
              timeout: timeout,
              start: new Date(),
            });
            break;
          }
        }
      };
      this.#ctx.canvas.addEventListener('mousemove', Effect.#mouseMoveEvent);
      this.#ctx.canvas.addEventListener('touchmove', Effect.#mouseMoveEvent);
      Effect.#initialized = true;
    }
  }

  #createGrid() {
    for (let y = 0; y < this.#height; y += this.cellSize) {
      for (let x = 0; x < this.#width; x += this.cellSize) {
        this.#imageGrid.push(new Cell(this, x, y, this.cellSize));
      }
    }
  }

  reset() {
    Effect.#initialized = false;
    this.#ctx.canvas.removeEventListener('mousemove', Effect.#mouseMoveEvent);
    this.#ctx.canvas.removeEventListener('touchmove', Effect.#mouseMoveEvent);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.#imageGrid.forEach((cell) => {
      cell.draw(ctx);
    });
    Array.from(Effect.#hoveredCels).forEach(([cell, { start, timeout }]) => {
      if (Date.now() - start.getTime() > timeout) {
        cell.removeCellColor(ctx);
        Effect.#hoveredCels.delete(cell);
      } else {
        const value = Math.floor((Date.now() - start.getTime()) / 100);
        const opacity = Math.abs(value - 10) / 10;
        cell.addCellOpacity(ctx, opacity);
      }
    });
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
