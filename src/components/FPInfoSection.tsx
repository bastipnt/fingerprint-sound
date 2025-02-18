import { ReactNode, useContext } from "react";
import { FPAttributes } from "../fingerprint";
import fpDesctiptions from "../fpDescriptions.json";
import { FingerprintContext } from "../providers/fingerprintProvider";
import { getAudioFPImageUrl } from "../util/audioFPCanvas";

type Props = {
  attribute: FPAttributes | null;
};

type InfoParts = { [key in FPAttributes]: ReactNode };

const FPInfoSection: React.FC<Props> = ({ attribute }) => {
  const { attributes } = useContext(FingerprintContext);

  const imageResultDisplay = (imgUrl?: string): ReactNode => (
    <div className="p-2">
      <div
        className="h-full w-full bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imgUrl}` }}
      >
        <h3 className="w-fit text-xl">Result:</h3>
      </div>
    </div>
  );

  const attributeResultDisplay = (attributeName: FPAttributes): ReactNode => {
    if (attributeName === FPAttributes.CANVAS_2D)
      return imageResultDisplay(attributes.get(FPAttributes.CANVAS_2D)?.ogValue);
    else if (attributeName === FPAttributes.CANVAS_WEBGL)
      return imageResultDisplay(attributes.get(FPAttributes.CANVAS_WEBGL)?.ogData as string);
    else if (attributeName === FPAttributes.AUDIO_CONTEXT)
      return imageResultDisplay(
        getAudioFPImageUrl(attributes.get(FPAttributes.AUDIO_CONTEXT)?.ogData),
      );
    else
      return (
        <div className="grid grid-rows-[auto_1fr] items-center p-2">
          <h3 className="mb-2 text-xl">Result:</h3>
          <p className="text-center text-2xl">{attributes.get(attributeName)?.ogValue}</p>
        </div>
      );
  };

  const infoParts: InfoParts = Object.values(FPAttributes).reduce(
    (prevInfoParts, attributeName) => {
      const attributeInfos = fpDesctiptions[attributeName];

      const newInfoPart = (
        <div className="grid grid-rows-[1fr_150px]">
          <div className="p-2">
            <p>{attributeInfos.description}</p>
            {"valueHint" in attributeInfos && <p>{attributeInfos.valueHint}</p>}
          </div>
          {attributeResultDisplay(attributeName)}
        </div>
      );

      return { ...prevInfoParts, [attributeName]: newInfoPart };
    },
    {} as InfoParts,
  );

  return (
    <section className="grid h-full max-h-96 grid-rows-[auto_1fr] self-center overflow-hidden border-4">
      <h2 className="border-b-4 px-2 text-2xl">
        Info:{attribute !== null && " " + fpDesctiptions[attribute].label}
      </h2>
      {attribute === null ? (
        <div className="flex flex-col gap-2 p-2">
          <p>Hover your mouse over a fingerprint attribute to see it's value.</p>
          <p>
            You can change the attribute value for screen size, timezone, and color depth to see how
            the fingerprint would change for another person.
          </p>
          <p>This will also slightly change the sound you are hearing.</p>
        </div>
      ) : (
        infoParts[attribute]
      )}
    </section>
  );
};

export default FPInfoSection;
