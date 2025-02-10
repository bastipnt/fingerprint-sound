import { ReactNode, useState } from "react";
import InfoBox from "./InfoBox";

type Props = {
  children: ReactNode;
  infoText: ReactNode;
  onHover?: (isHover: boolean) => void;
};

const InfoText: React.FC<Props> = ({ children, infoText, onHover }) => {
  const [show, setShow] = useState(false);

  const toggleHover = (isHover: boolean) => {
    setShow(isHover);
    if (onHover !== undefined) onHover(isHover);
  };

  return (
    <>
      <b
        onMouseEnter={() => toggleHover(true)}
        onMouseLeave={() => toggleHover(false)}
        className="hover:bg-neutral hover:text-surface cursor-help p-0.5 underline hover:no-underline"
      >
        {children}
      </b>
      <InfoBox show={show}>{infoText}</InfoBox>
    </>
  );
};

export default InfoText;
