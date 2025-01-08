import { useCallback, useContext, useEffect, useState } from "react";
import FPAttribute from "./components/FPAttribute";
import description from "./description.json";
import { FingerprintContext, FPComponents } from "./providers/fingerprintProvider";

const ATTRIBUTES: (keyof typeof description)[] = [
  "fonts",
  "languages",
  "timezone",
  "osCpu",
  "canvas",
  "audio",
];

type Attributes = Partial<FPComponents> & {
  fonts: { value: string[] };
  languages: { value: Array<string[]> };
  timezone: { value: string };
  osCpu: { value: string };
  canvas: { value: { winding: boolean; geometry: string; text: string } };
  audio: { value: number };
};

export type PlayState = {
  fonts?: boolean;
  languages?: boolean;
  timezone?: boolean;
  osCpu?: boolean;
  canvas?: boolean;
  audio?: boolean;
};

type Props = {
  handleClickPlay: () => void;
  isPlaying: boolean;
  isLoading: boolean;
};

const Fingerprint: React.FC<Props> = ({ handleClickPlay, isPlaying }) => {
  const { visitorId, getAttributes } = useContext(FingerprintContext);
  const [attributes, setAttributes] = useState<Attributes>();
  const [playing, setPlaying] = useState<PlayState>({});

  useEffect(() => {
    setAttributes(getAttributes(ATTRIBUTES) as Attributes);
  }, [getAttributes]);

  useEffect(() => {
    if (!attributes || Object.keys(attributes).length === 0) return;

    console.log(attributes);
    console.log([...new Set(attributes.languages.value.flatMap((arr) => [...arr]))]);
  }, [attributes]);

  const play = useCallback(
    (attributeKey: keyof PlayState) => {
      if (!isPlaying) handleClickPlay();

      if (!(attributeKey in playing)) setPlaying({ ...playing, [attributeKey]: true });
      else setPlaying({ ...playing, [attributeKey]: !playing[attributeKey] });
    },
    [isPlaying, playing],
  );

  return (
    <>
      <h1>Hello Visitor {visitorId}!</h1>
      {attributes && Object.keys(attributes).length > 0 && (
        <ul className="box-border grid grid-cols-3 gap-4 p-4">
          {ATTRIBUTES.map((key) => (
            <FPAttribute
              key={key}
              playing={!!playing[key]}
              play={play}
              attributeKey={key}
              label={description[key].label}
            />
          ))}
          {/* <FPAttribute play={play} focus={focus}>
            <span>Name: Fonts</span>
            <span>Value: {attributes.fonts.value.join(", ")}</span>
          </FPAttribute>

          <FPAttribute play={play} focus={focus}>
            <span>Name: Languages</span>
            <span>
              Value:{" "}
              {[...new Set(attributes.languages.value.flatMap((arr) => [...arr]))].join(", ")}
            </span>
          </FPAttribute>

          <FPAttribute play={play} focus={focus}>
            <span>Name: Timezone</span>
            <span>Value: {attributes.timezone.value}</span>
          </FPAttribute>

          <FPAttribute play={play} focus={focus}>
            <span>Name: OS Cpu</span>
            <span>Value: {attributes.osCpu.value}</span>
          </FPAttribute>

          <FPAttribute play={play} focus={focus}>
            <span>Name: Canvas</span>
            <span>Value:</span>
            <img src={attributes.canvas.value.geometry} alt="geometry" />
            <img src={attributes.canvas.value.text} alt="text" />
          </FPAttribute>

          <FPAttribute play={play} focus={focus}>
            <span>Name: Audio</span>
            <span>Value: {attributes.audio.value}</span>
          </FPAttribute> */}
        </ul>
      )}
    </>
  );
};

export default Fingerprint;
