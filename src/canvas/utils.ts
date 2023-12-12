// source https://codepen.io/supah/pen/BaNBmmw?editors=1010
export const convertImage = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  type: 'cover' | 'contain' = 'cover'
) => {
  const imgRatio = img.height / img.width;
  const winRatio = window.innerHeight / window.innerWidth;
  if (
    (imgRatio < winRatio && type === 'contain') ||
    (imgRatio > winRatio && type === 'cover')
  ) {
    const h = window.innerWidth * imgRatio;
    ctx.drawImage(img, 0, (window.innerHeight - h) / 2, window.innerWidth, h);
  }
  if (
    (imgRatio > winRatio && type === 'contain') ||
    (imgRatio < winRatio && type === 'cover')
  ) {
    const w = (window.innerWidth * winRatio) / imgRatio;
    ctx.drawImage(img, (window.innerWidth - w) / 2, 0, w, window.innerHeight);
  }
};

// source https://gist.github.com/callumlocke/cc258a193839691f60dd
export const scaleCanvas = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  // determine the actual ratio we want to draw at
  const ratio = window.devicePixelRatio || 1;

  if (devicePixelRatio !== 1) {
    // set the 'real' canvas size to the higher width/height
    canvas.width = width * ratio;
    canvas.height = height * ratio;

    // ...then scale it back down with CSS
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  } else {
    // this is a normal 1:1 device; just scale it simply
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = '';
    canvas.style.height = '';
  }

  // scale the drawing context so everything will work at the higher ratio
  context.scale(ratio, ratio);
};
