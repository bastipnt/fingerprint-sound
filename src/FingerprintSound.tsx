import { ReactNode, useCallback, useContext, useState } from "react";
import FPAttribute from "./components/FPAttribute";
import FPAttributeDetails from "./components/FPAttributeDetails";
import InfoBox from "./components/InfoBox";
import InfoText from "./components/InfoText";
import { FPAttributes } from "./fingerprint";
import fpDesctiptions from "./fpDescriptions.json";
import { FingerprintContext } from "./providers/fingerprintProvider";
import { PlayState, SoundContext } from "./providers/soundProvider";
import { getAudioFPImageUrl } from "./util/audioFPCanvas";

const FingerprintSound: React.FC = ({}) => {
  const { visitorId, attributes } = useContext(FingerprintContext);
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

  const getAttributeOptions = useCallback(
    (attributeName: FPAttributes): string[] | undefined => {
      let options: string[] = [];
      const attributeInfos = fpDesctiptions[attributeName];

      if (attributeName === FPAttributes.TIMEZONE) {
        options = Intl.supportedValuesOf("timeZone").filter(
          (timezone) => timezone !== attributes.get(attributeName)?.ogValue,
        );
      } else if ("options" in attributeInfos) {
        options = attributeInfos.options;
      } else {
        return undefined;
      }

      return options.filter((option) => option !== attributes.get(attributeName)?.ogValue);
    },
    [attributes],
  );

  const visitorIdInfo = (
    <>
      <span>This is the visitor ID, created from your device fingerprint.</span>
    </>
  );

  return (
    <div className="grid h-screen grid-cols-[1fr_400px] grid-rows-[auto_1fr_auto] justify-center gap-8 p-24">
      {currAttribute === null && (
        <InfoBox offset={50} onlyWhenMoving>
          <p>Hover your mouse over a fingerprint attribute to see it's value.</p>
        </InfoBox>
      )}

      <section className="text-surface col-span-2 flex w-screen flex-row justify-center gap-4">
        <div className="edge-bottom-right edge-sm text-neutral flex flex-col gap-2 p-8">
          <h1 className="text-4xl">Hello Visitor:</h1>
          <h2 className="text-2xl">
            <InfoText
              onHover={(isHover: boolean) => handleHover("info", isHover)}
              infoText={visitorIdInfo}
            >
              {visitorId}
            </InfoText>
          </h2>
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
                      options={getAttributeOptions(attributeName)}
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

      <section className="border-4">Infooooo</section>

      <section className="col-span-2 flex w-screen flex-row justify-center gap-4">
        <div className="flex flex-row items-center gap-2 px-8 py-4">
          <button className="edgy-btn cursor-pointer px-8 py-2 text-lg" onClick={toggleGlobalPlay}>
            {globalPlayState === PlayState.STARTED ? "Mute" : "Play"}
          </button>
          <button className="edgy-btn cursor-pointer px-8 py-2 text-lg" onClick={unmuteAll}>
            Play all
          </button>
          <button className="edgy-btn cursor-pointer px-8 py-2 text-lg" onClick={muteAll}>
            Stop all
          </button>
          {isLoading && <span>Loading...</span>}
        </div>
      </section>

      <div className="fixed right-24 bottom-12">
        <p className="text-3xl">{globalPlayState}</p>
      </div>
    </div>
  );
};

export default FingerprintSound;
