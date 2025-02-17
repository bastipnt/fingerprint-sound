import { useCallback, useState } from "react";
import { Link } from "wouter";
import InfoText from "./components/InfoText";
import "./Welcome.css";

const Welcome: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const taretedAdvertisingInfo = (
    <>
      <i>Targeted Advertising:</i>{" "}
      <span>Is a form of advertising, that is tailored to a specific group or person.</span>
    </>
  );

  const trackingInfo = (
    <>
      <i>Tracking:</i>{" "}
      <span>
        Is the practice of collecting, storing, and sharing information about website visitors.
      </span>
    </>
  );

  const cookiesInfo = (
    <>
      <i>Cookies:</i>{" "}
      <span>
        Small blocks of data, created by a web server, stored in a users browser when visiting a
        website.
      </span>
    </>
  );

  const deviceFingerprintingInfo = (
    <>
      <i>Device Fingerprint:</i>{" "}
      <span>
        Information collected about the software and hardware of a device for the purpose of
        identification.
      </span>
    </>
  );

  const javaScriptInfo = (
    <>
      <i>JavaScript:</i> <span>Is a programming language and core technology of the Web.</span>
    </>
  );

  const enthropyInfo = (
    <>
      <i>Enthropy:</i>{" "}
      <span>
        Can quantify the information associated with a variable. The lower, the more uncertain is an
        information.
      </span>
    </>
  );

  const pages = [
    <>
      <span>
        <h1 className="mb-2 text-4xl">Hello Visitor...</h1>
        <h2 className="text-xl">Welcome to Fingerprint Sound!</h2>
      </span>
      <p>
        This website is the main project of my masters thesis about <i>targeted advertising</i> and{" "}
        <i>tracking</i>.
      </p>
      <p>
        You never heard of{" "}
        <InfoText infoText={taretedAdvertisingInfo}>targeted advertising</InfoText> or{" "}
        <InfoText infoText={trackingInfo}>tracking</InfoText>? No problem, you can hover over the
        terms with your mouse and they will be explained.
      </p>
      <p>
        I'm sure you have already heared about <InfoText infoText={cookiesInfo}>cookies</InfoText>{" "}
        tho? <i>Cookies</i> can be used for <i>tracking</i>! But <i>cookies</i> are not cool
        anymore, the tracking industry came up with a much better approach to track people's online
        behaviour. Let me introduce to you{" "}
        <InfoText infoText={deviceFingerprintingInfo}>device fingerprinting</InfoText> on the next
        page.
      </p>
    </>,

    <>
      <span>
        <h1 className="mb-2 text-4xl">Device Fingerprinting...</h1>
        <h2 className="text-xl">A sneaky tracking method</h2>
      </span>
      <p>
        You can imagine a device fingerprint (also called browser fingerprint) similar to a real
        fingerprint in the sense, that both are unique.
      </p>
      <p>
        A device fingerprint is an identifier, that can track your used device across multiple web
        pages. It doesn't need to store any information on your computer to be able to do that.
      </p>
      <p>
        This is the great advantage compared to <InfoText infoText={cookiesInfo}>cookies</InfoText>.
        To create such a <i>fingerprint</i> all there is to do is to combine information about your
        browser and device, that can be accest with{" "}
        <InfoText infoText={javaScriptInfo}>JavaScript</InfoText>. The information used is chosen
        wisely in a way, that it doesn't change often and provides maximum{" "}
        <InfoText infoText={enthropyInfo}>enthropy</InfoText>.
      </p>
    </>,

    <>
      <span>
        <h1 className="mb-2 text-4xl">About my Project...</h1>
      </span>
      <p>
        The aim of this website is providing a non technical way to teach about web tracking and
        especially device fingerprinting.
      </p>
      <p>
        After this introduction you can experience the often invisible device fingerprint yourself.
        I picked six attributes, that are commingly used for device fingerprinting. These attributes
        can be used on the next page to create sounds and visuals.
      </p>
      <p>
        Each attribute alone will sound boring, but all attributes together will create a whole
        composition. Just like attributes in a device fingerprint don't provide much value alone,
        but in combination can identify a person.
      </p>
    </>,
  ];

  const next = useCallback(() => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage < pages.length ? nextPage : currentPage);
  }, [currentPage]);

  return (
    <>
      <main className="box-border flex h-screen w-screen max-w-3xl flex-col items-center justify-center gap-12 p-12 pt-28">
        <div className="edge-bottom-right flex w-fit flex-col gap-8 p-8 pr-12">
          {pages[currentPage]}
        </div>

        <div className="flex w-full flex-col items-end justify-end p-2">
          {currentPage === pages.length - 1 ? (
            <Link className="edgy-btn w-fit cursor-pointer p-4 text-lg" to="/fp-sound">
              Next
            </Link>
          ) : (
            <button className="edgy-btn w-fit cursor-pointer px-8 py-2 text-lg" onClick={next}>
              Next
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default Welcome;
