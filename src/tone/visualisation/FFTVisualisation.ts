import { FFT, getTransport } from "tone";

class FFTVisualisation {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private normalizeCurve = true;
  fftAnalyser = new FFT();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  private scale(v: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  }

  private draw(values: Float32Array) {
    if (this.ctx === null) return;

    const height = 200;
    const width = this.canvas.parentElement?.offsetWidth || 300;

    this.canvas.height = height;
    this.canvas.width = width;

    this.ctx.clearRect(0, 0, width, height);
    const maxValuesLength = 2048;
    if (values.length > maxValuesLength) {
      const resampled = new Float32Array(maxValuesLength);
      // down sample to maxValuesLength values
      for (let i = 0; i < maxValuesLength; i++) {
        resampled[i] = values[Math.floor((i / maxValuesLength) * values.length)];
      }
      values = resampled;
    }
    const max = this.normalizeCurve ? Math.max(0.001, ...values) * 1.1 : 1;
    const min = this.normalizeCurve ? Math.min(-0.001, ...values) * 1.1 : 0;

    const lineWidth = 3;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    for (let i = 0; i < values.length; i++) {
      const v = values[i];
      const x = this.scale(i, 0, values.length, lineWidth, width - lineWidth);
      const y = this.scale(v, max, min, 0, height - lineWidth);
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "white";
    this.ctx.stroke();
  }

  loop = () => {
    if (getTransport().state !== "started") return;

    requestAnimationFrame(this.loop);
    this.draw(this.fftAnalyser.getValue());
  };
}

export default FFTVisualisation;
