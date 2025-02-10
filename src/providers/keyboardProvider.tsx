import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

export const KeyboardContext = createContext<{
  keysPressed: (key: string | string[]) => boolean;
  keys: Map<string, boolean>;
  setCapture: (capture: boolean) => void;
  mousePosition: [number, number];
}>({
  keysPressed: () => false,
  keys: new Map<string, boolean>(),
  setCapture: () => {},
  mousePosition: [0, 0],
});

type Props = {
  children: ReactNode;
};

const KeyboardProvider: React.FC<Props> = ({ children }) => {
  const [keys, setKeys] = useState<Map<string, boolean>>(new Map<string, boolean>());
  const [capture, setCapture] = useState(true);
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const innerKeys = new Map<string, boolean>();

    function handleKeyDown(e: KeyboardEvent) {
      if (!e.key) return;
      // console.log(e.key);
      innerKeys.set(e.key, e.type === "keydown");

      setKeys(new Map(innerKeys));
    }

    const handleKeyUp = handleKeyDown;

    function handleMouseMove(e: MouseEvent) {
      // setMousePosition([e.clientX, e.clientY]);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("mousemove", handleMouseMove);
      setKeys(new Map<string, boolean>());
    };
  }, []);

  // const toggleFullScreen = () => {
  //   if (!document.fullscreenElement) {
  //     document.documentElement.requestFullscreen();
  //   } else if (document.exitFullscreen) {
  //     document.exitFullscreen();
  //   }
  // };

  const keysPressed = useCallback(
    (key: string | string[]): boolean => {
      if (typeof key === "string") {
        if (!capture) return false;
        return !!keys.get(key);
      }

      return key.map((k) => keys.get(k)).every((value) => value);
    },
    [keys, capture],
  );

  // useEffect(() => {
  //   console.log(keys);

  //   // if (keyPressed(["Meta", "#"])) setTtsEnabled((ttsEnabled) => !ttsEnabled);
  //   // if (keyPressed("+")) toggleFullScreen();
  // }, [keys]);

  return (
    <KeyboardContext.Provider value={{ keysPressed, setCapture, keys, mousePosition }}>
      {children}
    </KeyboardContext.Provider>
  );
};

export default KeyboardProvider;
