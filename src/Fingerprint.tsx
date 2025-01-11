import { useCallback, useContext, useEffect, useState } from "react";
import FPAttribute from "./components/FPAttribute";
import fpDescriptions from "./fpDescriptions.json";
import { FingerprintContext } from "./providers/fingerprintProvider";

export type FPAttributeKeys = keyof typeof fpDescriptions;

type FPAttributes = typeof fpDescriptions & {
  canvas: { values?: { geometry: string; text: string } };
} & {
  [key in Exclude<FPAttributeKeys, "canvas">]: { value?: string };
};

type FPAttribute = FPAttributes[FPAttributeKeys];

export type PlayState = {
  [key in keyof typeof fpDescriptions]?: boolean;
};

type Props = {
  toggleGlobalPlay: () => void;
  toggleAttributePlay: (attributeKey: FPAttributeKeys, newState: boolean, value: unknown) => void;
  globalIsPlaying: boolean;
  globalIsLoading: boolean;
};

const Fingerprint: React.FC<Props> = ({
  toggleGlobalPlay,
  globalIsPlaying,
  globalIsLoading,
  toggleAttributePlay,
}) => {
  const { visitorId, components } = useContext(FingerprintContext);
  const [playState, setPlayState] = useState<PlayState>({
    fonts: false,
    languages: false,
    timezone: false,
    osCpu: false,
    canvas: false,
    audio: false,
  });
  const [fpAttributes, setFPAttributes] = useState<FPAttributes>(fpDescriptions);
  const [currAttribute, setCurrAttribute] = useState<FPAttribute | null>(null);

  useEffect(() => {
    if (!components || Object.keys(components).length === 0) return;

    const newFPAttributes: FPAttributes = {
      fonts: { ...fpDescriptions.fonts, value: components.fonts.value.join(", ") },
      audio: { ...fpDescriptions.audio, value: components.audio.value.toString() },
      canvas: {
        ...fpDescriptions.canvas,
        values: { geometry: components.canvas.value.geometry, text: components.canvas.value.text },
      },
      languages: {
        ...fpDescriptions.languages,
        value: [...new Set(components.languages.value.flatMap((arr) => [...arr]))].join(", "),
      },
      osCpu: { ...fpDescriptions.osCpu, value: components.osCpu.value },
      timezone: { ...fpDescriptions.timezone, value: components.timezone.value },
    };
    setFPAttributes(newFPAttributes);
  }, [components]);

  const togglePlay = useCallback(
    (attributeKey: FPAttributeKeys) => {
      if (!globalIsPlaying) toggleGlobalPlay();
      const newAttributePlayState = !playState[attributeKey];
      setPlayState({ ...playState, [attributeKey]: newAttributePlayState });
      toggleAttributePlay(attributeKey, newAttributePlayState, "TODO:");
    },
    [globalIsPlaying, playState],
  );

  const handleHover = useCallback(
    (attributeKey: FPAttributeKeys | null) => {
      if (attributeKey === null) return setCurrAttribute(null);
      if (!(attributeKey in fpAttributes)) return setCurrAttribute(null);

      setCurrAttribute(fpAttributes[attributeKey]);
    },
    [fpAttributes],
  );

  return (
    <div className="grid grid-cols-2">
      <section>
        <h1>Hello Visitor {visitorId}!</h1>
        {globalIsLoading && <p>Loading...</p>}
        <ul className="box-border grid grid-cols-3 gap-4 p-4">
          {Object.entries(fpAttributes).map(([key, desc]) => (
            <FPAttribute
              key={key}
              isPlaying={!!playState[key as FPAttributeKeys]}
              togglePlay={togglePlay}
              hover={handleHover}
              attributeKey={key as FPAttributeKeys}
              label={desc.label}
            />
          ))}
        </ul>
      </section>
      <section className="border-l">
        {currAttribute === null ? (
          <p>Hover your mouse over a fingerprint attribute to see it's value.</p>
        ) : (
          <>
            <p>{currAttribute.label}</p>
            <p>{currAttribute.description}</p>
            {"value" in currAttribute && <p>{currAttribute.value}</p>}
            {"values" in currAttribute && (
              <>
                <img src={currAttribute.values?.geometry} alt="Canvas Geometry" />
                <img src={currAttribute.values?.text} alt="Canvas Text" />
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Fingerprint;
