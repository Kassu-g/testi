import { useState } from 'react';
import { IJoke } from '../components/FrontPage';

const useJokes = () => {
  const [savedJokes, setSavedJokes] = useState<IJoke[]>([]);

  const saveJoke = (joke: IJoke): boolean => {
    if (savedJokes.find((saved) => saved.id === joke.id)) {
      return false;
    }
    setSavedJokes((prev) => [...prev, joke]);
    return true;
  };

  return { savedJokes, saveJoke };
};

export default useJokes;
