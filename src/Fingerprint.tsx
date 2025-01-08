import { useContext, useEffect, useState } from "react";
import { FPComponents, FingerprintContext } from "./providers/fingerprintProvider";
import FPAttribute from "./components/FPAttribute";

const ATTRIBUTES: (keyof FPComponents)[] = [
  "fonts",
  "languages",
  "timezone",
  "plugins",
  "osCpu",
  "canvas",
  "audio",
];

type Attributes = Partial<FPComponents> & {
  fonts: { value: string[] };
  languages: { value: Array<string[]> };
  timezone: { value: string };
  // plugins: { value: Array<{ name: string; description: string; mimeTypes: any[] }> };
  osCpu: { value: string };
  canvas: { value: { winding: boolean; geometry: string; text: string } };
  audio: { value: number };
};

const Fingerprint: React.FC = () => {
  const { visitorId, getAttributes } = useContext(FingerprintContext);
  const [attributes, setAttributes] = useState<Attributes>();

  useEffect(() => {
    setAttributes(getAttributes(ATTRIBUTES) as Attributes);
  }, [getAttributes]);

  useEffect(() => {
    if (!attributes || Object.keys(attributes).length === 0) return;

    console.log(attributes);
    console.log([...new Set(attributes.languages.value.flatMap((arr) => [...arr]))]);
  }, [attributes]);

  const play = () => {};
  const focus = () => {};

  return (
    <>
      <h1>Hello Visitor {visitorId}!</h1>
      {attributes && Object.keys(attributes).length > 0 && (
        <ul>
          <FPAttribute play={play} focus={focus}>
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
          </FPAttribute>
        </ul>
      )}
    </>
  );
};

export default Fingerprint;
