import { FFT, getTransport } from "tone";

class FFTVisualisation {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private normalizeCurve = true;
  private canvasHeight: number;
  private canvasWidth: number;

  fftAnalyser = new FFT();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    const parent = this.canvas.parentElement;

    this.canvasHeight = parent?.offsetWidth || 200;
    this.canvasWidth = parent?.offsetHeight || 300;

    this.canvas.height = this.canvasHeight;
    this.canvas.width = this.canvasWidth;

    this.addResizeHandler();
  }

  private addResizeHandler() {
    window.addEventListener("resize", () => {
      const parent = this.canvas.parentElement;

      this.canvasHeight = parent?.offsetWidth || 200;
      this.canvasWidth = parent?.offsetHeight || 300;

      this.canvas.height = this.canvasHeight;
      this.canvas.width = this.canvasWidth;
    });
  }

  private scale(v: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  }

  private draw(values: Float32Array) {
    if (this.ctx === null) return;

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
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
      const x = this.scale(i, 0, values.length, lineWidth, this.canvasWidth - lineWidth);
      const y = this.scale(v, max, min, 0, this.canvasHeight - lineWidth);
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
    if (getTransport().state !== "started") {
      if (this.ctx) this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      return;
    }

    requestAnimationFrame(this.loop);
    this.draw(this.fftAnalyser.getValue());
  };
}

export default FFTVisualisation;
