import { createContext, ReactNode, useEffect, useState } from "react";
import { getPatternCanvas } from "../util/canvas";

export const PatternContext = createContext<{
  darkPattern: string;
}>({
  darkPattern: "",
});

type Props = {
  children: ReactNode;
};

const PatternProvider: React.FC<Props> = ({ children }) => {
  const [darkPattern, setDarkPattern] = useState("");

  useEffect(() => {
    const patternCanvas = getPatternCanvas();
    if (!patternCanvas) return;
    setDarkPattern(patternCanvas.toDataURL());
  }, []);

  return <PatternContext.Provider value={{ darkPattern }}>{children}</PatternContext.Provider>;
};

export default PatternProvider;
