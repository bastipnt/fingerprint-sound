import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import StoriesProgressBar from "../src/components/StoryProgressBar";
import { KeyboardContext } from "../src/providers/keyboardProvider";

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
      value: <h1>Hello</h1>,
      duration: 3000,
    },
    { id: crypto.randomUUID(), value: <h2>Lol</h2>, duration: 5000 },
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
      <div className="grid grid-flow-col gap-4 p-4">
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
