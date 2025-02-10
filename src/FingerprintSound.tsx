import { ChangeEvent, useContext, useState } from "react";
import FPAttribute from "./components/FPAttribute";
import InfoBox from "./components/InfoBox";
import InfoText from "./components/InfoText";
import { FPAttributes, FPUpdateAttributes, FPUpdateAttributesMap } from "./fingerprint";
import { FingerprintContext } from "./providers/fingerprintProvider";
import { PatternContext } from "./providers/patternProvider";
import { PlayState, SoundContext } from "./providers/soundProvider";
import screenResolutions from "./screenResolutions.json"; // from here: https://www.browserstack.com/guide/common-screen-resolutions
import { getAudioFPImageUrl } from "./util/audioFPCanvas";

const FingerprintSound: React.FC = ({}) => {
  const { visitorId, attributes, updateFingerprint } = useContext(FingerprintContext);

  const { darkPattern, lightPattern } = useContext(PatternContext);
  const [currAttribute, setCurrAttribute] = useState<FPAttributes | null | "info">(null);

  const { globalPlayState, SoundPlayStatess, toggleGlobalPlay, toggleAttributePlay, isLoading } =
    useContext(SoundContext);

  const handleHover = (attributeKey: FPAttributes | "info", isHover: boolean) => {
    if (!isHover) return setCurrAttribute(null);
    setCurrAttribute(attributeKey);
  };

  const handleAttributeChange = (attributeKey: FPUpdateAttributes, e: ChangeEvent) => {
    const newValue = (e.target as HTMLSelectElement).value;
    console.log(FPAttributes[attributeKey], newValue);

    const updateValues: FPUpdateAttributesMap = new Map();
    updateValues.set(attributeKey, newValue);
    updateFingerprint(updateValues);
  };

  const visitorIdInfo = (
    <>
      <span>This is the visitor ID, created from your device fingerprint.</span>
    </>
  );

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] flex-col items-center justify-center py-24">
      {currAttribute === null && (
        <InfoBox onlyWhenMoving>
          <p>Hover your mouse over a fingerprint attribute to see it's value.</p>
        </InfoBox>
      )}

      <section className="text-surface flex w-screen flex-row justify-center gap-4">
        <div
          className="font-heading bg-primary px-8 py-4"
          style={{ background: `url(${lightPattern})` }}
        >
          <h1 className="text-center text-2xl">
            Hello Visitor
            <br />
            <InfoText
              onHover={(isHover: boolean) => handleHover("info", isHover)}
              infoText={visitorIdInfo}
            >
              {visitorId}
            </InfoText>
          </h1>
        </div>
      </section>
      <section className="flex flex-col items-center">
        <ul className="box-border grid grid-cols-3 gap-8 p-4">
          <li>
            <FPAttribute
              isPlaying={SoundPlayStatess[FPAttributes.screenSize] === PlayState.STARTED}
              // togglePlay={() => toggleAttributePlay(FPAttributes.screenSize)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.screenSize, isHover)}
              label={FPAttributes[FPAttributes.screenSize]}
            >
              <div className="grid-rows[auto_1fr_auto] grid h-full gap-2">
                <h2>{FPAttributes[FPAttributes.screenSize]}</h2>
                <select
                  onChange={(e) => handleAttributeChange(FPAttributes.screenSize, e)}
                  className="cursor-pointer"
                  name={FPAttributes[FPAttributes.screenSize]}
                  value={
                    attributes.get(FPAttributes.screenSize)?.updatedValue ||
                    attributes.get(FPAttributes.screenSize)?.ogValue
                  }
                >
                  <option value={attributes.get(FPAttributes.screenSize)?.ogValue}>
                    {attributes.get(FPAttributes.screenSize)?.ogValue}
                  </option>
                  <option disabled>──────────</option>
                  {screenResolutions.map((screenResolution) => (
                    <option key={screenResolution} value={screenResolution}>
                      {screenResolution}
                    </option>
                  ))}
                </select>
                <button
                  className="cursor-pointer"
                  onClick={() => toggleAttributePlay(FPAttributes.screenSize)}
                >
                  {SoundPlayStatess[FPAttributes.screenSize] === PlayState.STARTED
                    ? "Pause"
                    : "Play"}
                </button>
              </div>
            </FPAttribute>
            <InfoBox show={currAttribute === FPAttributes.screenSize}>
              <h2>Screen Size</h2>
              <p>Desctiption</p>
              <p>Result: {attributes.get(FPAttributes.screenSize)?.ogValue}</p>
            </InfoBox>
          </li>

          <li>
            <FPAttribute
              isPlaying={SoundPlayStatess[FPAttributes.timeZone] === PlayState.STARTED}
              togglePlay={() => toggleAttributePlay(FPAttributes.timeZone)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.timeZone, isHover)}
              label={FPAttributes[FPAttributes.timeZone]}
            />
            <InfoBox show={currAttribute === FPAttributes.timeZone}>
              <p>TimeZone</p>
              <p>Desctiption</p>
              <p>Result: {attributes.get(FPAttributes.timeZone)?.ogValue}</p>
            </InfoBox>
          </li>

          <li>
            <FPAttribute
              isPlaying={SoundPlayStatess[FPAttributes.colorDepth] === PlayState.STARTED}
              togglePlay={() => toggleAttributePlay(FPAttributes.colorDepth)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.colorDepth, isHover)}
              label={FPAttributes[FPAttributes.colorDepth]}
            />
            <InfoBox show={currAttribute === FPAttributes.colorDepth}>
              <p>TimeZone</p>
              <p>Desctiption</p>
              <p>Result: {attributes.get(FPAttributes.colorDepth)?.ogValue}</p>
            </InfoBox>
          </li>

          <li>
            <FPAttribute
              isPlaying={SoundPlayStatess[FPAttributes.canvas2D] === PlayState.STARTED}
              togglePlay={() => toggleAttributePlay(FPAttributes.canvas2D)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.canvas2D, isHover)}
              label={FPAttributes[FPAttributes.canvas2D]}
            />
            <InfoBox show={currAttribute === FPAttributes.canvas2D}>
              <p>TimeZone</p>
              <p>Desctiption</p>
              <img src={attributes.get(FPAttributes.canvas2D)?.ogValue} alt="canvas 2D image" />
            </InfoBox>
          </li>

          <li>
            <FPAttribute
              isPlaying={SoundPlayStatess[FPAttributes.canvasWebGL] === PlayState.STARTED}
              togglePlay={() => toggleAttributePlay(FPAttributes.canvasWebGL)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.canvasWebGL, isHover)}
              label={FPAttributes[FPAttributes.canvasWebGL]}
            />
            <InfoBox show={currAttribute === FPAttributes.canvasWebGL}>
              <p>TimeZone</p>
              <p>Desctiption</p>
              <img
                src={attributes.get(FPAttributes.canvasWebGL)?.ogData as string}
                alt="canvas webGL image"
              />
            </InfoBox>
          </li>

          <li>
            <FPAttribute
              isPlaying={SoundPlayStatess[FPAttributes.audioContext] === PlayState.STARTED}
              togglePlay={() => toggleAttributePlay(FPAttributes.audioContext)}
              onHover={(isHover: boolean) => handleHover(FPAttributes.audioContext, isHover)}
              label={FPAttributes[FPAttributes.audioContext]}
            />
            <InfoBox show={currAttribute === FPAttributes.audioContext}>
              <p>Audio Context</p>
              <p>Desctiption</p>
              <img
                src={getAudioFPImageUrl(attributes.get(FPAttributes.audioContext)?.ogData)}
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
