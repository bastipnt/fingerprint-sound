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
      const offset = 20;
      const { width, height } = getDimensions();
      const mouseX = event.pageX;
      const mouseY = event.pageY;

      let x = mouseX + offset;
      let y = mouseY + offset;

      const newScreenPosition = ["top", "left"];
      if (mouseX > width / 2) {
        newScreenPosition[1] = "right";
        x = width - mouseX + offset;
      }
      if (mouseY > height / 2) {
        newScreenPosition[0] = "bottom";
        y = height - mouseY + offset;
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
          className="shaped text-surface pointer-events-none fixed z-10 block w-[400px] max-w-[50vw]"
          style={{
            [screenPosition[0]]: mousePosition.y,
            [screenPosition[1]]: mousePosition.x,
          }}
        >
          <span className="relative z-40 block p-4 text-left text-base">{children}</span>
          <span
            className="absolute top-0 left-0 z-30 h-100 w-100 opacity-70"
            style={{ background: `url(${darkPattern})` }}
          ></span>
        </span>
      )}
    </>
  );
};

export default InfoBox;
