import { useEffect, useRef, useState } from "react";
import { drawBackground, useResize } from "../util/canvas";

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPlayingRef = useRef(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (canvasRef.current !== null) return;
    canvasRef.current = (document.getElementById("background-canvas") as HTMLCanvasElement) ?? null;

    if (canvasRef.current === null) return;
    const resize = useResize(canvasRef.current);
    const update = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", update);
    resize();

    setIsInitialized(true);

    return () => window.removeEventListener("resize", update);
  }, []);

  const draw = async () => {
    if (!isPlayingRef.current) return;
    if (canvasRef.current === null) return;

    // const { width, height } = getDimensions();

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    drawBackground(ctx);

    // await wait(1000);
    // requestAnimationFrame(draw);
  };

  const start = () => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    draw();
  };

  const stop = () => {
    if (!isPlayingRef.current) return;
    isPlayingRef.current = false;
  };

  return { start, stop, isInitialized, canvas: canvasRef.current };
};

export default useCanvas;
