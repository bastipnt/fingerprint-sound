import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { createContext, useEffect, useState, type ReactNode } from "react";

export enum FPAttributes {
  "timeZone",
  "screenSize",
  "colorDepth",
  "canvas2D",
  "canvasWebGL",
  "audioContext",
}

// export type FPComponents = GetResult["components"] & {
//   fonts: { value: string[] };
//   languages: { value: Array<string[]> };
//   timezone: { value: string };
//   osCpu: { value: string };
//   canvas: { value: { winding: boolean; geometry: string; text: string } };
//   audio: { value: number };
// };

// type FPComponent = {
//   name: string;
//   value: string;
// };

export const FingerprintContext = createContext<{
  visitorId?: string;
  // components?: FPComponents;
  // fingerprintArr: FPComponent[];
  // getAttributes: (attributes: (keyof FPComponents)[]) => Partial<FPComponents>;
}>({
  visitorId: undefined,
  // components: undefined,
  // fingerprintArr: [],
  // getAttributes: () => ({}),
});

type Props = {
  children: ReactNode;
};

const FingerprintProvider: React.FC<Props> = ({ children }) => {
  const createFingerprint = async (): Promise<{
    visitorId: string;
    // fingerprintArr: FPComponent[];
    // components: FPComponents;
  }> => {
    const fingerprintAgent = await FingerprintJS.load();
    const results = await fingerprintAgent.get();
    // const components = results.components as FPComponents;
    const visitorId = results.visitorId;

    // console.log(components);
    // console.log(Object.keys(components).length);

    // const fingerprintArr = Object.entries(components).map(([componentName, component]) => {
    //   const name = componentName;
    //   let value = ("value" in component ? component.value : "Unknown") ?? "Undefined";

    //   if (typeof value === "object") value = "Object";
    //   else if (typeof value === "boolean") value = value ? "True" : "False";
    //   else if (value === "") value = "Empty";
    //   else if (typeof value === "number") value = value.toString();

    //   const fpComponent: FPComponent = { name, value };

    //   return fpComponent;
    // });

    // console.log(fingerprintArr);

    return { visitorId };
  };

  // const [fingerprintArr, setFingerprintArr] = useState<FPComponent[]>([]);
  const [visitorId, setVisitorId] = useState<string>();
  // const [components, setComponents] = useState<FPComponents>();

  useEffect(() => {
    createFingerprint().then((res) => {
      setVisitorId(res.visitorId);
      // setFingerprintArr(res.fingerprintArr);
      // setComponents(res.components);
    });
  }, []);

  // const getAttributes = useCallback(
  //   (attributeKeys: (keyof FPComponents)[]): Partial<FPComponents> => {
  //     if (!components) return {};

  //     const attributes = attributeKeys.reduce((prev, key) => {
  //       if (key in components) return { ...prev, [key]: components[key] };

  //       return prev;
  //     }, {});

  //     return attributes;
  //   },
  //   [components],
  // );

  return (
    <FingerprintContext.Provider value={{ visitorId }}>{children}</FingerprintContext.Provider>
  );
};

export default FingerprintProvider;
