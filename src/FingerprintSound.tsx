import { ReactNode, useContext, useState } from "react";
import FPAttribute from "./components/FPAttribute";
import FPAttributeDetails from "./components/FPAttributeDetails";
import InfoBox from "./components/InfoBox";
import InfoText from "./components/InfoText";
import { FPAttributes } from "./fingerprint";
import fpDesctiptions from "./fpDescriptions.json";
import { FingerprintContext } from "./providers/fingerprintProvider";
import { PatternContext } from "./providers/patternProvider";
import { PlayState, SoundContext } from "./providers/soundProvider";
import { getAudioFPImageUrl } from "./util/audioFPCanvas";

const FingerprintSound: React.FC = ({}) => {
  const { visitorId, attributes } = useContext(FingerprintContext);

  const { darkPattern, lightPattern } = useContext(PatternContext);
  const [currAttribute, setCurrAttribute] = useState<FPAttributes | null | "info">(null);

  const {
    globalPlayState,
    soundPlayStates,
    unmuteAll,
    muteAll,
    toggleGlobalPlay,
    toggleAttributePlay,
    isLoading,
  } = useContext(SoundContext);

  const handleHover = (attributeKey: FPAttributes | "info", isHover: boolean) => {
    if (!isHover) return setCurrAttribute(null);
    setCurrAttribute(attributeKey);
  };

  const attributeResultDisplay = (attributeName: FPAttributes): ReactNode | string => {
    if (attributeName === FPAttributes.CANVAS_2D)
      return <img src={attributes.get(FPAttributes.CANVAS_2D)?.ogValue} alt="canvas 2D image" />;
    else if (attributeName === FPAttributes.CANVAS_WEBGL)
      return (
        <img
          src={attributes.get(FPAttributes.CANVAS_WEBGL)?.ogData as string}
          alt="canvas webGL image"
        />
      );
    else if (attributeName === FPAttributes.AUDIO_CONTEXT)
      return (
        <img
          src={getAudioFPImageUrl(attributes.get(FPAttributes.AUDIO_CONTEXT)?.ogData)}
          alt="audio context image"
        />
      );
    else return attributes.get(attributeName)?.ogValue;
  };

  const visitorIdInfo = (
    <>
      <span>This is the visitor ID, created from your device fingerprint.</span>
    </>
  );

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] flex-col items-center justify-center py-24">
      {currAttribute === null && (
        <InfoBox offset={50} onlyWhenMoving>
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
          {(Object.entries(FPAttributes) as Array<[keyof typeof FPAttributes, FPAttributes]>).map(
            ([attributeKey, attributeName]) => {
              const attributeInfos = fpDesctiptions[attributeName];
              const playState = soundPlayStates[attributeName];
              return (
                <li key={attributeKey}>
                  <FPAttribute
                    isPlaying={playState === PlayState.STARTED}
                    onHover={(isHover: boolean) => handleHover(attributeName, isHover)}
                    label={attributeName}
                  >
                    <FPAttributeDetails
                      attributeName={attributeName}
                      toggleAttributePlay={toggleAttributePlay}
                      state={playState}
                      options={"options" in attributeInfos ? attributeInfos.options : undefined}
                    />
                  </FPAttribute>
                  <InfoBox show={currAttribute === attributeName} offset={50}>
                    <h2>{attributeInfos.label}</h2>
                    <p>{attributeInfos.description}</p>
                    <p>Result: {attributeResultDisplay(attributeName)}</p>
                  </InfoBox>
                </li>
              );
            },
          )}
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
          <button className="bg-surface text-primary p-2" onClick={unmuteAll}>
            Play all
          </button>
          <button className="bg-surface text-primary p-2" onClick={muteAll}>
            Stop all
          </button>
          {isLoading && <span>Loading...</span>}
          <span>{globalPlayState}</span>
        </div>
      </section>
    </div>
  );
};

export default FingerprintSound;
