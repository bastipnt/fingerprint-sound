import { ReactNode, useContext, useEffect, useState } from "react";
import { PatternContext } from "../providers/patternProvider";
import { getDimensions } from "../util/canvas";

type Props = {
  children: ReactNode;
};

const InfoBox: React.FC<Props> = ({ children }) => {
  const { lightPattern } = useContext(PatternContext);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [screenPosition, setScreenPosition] = useState(["top", "left"]);

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      const { width, height } = getDimensions();
      let x = event.pageX;
      let y = event.pageY;
      const newScreenPosition = ["top", "left"];
      if (x > width / 2) {
        newScreenPosition[1] = "right";
        x = width - x;
      }
      if (y > height / 2) {
        newScreenPosition[0] = "bottom";
        y = height - y;
      }

      setMousePosition({ x, y });
      setScreenPosition(newScreenPosition);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div
      className="shaped pointer-events-none fixed z-30 w-[400px] max-w-[50vw] p-4"
      style={{
        background: `url(${lightPattern})`,
        [screenPosition[0]]: mousePosition.y,
        [screenPosition[1]]: mousePosition.x,
      }}
    >
      {children}
    </div>
  );
};

export default InfoBox;
