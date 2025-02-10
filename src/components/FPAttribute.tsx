import { ReactNode, useContext, useState } from "react";
import { PatternContext } from "../providers/patternProvider";

type Props = {
  togglePlay?: () => void;
  isPlaying: boolean;
  label: string;
  children: ReactNode;
  onHover: (isHover: boolean) => void;
};

const FPAttribute: React.FC<Props> = ({ togglePlay, label, isPlaying, onHover, children }) => {
  const { lightPattern } = useContext(PatternContext);
  const [isHover, setIsHover] = useState(false);

  const toggleHover = (newHoverState: boolean) => {
    setIsHover(newHoverState);
    onHover(newHoverState);
  };

  return (
    <div
      className={`shaped text-surface box-border flex h-40 w-40 flex-col items-center justify-center p-4 text-center`}
      onClick={() => togglePlay && togglePlay()}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
      style={{ background: isPlaying ? `black` : `url(${lightPattern})` }}
    >
      {isHover ? children : label}
    </div>
  );
};

export default FPAttribute;
