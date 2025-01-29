import { createContext, ReactNode, useEffect, useState } from "react";
import { getPatternCanvas } from "../util/canvas";

export const PatternContext = createContext<{
  darkPattern: string;
  lightPattern: string;
  secondaryPattern: string;
}>({
  darkPattern: "",
  lightPattern: "",
  secondaryPattern: "",
});

type Props = {
  children: ReactNode;
};

const PatternProvider: React.FC<Props> = ({ children }) => {
  const [darkPattern, setDarkPattern] = useState("");
  const [lightPattern, setLightPattern] = useState("");
  const [secondaryPattern, setSecondaryPattern] = useState("");

  useEffect(() => {
    const patternCanvas = getPatternCanvas();
    if (!patternCanvas) return;

    setDarkPattern(patternCanvas.toDataURL());
  }, []);

  useEffect(() => {
    const patternCanvas = getPatternCanvas(276.14, 90.48, 60, 5, 2, 50, 50);
    if (!patternCanvas) return;

    setLightPattern(patternCanvas.toDataURL());
  }, []);

  useEffect(() => {
    const patternCanvas = getPatternCanvas(276.14, 90.48, 70, 5, 2, 50, 50);
    if (!patternCanvas) return;

    setSecondaryPattern(patternCanvas.toDataURL());
  }, []);

  return (
    <PatternContext.Provider value={{ darkPattern, lightPattern, secondaryPattern }}>
      {children}
    </PatternContext.Provider>
  );
};

export default PatternProvider;
