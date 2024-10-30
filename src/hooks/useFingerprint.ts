import { useState } from "react";
import Fingerprint from "../fingerprint/inxex";
import { FPAreas, FPValue } from "../fingerprint/types";

const useFingerprint = () => {
  const fingerprinter = new Fingerprint();
  const [fingerprint, setFingerprint] = useState<Map<FPAreas, FPValue[]>>();

  const createFingerprint = () => {
    fingerprinter.create();
    setFingerprint(fingerprinter.fingerprint);
  };

  return { createFingerprint, fingerprint };
};

export default useFingerprint;
