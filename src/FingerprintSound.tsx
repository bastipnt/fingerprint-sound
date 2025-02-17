import { useCallback, useContext, useState } from "react";
import FPAttribute from "./components/FPAttribute";
import FPAttributeDetails from "./components/FPAttributeDetails";
import FPInfoSection from "./components/FPInfoSection";
import InfoText from "./components/InfoText";
import { FPAttributes } from "./fingerprint";
import fpDesctiptions from "./fpDescriptions.json";
import { FingerprintContext } from "./providers/fingerprintProvider";
import { PlayState, SoundContext } from "./providers/soundProvider";

const FingerprintSound: React.FC = ({}) => {
  const { visitorId, attributes } = useContext(FingerprintContext);
  const [currAttribute, setCurrAttribute] = useState<FPAttributes | null>(null);

  const {
    globalPlayState,
    soundPlayStates,
    unmuteAll,
    muteAll,
    toggleGlobalPlay,
    toggleAttributePlay,
    isLoading,
  } = useContext(SoundContext);

  const handleHover = (attributeKey: FPAttributes, isHover: boolean) => {
    if (!isHover) return setCurrAttribute(null);
    setCurrAttribute(attributeKey);
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
    <div className="grid h-screen grid-cols-[1fr_400px] grid-rows-[auto_1fr_auto] justify-center gap-12 p-24 pt-12">
      <section className="text-surface col-span-2 flex flex-row justify-center gap-4">
        <div className="edge-bottom-right edge-sm text-neutral flex flex-col gap-2 p-8">
          <h1 className="text-4xl">Hello Visitor:</h1>
          <h2 className="text-2xl">
            <InfoText infoText={visitorIdInfo}>{visitorId}</InfoText>
          </h2>
        </div>
      </section>
      <section className="flex flex-col items-center self-center">
        <ul className="box-border grid grid-cols-3 gap-8 p-4">
          {(Object.entries(FPAttributes) as Array<[keyof typeof FPAttributes, FPAttributes]>).map(
            ([attributeKey, attributeName]) => {
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
                </li>
              );
            },
          )}
        </ul>
      </section>

      <FPInfoSection attribute={currAttribute} />

      <section className="col-span-2 flex flex-row items-center justify-center gap-8">
        <button className="edgy-btn cursor-pointer px-8 py-2 text-lg" onClick={toggleGlobalPlay}>
          {globalPlayState === PlayState.STARTED
            ? "Mute"
            : globalPlayState === PlayState.STOPPED
              ? "Start"
              : "Unmute"}
        </button>
        <button className="edgy-btn cursor-pointer px-8 py-2 text-lg" onClick={unmuteAll}>
          Play all
        </button>
        <button className="edgy-btn cursor-pointer px-8 py-2 text-lg" onClick={muteAll}>
          Pause all
        </button>
      </section>

      <div className="fixed right-12 bottom-8">
        <p className="text-3xl">{isLoading ? "Loading..." : globalPlayState}</p>
      </div>
    </div>
  );
};

export default FingerprintSound;
