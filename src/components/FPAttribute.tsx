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
      className={`box-border h-32 w-32 rounded bg-primary p-4 ${isPlaying ? "bg-opacity-100" : "bg-opacity-50"}`}
      onClick={() => togglePlay(attributeKey, value)}
      onMouseEnter={() => hover(attributeKey)}
      onMouseLeave={() => hover(null)}
    >
      {label}
    </li>
  );
};

export default FPAttribute;
