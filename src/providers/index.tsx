import { ReactNode } from "react";
import CanvasProvider from "./canvasProvider";
import FingerprintProvider from "./fingerprintProvider";
import KeyboardProvider from "./keyboardProvider";
import PatternProvider from "./patternProvider";

type Props = {
  children: ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <KeyboardProvider>
      <CanvasProvider>
        <PatternProvider>
          <FingerprintProvider>{children}</FingerprintProvider>
        </PatternProvider>
      </CanvasProvider>
    </KeyboardProvider>
  );
};

export default Provider;
