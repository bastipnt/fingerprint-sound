import { FPAttributeKeys } from "../Fingerprint";

type Props = {
  togglePlay: (attributeKey: FPAttributeKeys) => void;
  isPlaying: boolean;
  attributeKey: FPAttributeKeys;
  label: string;
  hover: (attributeKey: FPAttributeKeys | null) => void;
};

const FPAttribute: React.FC<Props> = ({ togglePlay, label, attributeKey, isPlaying, hover }) => {
  return (
    <li
      className={`box-border h-32 w-32 rounded bg-primary p-4 ${isPlaying ? "bg-opacity-100" : "bg-opacity-50"}`}
      onClick={() => togglePlay(attributeKey)}
      onMouseEnter={() => hover(attributeKey)}
      onMouseLeave={() => hover(null)}
    >
      {label}
    </li>
  );
};

export default FPAttribute;
