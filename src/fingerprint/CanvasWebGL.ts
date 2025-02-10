import { FPValue } from ".";

const renderingContexts = [
  "webgl2",
  "experimental-webgl2",
  "webgl",
  "experimental-webgl",
  "moz-webgl",
  "webkit-3d",
  "webgl2-compute",
];

const fragmentCode =
  "precision mediump float;varying vec4 varyinColor;void main(){gl_FragColor=varyinColor;}";

const vertexCode =
  "attribute vec2 attrVertex;attribute vec4 attrColor;varying vec4 varyinColor;uniform mat4 transform;void main(){varyinColor=attrColor;gl_Position=transform*vec4(attrVertex,0,1);}";

const getWebGLContext = (canvas: HTMLCanvasElement): WebGLRenderingContext | null => {
  let ctx: RenderingContext | null = null;

  renderingContexts.forEach((contextStr) => {
    if (ctx === null) ctx = canvas.getContext(contextStr);
  });

  return ctx as WebGLRenderingContext | null;
};

/**
 * @returns canvas webgl image string
 *
 * @see https://blog.amiunique.org/an-explicative-article-on-drawnapart-a-gpu-fingerprinting-technique/
 * cite-key: laorExplainingDrawnApartRemote2022
 * @see https://github.com/drawnapart/drawnapart
 * @see https://github.com/drawnapart/drawnapart/blob/master/standalone_demos/onscreen.html
 * @see https://browserleaks.com/webgl
 *
 */
export const getCanvasWebGL = async (): Promise<FPValue> => {
  const value: FPValue = { ogValue: "Unknown", ogData: "Unknown" };

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;

  const gl = getWebGLContext(canvas);
  if (gl === null) {
    value.ogData = value.ogValue = "No_WebGL";
    return value;
  }

  // Vertex shader
  const vertShader = gl.createShader(gl.VERTEX_SHADER);
  if (!vertShader) {
    value.ogData = value.ogValue = "No_VertShader";
    return value;
  }

  gl.shaderSource(vertShader, vertexCode);
  gl.compileShader(vertShader);
  const compiledVertShader = gl.getShaderParameter(vertShader, gl.COMPILE_STATUS);
  if (!compiledVertShader) {
    console.error(gl.getShaderInfoLog(vertShader));
  }

  // Fragment shader
  const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  if (!fragShader) {
    value.ogData = value.ogValue = "No_FragShader";
    return value;
  }

  gl.shaderSource(fragShader, fragmentCode);
  gl.compileShader(fragShader);
  const compiledFragShader = gl.getShaderParameter(fragShader, gl.COMPILE_STATUS);
  if (!compiledFragShader) {
    console.error(gl.getShaderInfoLog(fragShader));
  }

  // shaderProgram
  const shaderProgram = gl.createProgram();
  if (!shaderProgram) {
    value.ogData = value.ogValue = "No_ShaderProgram";
    return value;
  }

  gl.attachShader(shaderProgram, vertShader);
  gl.attachShader(shaderProgram, fragShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  const vertexPosAttrib = gl.getAttribLocation(shaderProgram, "attrVertex");
  const colorAttrib = gl.getAttribLocation(shaderProgram, "attrColor");
  const transform = gl.getUniformLocation(shaderProgram, "transform");
  gl.enableVertexAttribArray(vertexPosAttrib);
  gl.enableVertexAttribArray(colorAttrib);
  gl.uniformMatrix4fv(transform, !1, [1.5, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 1, 0, 0.5, 0, 0, 1]);

  const A = [-0.25, 0];
  const b = [];
  const num = 128;
  for (let i = 0; i < num; i++) {
    const L = ((45 + (i / num) * 270) / 360) * 2 * Math.PI;
    const R = ((45 + ((i + 1) / num) * 270) / 360) * 2 * Math.PI;

    b.push(A[0], A[1], 1, 0.7, 0, 1);
    b.push(A[0] + 0.5 * Math.cos(L), A[1] + 0.5 * Math.sin(L), 2, 1 - i / num, 0, 1);
    b.push(A[0] + 0.5 * Math.cos(R), A[1] + 0.5 * Math.sin(R), 1, 1 - (i + 1) / num, 0, 1);
  }

  const T = new Float32Array(b);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, T, gl.STATIC_DRAW);
  gl.vertexAttribPointer(vertexPosAttrib, 2, gl.FLOAT, !1, 24, 0);
  gl.vertexAttribPointer(colorAttrib, 4, gl.FLOAT, !1, 24, 8);
  gl.drawArrays(gl.LINE_STRIP, 0, T.length / 6);

  const dataArr = new Uint8Array(canvas.width * canvas.height * 4);
  gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, dataArr);
  const dataStr = JSON.stringify(dataArr).replace(/,?"[0-9]+":/g, "");

  value.ogData = canvas.toDataURL();
  value.ogValue = dataStr;

  return value;
};
