import { useRef } from "react";
import type MyTone from "../tone";

const useTonejs = () => {
  const myToneRef = useRef<MyTone>();

  const init = async () => {
    const MyTone = (await import("../tone")).default;
    await MyTone.init();
    myToneRef.current = new MyTone();
  };

  return { init, myToneRef };
};

export default useTonejs;
