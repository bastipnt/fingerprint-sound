import { createContext, ReactNode, useEffect } from "react";
import useCanvas from "../hooks/useCanvas";

export const CanvasContext = createContext<{
  isInitialized: boolean;
  canvas: HTMLCanvasElement | null;
}>({
  isInitialized: false,
  canvas: null,
});

type Props = {
  children: ReactNode;
};

const CanvasProvider: React.FC<Props> = ({ children }) => {
  const { start, isInitialized, canvas } = useCanvas();

  useEffect(() => {
    if (!isInitialized) return;
    start();
  }, [isInitialized]);

  return (
    <CanvasContext.Provider value={{ isInitialized, canvas }}>{children}</CanvasContext.Provider>
  );
};

export default CanvasProvider;
