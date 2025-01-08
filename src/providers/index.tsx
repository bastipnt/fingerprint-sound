import { ReactNode } from "react";
import KeyboardProvider from "./keyboardProvider";
import FingerprintProvider from "./fingerprintProvider";

type Props = {
  children: ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <KeyboardProvider>
      <FingerprintProvider>{children}</FingerprintProvider>
    </KeyboardProvider>
  );
};

export default Provider;
