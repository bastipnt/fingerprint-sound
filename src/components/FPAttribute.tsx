import { useContext } from "react";
import { FPAttributeKeys, FPValue } from "../Fingerprint";
import { PatternContext } from "../providers/patternProvider";

type Props = {
  togglePlay: (attributeKey: FPAttributeKeys, value: FPValue) => void;
  isPlaying: boolean;
  attributeKey: FPAttributeKeys;
  label: string;
  hover: (attributeKey: FPAttributeKeys | null) => void;
  value: FPValue;
};

const FPAttribute: React.FC<Props> = ({
  togglePlay,
  label,
  attributeKey,
  isPlaying,
  hover,
  value,
}) => {
  const { lightPattern } = useContext(PatternContext);

  return (
    <li
      className={`text-surface box-border flex h-32 w-32 flex-col items-center justify-center p-4 text-center`}
      onClick={() => togglePlay(attributeKey, value)}
      onMouseEnter={() => hover(attributeKey)}
      onMouseLeave={() => hover(null)}
      style={{ background: isPlaying ? `url(${lightPattern})` : `url(${lightPattern})` }}
    >
      {label}
    </li>
  );
};

export default FPAttribute;
