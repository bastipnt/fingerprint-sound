import { useCallback, useContext, useState } from "react";
import { Link } from "wouter";
import InfoText from "./components/InfoText";
import { FingerprintContext } from "./providers/fingerprintProvider";
import { PatternContext } from "./providers/patternProvider";

const Welcome: React.FC = () => {
  const { secondaryPattern } = useContext(PatternContext);
  const { visitorId } = useContext(FingerprintContext);
  const [currentPage, setCurrentPage] = useState(0);

  const taretedAdvertisingInfo = (
    <>
      <b>Targeted Advertising:</b>
      <span>Is the practice of...</span>
    </>
  );

  const trackingInfo = (
    <>
      <b>Tracking:</b>
      <span>Is the practice of...</span>
    </>
  );

  const cookiesInfo = (
    <>
      <b>Cookies:</b>
      <span>Is the practice of...</span>
    </>
  );

  const deviceFingerprintingInfo = (
    <>
      <b>Device Fingerprint:</b>
      <span>Is the practice of...</span>
    </>
  );

  const javaScriptInfo = (
    <>
      <b>JavaScript:</b>
      <span>Is the practice of...</span>
    </>
  );

  const enthropyInfo = (
    <>
      <b>Enthropy:</b>
      <span>Is the practice of...</span>
    </>
  );

  const pages = [
    <>
      <div
        className="shaped text-surface w-fit p-8 text-2xl"
        style={{ background: `url(${secondaryPattern})` }}
      >
        <h1 className="mb-2 text-2xl">Hello Visitor...</h1>
        <h2 className="text-xl">Welcome to Fingerprint Sound!</h2>
      </div>
      <div className="flex flex-col gap-4">
        <p>
          This website is the main project of my masters thesis about <b>targeted advertising</b>{" "}
          and <b>tracking</b>.
        </p>
        <p>
          You never heard of{" "}
          <InfoText infoText={taretedAdvertisingInfo}>targeted advertising</InfoText> or{" "}
          <InfoText infoText={trackingInfo}>tracking</InfoText>? No problem, you can hover over the
          terms with your mouse and they will be explained.
        </p>
        <p>
          I'm sure you have already heared about <InfoText infoText={cookiesInfo}>cookies</InfoText>{" "}
          tho? <b>Cookies</b> can be used for <b>tracking</b>! But <b>cookies</b> are not cool
          anymore, the tracking industry came up with a much better approach to track people's
          online behaviour. Let me introduce to you{" "}
          <InfoText infoText={deviceFingerprintingInfo}>device fingerprinting</InfoText> on the next
          page.
        </p>
      </div>
    </>,

    <>
      <div
        className="shaped text-surface w-fit p-8 text-2xl"
        style={{ background: `url(${secondaryPattern})` }}
      >
        <h1 className="mb-2 text-2xl">Device Fingerprinting...</h1>
        <h2 className="text-xl">A sneaky tracking method</h2>
      </div>
      <div className="flex flex-col gap-4">
        <p>
          You can imagine a <b>device fingerprint</b> (also called browser fingerprint) similar to a
          real fingerprint in the sense, that both are unique. A <b>device fingerprint</b> is an
          identifier, that can track your used device across multiple web pages. It doesn't need to
          store any information on your computer to be able to do that. This is the great advantage
          compared to <InfoText infoText={cookiesInfo}>cookies</InfoText>. To create such a{" "}
          <b>fingerprint</b> all there is to do is to combine information about your browser and
          devide, that can be accest with <InfoText infoText={javaScriptInfo}>JavaScript</InfoText>.
          The information used is chosen wisely in a way, that it doesn't change often and provides
          maximum <InfoText infoText={enthropyInfo}>enthropy</InfoText>.
        </p>
      </div>
    </>,

    <>
      <div
        className="shaped text-surface w-fit p-8 text-2xl"
        style={{ background: `url(${secondaryPattern})` }}
      >
        <h1 className="mb-2 text-2xl">About my Project...</h1>
      </div>
      <div className="flex flex-col gap-4">
        <p>About</p>
      </div>
    </>,
  ];

  const next = useCallback(() => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage < pages.length ? nextPage : currentPage);
  }, [currentPage]);

  return (
    <>
      <main className="box-border flex h-screen w-screen max-w-[80vw] flex-col items-center justify-start gap-12 p-12 pt-28">
        {pages[currentPage]}

        <div className="flex w-full flex-col items-end justify-end p-2">
          {currentPage === pages.length - 1 ? (
            <Link
              className="text-surface w-fit cursor-pointer p-4"
              style={{ background: `url(${secondaryPattern})` }}
              to="/fp-sound"
            >
              Next
            </Link>
          ) : (
            <button
              className="text-surface w-fit cursor-pointer p-4"
              style={{ background: `url(${secondaryPattern})` }}
              onClick={next}
            >
              Next
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default Welcome;
