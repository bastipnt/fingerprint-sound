import { KeyboardContext } from "../providers/keyboardProvider";
import Test1 from "../stories/Test1";
import Welcome from "../stories/Welcome";
import StoriesProgressBar from "./StoryProgressBar";
import { ReactNode, useCallback, useContext, useEffect, useState } from "react";

type Story = {
  id: string;
  value: ReactNode;
  duration: number;
};

const StoriesWrapper: React.FC = () => {
  const { keysPressed } = useContext(KeyboardContext);

  const [stories] = useState<Story[]>([
    {
      id: crypto.randomUUID(),
      value: <Welcome />,
      duration: 3000,
    },
    { id: crypto.randomUUID(), value: <Test1 />, duration: 5000 },
  ]);

  const [currentStoryId, setCurrentStoryId] = useState<string>();

  useEffect(() => {
    if (currentStoryId || !stories[0]) return;

    setCurrentStoryId(stories[0].id);
  }, [currentStoryId, stories]);

  const next = useCallback(() => {
    setCurrentStoryId((oldStoryId) => {
      const currIndex = stories.findIndex(({ id }) => id === oldStoryId);

      if (currIndex === -1 || currIndex >= stories.length - 1) return oldStoryId;
      const nextStoryId = stories[currIndex + 1].id;

      return nextStoryId;
    });
  }, [stories]);

  const prev = useCallback(() => {
    setCurrentStoryId((oldStoryId) => {
      const currIndex = stories.findIndex(({ id }) => id === oldStoryId);
      if (!currIndex || currIndex <= 0) return;
      return stories[currIndex - 1].id;
    });
  }, [stories]);

  useEffect(() => {
    if (keysPressed("ArrowLeft")) prev();
    if (keysPressed("ArrowRight")) next();
  }, [keysPressed]);

  return (
    <section>
      <div className="grid grid-flow-col p-4 gap-4">
        {stories.map(({ id, duration }, i) => (
          <StoriesProgressBar
            key={id}
            finished={stories.findIndex(({ id }) => id === currentStoryId) > i}
            duration={duration}
            isCurrent={currentStoryId === id}
            next={next}
          />
        ))}
      </div>
      {stories.find(({ id }) => id === currentStoryId)?.value ?? null}
    </section>
  );
};

export default StoriesWrapper;
