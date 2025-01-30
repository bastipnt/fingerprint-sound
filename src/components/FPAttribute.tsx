import { useContext } from "react";
import { PatternContext } from "../providers/patternProvider";

type Props = {
  togglePlay: () => void;
  isPlaying: boolean;
  label: string;
  onHover: (isHover: boolean) => void;
};

const FPAttribute: React.FC<Props> = ({ togglePlay, label, isPlaying, onHover }) => {
  const { lightPattern } = useContext(PatternContext);

  return (
    <div
      className={`shaped text-surface box-border flex h-32 w-32 flex-col items-center justify-center p-4 text-center`}
      onClick={() => togglePlay()}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{ background: isPlaying ? `black` : `url(${lightPattern})` }}
    >
      {label}
    </div>
  );
};

export default FPAttribute;
