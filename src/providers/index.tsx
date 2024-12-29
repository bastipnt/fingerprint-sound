import { ReactNode } from "react";
import KeyboardProvider from "./keyboardProvider";

type Props = {
  children: ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
  return <KeyboardProvider>{children}</KeyboardProvider>;
};

export default Provider;
