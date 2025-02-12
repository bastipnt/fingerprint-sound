import { useContext } from "react";
import { PatternContext } from "./providers/patternProvider";

const Info: React.FC = () => {
  const { darkPattern } = useContext(PatternContext);

  return (
    <>
      <main className="box-border flex h-screen w-screen max-w-[80vw] flex-col items-center justify-center gap-12 p-12 pt-28">
        <div
          className="text-surface flex w-fit flex-col gap-4 p-8"
          style={{ background: `url(${darkPattern})` }}
        >
          <h1>More Info</h1>
          <p>TBD provide more info</p>
        </div>
      </main>
    </>
  );
};

export default Info;
