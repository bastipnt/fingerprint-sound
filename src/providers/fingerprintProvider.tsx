import { createContext, useEffect, useState, type ReactNode } from "react";
import Fingerprint from "../fingerprint";

export enum FPAttributes {
  "timeZone",
  "screenSize",
  "colorDepth",
  "canvas2D",
  "canvasWebGL",
  "audioContext",
}
export const FingerprintContext = createContext<{
  visitorId?: string;
}>({
  visitorId: undefined,
});

type Props = {
  children: ReactNode;
};

const FingerprintProvider: React.FC<Props> = ({ children }) => {
  const createFingerprint = async (): Promise<{
    visitorId: string;
  }> => {
    const fingerprint = new Fingerprint();
    await fingerprint.createFingerprint();
    const visitorId = fingerprint.fingerprintId || "";
    // const results = fingerprint.hashedAttributes;

    return { visitorId };
  };

  const [visitorId, setVisitorId] = useState<string>();

  useEffect(() => {
    createFingerprint().then((res) => {
      setVisitorId(res.visitorId);
    });
  }, []);

  return (
    <FingerprintContext.Provider value={{ visitorId }}>{children}</FingerprintContext.Provider>
  );
};

export default FingerprintProvider;
