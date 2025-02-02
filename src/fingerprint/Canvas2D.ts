/**
 * @returns canvas 2d image string
 *
 * @see https://github.com/fingerprintjs/fingerprintjs/blob/master/src/sources/canvas.ts
 *
 */
export const getCanvas2D = (): string => {
  const canvas = document.createElement("canvas");
  canvas.width = 240;
  canvas.height = 60;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "No_CTX";

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#f60";
  ctx.fillRect(100, 1, 62, 20);
  ctx.fillStyle = "#069";
  ctx.font = '11pt "Times New Roman"';

  const printedText = `Cwm fjordbank gly ${String.fromCharCode(55357, 56835) /* 😃 */}`;
  ctx.fillText(printedText, 2, 15);
  ctx.fillStyle = "rgba(102, 204, 0, 0.2)";
  ctx.font = "18pt Arial";
  ctx.fillText(printedText, 4, 45);

  const dataUrl = canvas.toDataURL();
  return dataUrl;
};
