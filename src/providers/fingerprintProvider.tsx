import { createContext, useEffect, useRef, useState, type ReactNode } from "react";
import Fingerprint, { FPAttributesMap, FPUpdateAttributesMap } from "../fingerprint";

export const FingerprintContext = createContext<{
  visitorId?: string;
  attributes: FPAttributesMap;
  updateFingerprint: (newFPValues: FPUpdateAttributesMap) => void;
}>({
  visitorId: undefined,
  attributes: new Map(),
  updateFingerprint: () => {},
});

type Props = {
  children: ReactNode;
};

const FingerprintProvider: React.FC<Props> = ({ children }) => {
  const fingerprint = useRef<Fingerprint>(null);
  const [visitorId, setVisitorId] = useState<string>();
  const [attributes, setAttributes] = useState<FPAttributesMap>(new Map());

  const createFingerprint = async (): Promise<void> => {
    fingerprint.current = new Fingerprint();
    await fingerprint.current.createFingerprint();

    setVisitorId(fingerprint.current.fingerprintId || "No Id");
    setAttributes(fingerprint.current.attributes);
  };

  const updateFingerprint = (newFPValues: FPUpdateAttributesMap) => {
    if (!fingerprint.current) return;
    fingerprint.current.updateFingerprint(newFPValues);

    setVisitorId(fingerprint.current.fingerprintId || "No Id");
    setAttributes(new Map(fingerprint.current.attributes));
  };

  useEffect(() => {
    createFingerprint();
  }, []);

  return (
    <FingerprintContext.Provider value={{ visitorId, attributes, updateFingerprint }}>
      {children}
    </FingerprintContext.Provider>
  );
};

export default FingerprintProvider;
