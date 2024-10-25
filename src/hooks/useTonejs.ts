import { useRef, useState } from "react";
import type MyTone from "../tone";

const useTonejs = () => {
  const myToneRef = useRef<MyTone>();
  const [isLoading, setIsLoading] = useState(false);

  const init = async () => {
    const MyTone = (await import("../tone")).default;
    await MyTone.init();
    myToneRef.current = new MyTone(setIsLoading);
  };

  return { init, myToneRef, isLoading };
};

export default useTonejs;
