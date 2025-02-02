export const useResize = (canvas: HTMLCanvasElement) => () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

export const awaitAnimationFrame = () =>
  new Promise((resolve) => window.requestAnimationFrame(resolve));

export const wait = (ms: number = 1000) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const getDimensions = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const drawBGPixel = (ctx: CanvasRenderingContext2D, x: number, y: number, size = 10) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillRect(0, 0, size, size);
  ctx.restore();
};

export const getPatternCanvas = (
  hue = 0,
  saturation = 0,
  lightness = 0,
  spread = 20,
  pixelSize = 1,
  width = 50,
  height = 50,
) => {
  const patternCanvas = document.createElement("canvas");
  const ctx = patternCanvas.getContext("2d");
  if (!ctx) return;

  patternCanvas.width = width;
  patternCanvas.height = height;
  ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  for (let x = 0; x < width; x += pixelSize) {
    for (let y = 0; y < height; y += pixelSize) {
      ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness + Math.random() * spread}%)`;
      drawBGPixel(ctx, x, y, pixelSize);
    }
  }

  return patternCanvas;
};

export const getPattern = (
  hue = 0,
  saturation = 0,
  lightness = 0,
  spread = 20,
  pixelSize = 1,
  width = 50,
  height = 50,
) => {
  const patternCanvas = getPatternCanvas(
    hue,
    saturation,
    lightness,
    spread,
    pixelSize,
    width,
    height,
  );
  if (!patternCanvas) return;
  const ctx = patternCanvas.getContext("2d");
  if (!ctx) return;

  return ctx.createPattern(patternCanvas, "repeat");
};

export const drawRandomBorder = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = getDimensions();

  ctx.beginPath();
  const parts = [25, 35, 20, 55];
  const bumps = parts.length;
  let thickness = parts[parts.length - 1];
  let borderX = thickness;
  let borderY = thickness;
  let edge = 8;

  ctx.moveTo(borderX, borderY);

  for (let i = 0; i < bumps; i++) {
    thickness = parts[i];
    borderX += edge;
    borderY = thickness;
    ctx.lineTo(borderX, borderY);
    borderX += width / bumps + 1;
    ctx.lineTo(borderX, borderY);
  }

  ctx.lineTo(width - thickness, thickness);

  for (let i = 0; i < bumps; i++) {
    thickness = parts[i];
    borderX = width - thickness;
    borderY += edge;
    ctx.lineTo(borderX, borderY);
    borderY += height / bumps + 1;
    ctx.lineTo(borderX, borderY);
  }

  ctx.lineTo(width - thickness, height - thickness);

  for (let i = 0; i < bumps; i++) {
    thickness = parts[i];
    borderY = height - thickness;
    borderX -= edge;
    ctx.lineTo(borderX, borderY);
    borderX -= width / bumps + 1;
    ctx.lineTo(borderX, borderY);
  }

  ctx.lineTo(thickness, height - thickness);

  for (let i = 0; i < bumps; i++) {
    thickness = parts[i];
    borderX = thickness;
    borderY -= edge;
    ctx.lineTo(borderX, borderY);
    borderY -= height / bumps + 1;
    ctx.lineTo(borderX, borderY);
  }

  ctx.lineTo(thickness, thickness);

  ctx.clip();
};

const drawBorder = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = getDimensions();

  ctx.beginPath();

  const matrix = [
    [5, 7],
    [15, 7],
    [16, 6],
    [16, 3],
    [17, 2],
    [30, 2],
    [31, 3],
    [64, 3],
    [65, 2],
    [90, 2],
    [91, 3],
    [91, 6],
    [92, 7],
    [95, 7],
    [97, 9],
    [97, 20],
    [99, 20],
    [99, 40],
    [94, 45],
    [94, 53],
    [95, 54],
    [95, 70],
    [99, 73],
    [99, 98],
    [98, 99],
    [80, 99],
    [78, 97],
    [54, 97],
    [53, 98],
    [33, 98],
    [30, 95],
    [5, 95],
    [4, 94],
    [4, 65],
    [5, 64],
    [5, 43],
    [3, 41],
    [3, 33],
    [4, 32],
    [4, 8],
    [5, 7],
  ];

  matrix.forEach(([xp, yp], i) => {
    const x = (width * xp) / 100;
    const y = (height * yp) / 100;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.clip();
};

export const drawBackground = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = getDimensions();

  ctx.fillStyle = getPattern() ?? `hsl(0, 0%, 2%)`;
  ctx.fillRect(0, 0, width, height);

  drawBorder(ctx);

  ctx.fillStyle = getPattern(0, 0, 90, 10, 1, 50, 50) ?? `hsl(0, 0%, 99%)`;
  ctx.fillRect(0, 0, width, height);
};

export const drawSimiley = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
  ctx.stroke();
  ctx.restore();
};
