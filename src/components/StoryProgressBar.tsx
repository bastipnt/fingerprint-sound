import { useEffect, useRef, useState } from "react";

const INTERVAL_MS = 10;

type Props = {
  duration: number;
  isCurrent: boolean;
  finished: boolean;
  next: () => void;
};

const StoriesProgressBar: React.FC<Props> = ({ duration, isCurrent, finished, next }) => {
  const [progress, setProgress] = useState<number>(0);
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    clearInterval(timer.current);

    if (!isCurrent) {
      setProgress(0);
      return;
    }

    timer.current = setInterval(() => {
      setProgress((oldProgress) => {
        const nextProgress = Number((oldProgress + (INTERVAL_MS / duration) * 100).toFixed(2));

        if (nextProgress >= 100) {
          clearInterval(timer.current);
          return 100;
        }

        return nextProgress;
      });
    }, INTERVAL_MS);
  }, [isCurrent]);

  useEffect(() => {
    if (progress !== 100) return;

    next();
  }, [progress]);

  return (
    <div className="flex h-2 bg-neutral rounded-sm overflow-hidden">
      <span
        className="h-full bg-primary inline-block"
        style={{ width: finished ? "100%" : `${progress}%` }}
      ></span>
    </div>
  );
};

export default StoriesProgressBar;
