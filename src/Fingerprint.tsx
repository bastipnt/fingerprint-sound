import { useCallback, useContext, useState } from "react";
import FPAttribute from "./components/FPAttribute";
import InfoBox from "./components/InfoBox";
import { FingerprintContext, FPAttributes } from "./providers/fingerprintProvider";
import { PatternContext } from "./providers/patternProvider";

export type PlayState = {
  [value in FPAttributes]?: boolean;
};

type Props = {
  toggleGlobalPlay: () => void;
  toggleAttributePlay: (attributeKey: FPAttributes, newState: boolean) => void;
  globalIsPlaying: boolean;
  globalIsLoading: boolean;
};

const Fingerprint: React.FC<Props> = ({
  toggleGlobalPlay,
  globalIsPlaying,
  toggleAttributePlay,
}) => {
  const { visitorId } = useContext(FingerprintContext);
  const [playState, setPlayState] = useState<PlayState>({
    [FPAttributes.audioContext]: false,
    [FPAttributes.canvas2D]: false,
    [FPAttributes.canvasWebGL]: false,
    [FPAttributes.colorDepth]: false,
    [FPAttributes.screenSize]: false,
    [FPAttributes.timeZone]: false,
  });

  const { darkPattern, lightPattern } = useContext(PatternContext);
  const [currAttribute, setCurrAttribute] = useState<FPAttributes | null>(null);

  const togglePlay = useCallback(
    (attributeKey: FPAttributes) => {
      const newAttributePlayState = !playState[attributeKey];
      setPlayState({ ...playState, [attributeKey]: newAttributePlayState });
      toggleAttributePlay(attributeKey, newAttributePlayState);
    },
    [globalIsPlaying, playState],
  );

  const handleHover = (attributeKey: FPAttributes, isHover: boolean) => {
    if (!isHover) return setCurrAttribute(null);
    setCurrAttribute(attributeKey);
  };

  return (
    <div className="grid h-screen grid-rows-[30vh_1fr_30vh] flex-col items-center justify-center">
      {!currAttribute && (
        <InfoBox onlyWhenMoving>
          <p>Hover your mouse over a fingerprint attribute to see it's value.</p>
        </InfoBox>
      )}

      <section className="text-surface flex w-screen flex-row justify-center gap-4">
        <div
          className="shaped font-heading bg-primary px-8 py-4"
          style={{ background: `url(${lightPattern})` }}
        >
          <h1 className="text-2xl">Hello Visitor {visitorId}!</h1>
        </div>
      </section>
      <section className="flex flex-col items-center">
        <ul className="box-border grid grid-cols-3 gap-8 p-4">
          <li>
            <FPAttribute
              isPlaying={!!playState[FPAttributes.screenSize]}
              togglePlay={() => togglePlay(FPAttributes.screenSize)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.screenSize, isHover)}
              label={FPAttributes[FPAttributes.screenSize]}
            />
            <InfoBox show={currAttribute === FPAttributes.screenSize}>
              <p>Screen Size</p>
              <p>Desctiption</p>
            </InfoBox>
          </li>

          <li>
            <FPAttribute
              isPlaying={!!playState[FPAttributes.timeZone]}
              togglePlay={() => togglePlay(FPAttributes.timeZone)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.timeZone, isHover)}
              label={FPAttributes[FPAttributes.timeZone]}
            />
            <InfoBox show={currAttribute === FPAttributes.timeZone}>
              <p>TimeZone</p>
              <p>Desctiption</p>
            </InfoBox>
          </li>

          <li>
            <FPAttribute
              isPlaying={!!playState[FPAttributes.colorDepth]}
              togglePlay={() => togglePlay(FPAttributes.colorDepth)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.colorDepth, isHover)}
              label={FPAttributes[FPAttributes.colorDepth]}
            />
            <InfoBox show={currAttribute === FPAttributes.colorDepth}>
              <p>TimeZone</p>
              <p>Desctiption</p>
            </InfoBox>
          </li>

          <li>
            <FPAttribute
              isPlaying={!!playState[FPAttributes.canvas2D]}
              togglePlay={() => togglePlay(FPAttributes.canvas2D)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.canvas2D, isHover)}
              label={FPAttributes[FPAttributes.canvas2D]}
            />
            <InfoBox show={currAttribute === FPAttributes.canvas2D}>
              <p>TimeZone</p>
              <p>Desctiption</p>
            </InfoBox>
          </li>

          <li>
            <FPAttribute
              isPlaying={!!playState[FPAttributes.canvasWebGL]}
              togglePlay={() => togglePlay(FPAttributes.canvasWebGL)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.canvasWebGL, isHover)}
              label={FPAttributes[FPAttributes.canvasWebGL]}
            />
            <InfoBox show={currAttribute === FPAttributes.canvasWebGL}>
              <p>TimeZone</p>
              <p>Desctiption</p>
            </InfoBox>
          </li>

          <li>
            <FPAttribute
              isPlaying={!!playState[FPAttributes.audioContext]}
              togglePlay={() => togglePlay(FPAttributes.audioContext)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.audioContext, isHover)}
              label={FPAttributes[FPAttributes.audioContext]}
            />
            <InfoBox show={currAttribute === FPAttributes.audioContext}>
              <p>Audio Context</p>
              <p>Desctiption</p>
            </InfoBox>
          </li>
        </ul>
      </section>

      <section className="text-surface flex w-screen flex-row justify-center gap-4">
        <div
          className="shaped bg-neutral flex w-[60vw] flex-row items-center gap-2 bg-repeat px-8 py-4"
          style={{ background: `url(${darkPattern})` }}
        >
          <button className="bg-surface text-primary p-2" onClick={toggleGlobalPlay}>
            {globalIsPlaying ? "Pause" : "Paly"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Fingerprint;
