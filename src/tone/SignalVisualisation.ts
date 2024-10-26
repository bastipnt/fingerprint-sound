import { Analyser, getTransport } from "tone";

class SignalVisualisation {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private normalizeCurve = true;
  analyser: Analyser;
  private canvasHeight: number;
  private canvasWidth: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.analyser = new Analyser("waveform", Math.pow(2, 9));
    this.canvasHeight = 200;
    // this.waveform.size = Math.pow(2, 9);

    this.canvasWidth = this.canvas.parentElement?.offsetWidth || 300;
    // this.canvasWidth = this.waveform.size;

    this.canvas.height = this.canvasHeight;
    this.canvas.width = this.canvasWidth;
  }

  private scale(
    v: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ): number {
    return ((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  }

  private draw(values: Float32Array) {
    if (this.ctx === null) return;

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    const max = this.normalizeCurve ? Math.max(0.001, ...values) * 1.1 : 1;
    const min = this.normalizeCurve ? Math.min(-0.001, ...values) * 1.1 : 0;

    const lineWidth = 3;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i];
      const x = this.scale(
        i,
        0,
        values.length,
        lineWidth,
        this.canvasWidth - lineWidth
      );
      const y = this.scale(
        amplitude,
        max,
        min,
        0,
        this.canvasHeight - lineWidth
      );
      if (i === 0) {
        // this.ctx.moveTo(x, y);
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

    const values = this.analyser.getValue();
    if (Array.isArray(values)) {
      this.draw(values[1]);
    } else {
      this.draw(values);
    }

    requestAnimationFrame(this.loop);
  };
}

export default SignalVisualisation;
