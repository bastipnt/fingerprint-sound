import { scale } from "./number";

export const getAudioFPImageUrl = (values?: Float32Array | string): string => {
  if (!values) return "";
  if (typeof values === "string") return "";

  const canvas = document.createElement("canvas");
  const width = 300;
  const height = 200;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return ""; // TODO: replace with not working image

  ctx.clearRect(0, 0, width, height);

  const startIndex = values.findIndex((value, i, arr) => value >= 0 && arr[i - 1] < 0);
  const endIndex = startIndex + values.length / 2;

  const max = Math.max(0.001, ...values) * 1.1;
  const min = Math.min(-0.001, ...values) * 1.1;

  const lineWidth = 3;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  for (let i = startIndex; i < endIndex; i++) {
    const amplitude = values[i];
    const x = scale(i, startIndex, endIndex, -lineWidth, width + lineWidth);
    const y = scale(amplitude, max, min, 0, height - lineWidth);

    ctx.lineTo(x, y);
  }
  ctx.lineCap = "round";
  ctx.strokeStyle = "white";
  ctx.stroke();

  return canvas.toDataURL();
};
