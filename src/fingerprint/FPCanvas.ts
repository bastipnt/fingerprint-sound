import { MD5 } from "object-hash";

const WIDTH = 220;
const HEIGHT = 30;

class FPCanvas {
  fingerprint2D?: string;
  image2D?: string;
  private canvas2D: HTMLCanvasElement;
  private ctx2D?: CanvasRenderingContext2D | null;

  constructor() {
    this.canvas2D = document.createElement("canvas");
    this.canvas2D.width = WIDTH;
    this.canvas2D.height = HEIGHT;
  }

  create2D(): string {
    // Text with lowercase/uppercase/punctuation symbols
    const txt = "BrowserLeaks,com <canvas> 1.0";

    document.body.appendChild(this.canvas2D);
    this.ctx2D = this.canvas2D.getContext("2d");

    if (this.ctx2D === null) return "not-possible";

    this.ctx2D.textBaseline = "top";
    // The most common type
    this.ctx2D.font = "14px 'Arial'";
    this.ctx2D.textBaseline = "alphabetic";
    this.ctx2D.fillStyle = "#f60";
    this.ctx2D.fillRect(125, 1, 62, 20);
    // Some tricks for color mixing to increase the difference in rendering
    this.ctx2D.fillStyle = "#069";
    this.ctx2D.fillText(txt, 2, 15);
    this.ctx2D.fillStyle = "rgba(102, 204, 0, 0.7)";
    this.ctx2D.fillText(txt, 4, 17);

    this.image2D = this.canvas2D.toDataURL();

    // const image = document.createElement("img");
    // image.src = this.image2D;
    // document.body.appendChild(image);

    this.fingerprint2D = MD5(this.image2D);

    return this.fingerprint2D;
  }
}

export default FPCanvas;
