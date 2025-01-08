import { PlayState } from "../Fingerprint";

type Props = {
  play: (attributeKey: keyof PlayState) => void;
  attributeKey: keyof PlayState;
  playing: boolean;
  label: string;
};

const FPAttribute: React.FC<Props> = ({ play, label, attributeKey, playing }) => {
  return (
    <li
      className={`box-border h-32 w-32 rounded bg-primary p-4 ${playing ? "bg-opacity-100" : "bg-opacity-50"}`}
      onClick={() => play(attributeKey)}
    >
      {label}
    </li>
  );
};

export default FPAttribute;
