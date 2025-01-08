import { useContext } from "react";
import { FingerprintContext } from "./providers/fingerprintProvider";

const FingerprintAdvanced: React.FC = () => {
  const { fingerprintArr, visitorId } = useContext(FingerprintContext);

  return (
    <>
      <h1>Hello Visitor {visitorId}!</h1>
      <ul>
        {fingerprintArr.map(({ name, value }) => (
          <li key={name}>
            {name}: {value}
          </li>
        ))}
      </ul>
    </>
  );
};

export default FingerprintAdvanced;
