import { ReactNode } from "react";
import CanvasProvider from "./canvasProvider";
import FingerprintProvider from "./fingerprintProvider";
import KeyboardProvider from "./keyboardProvider";
import PatternProvider from "./patternProvider";
import SoundProvider from "./soundProvider";

type Props = {
  children: ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <KeyboardProvider>
      <CanvasProvider>
        <PatternProvider>
          <FingerprintProvider>
            <SoundProvider>{children}</SoundProvider>
          </FingerprintProvider>
        </PatternProvider>
      </CanvasProvider>
    </KeyboardProvider>
  );
};

export default Provider;
