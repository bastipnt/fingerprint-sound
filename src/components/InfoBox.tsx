import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { PatternContext } from "../providers/patternProvider";
import { getDimensions } from "../util/canvas";

const SHOW_TIME = 1000;

type Props = {
  children: ReactNode;
  show?: boolean;
  onlyWhenMoving?: boolean;
};

const InfoBox: React.FC<Props> = ({ children, show, onlyWhenMoving }) => {
  const { darkPattern } = useContext(PatternContext);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [screenPosition, setScreenPosition] = useState(["top", "left"]);

  const mouseLastMovedAt = useRef<number | undefined>(undefined);
  const [moved, setMoved] = useState(false);

  const checkMouseMovement = () => {
    if (mouseLastMovedAt.current === undefined) return setMoved(false);
    if (Date.now() - mouseLastMovedAt.current > SHOW_TIME) return setMoved(false);
    setMoved(true);
  };

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
      mouseLastMovedAt.current = Date.now();
      checkMouseMovement();
    };

    window.addEventListener("mousemove", updateMousePosition);
    const mouseMoveUpdateInterval = setInterval(checkMouseMovement, SHOW_TIME);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      clearInterval(mouseMoveUpdateInterval);
    };
  }, []);

  return (
    <>
      {(show === true || show === undefined) && (onlyWhenMoving ? moved : true) && (
        <span
          className="shaped text-surface pointer-events-none fixed z-30 w-[400px] max-w-[50vw] p-2"
          style={{
            background: `url(${darkPattern})`,
            [screenPosition[0]]: mousePosition.y,
            [screenPosition[1]]: mousePosition.x,
          }}
        >
          {children}
        </span>
      )}
    </>
  );
};

export default InfoBox;
