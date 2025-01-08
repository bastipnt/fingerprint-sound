import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  play: () => void;
  focus: () => void;
};

const FPAttribute: React.FC<Props> = ({ children, play, focus }) => {
  return (
    <li>
      <button onClick={play}>Play</button>
      <button onClick={focus}>Focus</button>
      {children}
    </li>
  );
};

export default FPAttribute;
