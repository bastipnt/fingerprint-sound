import { createContext, useEffect, useState, type ReactNode } from "react";
import Fingerprint, { FPAttributes } from "../fingerprint";

export const FingerprintContext = createContext<{
  visitorId?: string;
  attributes: Map<FPAttributes, string | Float32Array>;
}>({
  visitorId: undefined,
  attributes: new Map<FPAttributes, string | Float32Array>(),
});

type Props = {
  children: ReactNode;
};

const FingerprintProvider: React.FC<Props> = ({ children }) => {
  const createFingerprint = async (): Promise<Fingerprint> => {
    const fingerprint = new Fingerprint();
    await fingerprint.createFingerprint();

    return fingerprint;
  };

  const [visitorId, setVisitorId] = useState<string>();
  const [attributes, setAttributes] = useState(new Map<FPAttributes, string | Float32Array>());

  useEffect(() => {
    createFingerprint().then((fingerprint) => {
      setVisitorId(fingerprint.fingerprintId || "No Id");
      setAttributes(fingerprint.attributes);
    });
  }, []);

  return (
    <FingerprintContext.Provider value={{ visitorId, attributes }}>
      {children}
    </FingerprintContext.Provider>
  );
};

export default FingerprintProvider;
