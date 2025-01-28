import { FPAttributeKeys, FPValue } from "../Fingerprint";

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
  return (
    <li
      className={`bg-primary box-border h-32 w-32 rounded-sm p-4 ${isPlaying ? "opacity-100" : "opacity-50"}`}
      onClick={() => togglePlay(attributeKey, value)}
      onMouseEnter={() => hover(attributeKey)}
      onMouseLeave={() => hover(null)}
    >
      {label}
    </li>
  );
};

export default FPAttribute;
