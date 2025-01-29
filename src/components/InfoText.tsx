import { ReactNode, useState } from "react";
import InfoBox from "./InfoBox";

type Props = {
  children: ReactNode;
  infoText: ReactNode;
};

const InfoText: React.FC<Props> = ({ children, infoText }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <b
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="hover:bg-neutral hover:text-surface cursor-help p-0.5 underline hover:no-underline"
      >
        {children}
      </b>
      <InfoBox show={show}>{infoText}</InfoBox>
    </>
  );
};

export default InfoText;
