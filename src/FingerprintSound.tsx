import { useContext, useState } from "react";
import FPAttribute from "./components/FPAttribute";
import InfoBox from "./components/InfoBox";
import { FPAttributes } from "./fingerprint";
import { FingerprintContext } from "./providers/fingerprintProvider";
import { PatternContext } from "./providers/patternProvider";
import { PlayState, SoundContext } from "./providers/soundProvider";
import { getAudioFPImageUrl } from "./util/audoFPCanvas";

const FingerprintSound: React.FC = ({}) => {
  const { visitorId, attributes } = useContext(FingerprintContext);

  const { darkPattern, lightPattern } = useContext(PatternContext);
  const [currAttribute, setCurrAttribute] = useState<FPAttributes | null>(null);

  const { globalPlayState, soundPlayStates, toggleGlobalPlay, toggleAttributePlay, isLoading } =
    useContext(SoundContext);

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
          className="shaped-1 font-heading bg-primary px-8 py-4"
          style={{ background: `url(${lightPattern})` }}
        >
          <h1 className="text-2xl">Hello Visitor {visitorId}!</h1>
        </div>
      </section>
      <section className="flex flex-col items-center">
        <ul className="box-border grid grid-cols-3 gap-8 p-4">
          <li>
            <FPAttribute
              isPlaying={soundPlayStates[FPAttributes.screenSize] === PlayState.STARTED}
              togglePlay={() => toggleAttributePlay(FPAttributes.screenSize)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.screenSize, isHover)}
              label={FPAttributes[FPAttributes.screenSize]}
            />
            <InfoBox show={currAttribute === FPAttributes.screenSize}>
              <h2>Screen Size</h2>
              <p>Desctiption</p>
              <p>Result: {attributes.get(FPAttributes.screenSize)}</p>
            </InfoBox>
          </li>

          <li>
            <FPAttribute
              isPlaying={soundPlayStates[FPAttributes.timeZone] === PlayState.STARTED}
              togglePlay={() => toggleAttributePlay(FPAttributes.timeZone)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.timeZone, isHover)}
              label={FPAttributes[FPAttributes.timeZone]}
            />
            <InfoBox show={currAttribute === FPAttributes.timeZone}>
              <p>TimeZone</p>
              <p>Desctiption</p>
              <p>Result: {attributes.get(FPAttributes.timeZone)}</p>
            </InfoBox>
          </li>

          <li>
            <FPAttribute
              isPlaying={soundPlayStates[FPAttributes.colorDepth] === PlayState.STARTED}
              togglePlay={() => toggleAttributePlay(FPAttributes.colorDepth)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.colorDepth, isHover)}
              label={FPAttributes[FPAttributes.colorDepth]}
            />
            <InfoBox show={currAttribute === FPAttributes.colorDepth}>
              <p>TimeZone</p>
              <p>Desctiption</p>
              <p>Result: {attributes.get(FPAttributes.colorDepth)}</p>
            </InfoBox>
          </li>

          <li>
            <FPAttribute
              isPlaying={soundPlayStates[FPAttributes.canvas2D] === PlayState.STARTED}
              togglePlay={() => toggleAttributePlay(FPAttributes.canvas2D)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.canvas2D, isHover)}
              label={FPAttributes[FPAttributes.canvas2D]}
            />
            <InfoBox show={currAttribute === FPAttributes.canvas2D}>
              <p>TimeZone</p>
              <p>Desctiption</p>
              <img src={attributes.get(FPAttributes.canvas2D) as string} alt="canvas 2D image" />
            </InfoBox>
          </li>

          <li>
            <FPAttribute
              isPlaying={soundPlayStates[FPAttributes.canvasWebGL] === PlayState.STARTED}
              togglePlay={() => toggleAttributePlay(FPAttributes.canvasWebGL)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.canvasWebGL, isHover)}
              label={FPAttributes[FPAttributes.canvasWebGL]}
            />
            <InfoBox show={currAttribute === FPAttributes.canvasWebGL}>
              <p>TimeZone</p>
              <p>Desctiption</p>
              <img
                src={attributes.get(FPAttributes.canvasWebGL) as string}
                alt="canvas webGL image"
              />
            </InfoBox>
          </li>

          <li>
            <FPAttribute
              isPlaying={soundPlayStates[FPAttributes.audioContext] === PlayState.STARTED}
              togglePlay={() => toggleAttributePlay(FPAttributes.audioContext)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.audioContext, isHover)}
              label={FPAttributes[FPAttributes.audioContext]}
            />
            <InfoBox show={currAttribute === FPAttributes.audioContext}>
              <p>Audio Context</p>
              <p>Desctiption</p>
              <img
                src={getAudioFPImageUrl(attributes.get(FPAttributes.audioContext))}
                alt="canvas webGL image"
              />
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
            {globalPlayState === PlayState.STARTED ? "Mute" : "Play"}
          </button>
          {isLoading && <span>Loading...</span>}
          <span>{PlayState[globalPlayState]}</span>
        </div>
      </section>
    </div>
  );
};

export default FingerprintSound;
