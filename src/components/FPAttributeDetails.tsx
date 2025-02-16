import { FormEvent, useContext, useEffect, useState } from "react";
import { FPAttributes, FPUpdateAttributes, FPUpdateAttributesMap, FPValue } from "../fingerprint";
import { FingerprintContext } from "../providers/fingerprintProvider";
import { PlayState } from "../providers/soundProvider";

type Props = {
  attributeName: FPAttributes;
  toggleAttributePlay: (attributeName: FPAttributes) => void;
  state?: PlayState;
  options?: string[];
};

const FPAttributeDetails: React.FC<Props> = ({
  attributeName,
  options,
  toggleAttributePlay,
  state,
}) => {
  const { attributes, updateFingerprint } = useContext(FingerprintContext);
  const [attributeValue, setAttributeValue] = useState<FPValue>();

  const handleAttributeChange = (e: FormEvent<HTMLSelectElement>) => {
    const newValue = e.currentTarget.value;

    const updateValues: FPUpdateAttributesMap = new Map();
    updateValues.set(attributeName as FPUpdateAttributes, newValue);
    updateFingerprint(updateValues);
  };

  useEffect(() => {
    const val = attributes.get(attributeName);
    if (!val) return;

    setAttributeValue(val);
  }, [attributes]);

  return (
    <div className="flex h-full w-full flex-col justify-between gap-4">
      <h3 className="pt-4 text-xl">{attributeName}</h3>

      {options && (
        <div className="px-4">
          <select
            onChange={(e) => handleAttributeChange(e)}
            className="w-full cursor-pointer border p-2 overflow-ellipsis"
            name={attributeName}
            value={attributeValue?.updatedValue || attributeValue?.ogValue}
          >
            <option value={attributeValue?.ogValue}>{attributeValue?.ogValue}</option>
            <option disabled>──────────</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        className="bg-primary cursor-pointer p-2"
        onClick={() => toggleAttributePlay(attributeName)}
      >
        {state === PlayState.STARTED ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default FPAttributeDetails;
