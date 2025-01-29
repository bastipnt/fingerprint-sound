import { ReactNode } from "react";
import FingerprintProvider from "./fingerprintProvider";
import KeyboardProvider from "./keyboardProvider";
import PatternProvider from "./patternProvider";

type Props = {
  children: ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <KeyboardProvider>
      <PatternProvider>
        <FingerprintProvider>{children}</FingerprintProvider>
      </PatternProvider>
    </KeyboardProvider>
  );
};

export default Provider;
