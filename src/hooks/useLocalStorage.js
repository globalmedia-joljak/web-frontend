import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialState) => {
  const [localState, setLocalState] = useState(
    () => JSON.parse(Window.localState.getItem(key)) || initialState,
  );

  useEffect(() => {
    window.localState.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [localState, setLocalState];
};

export default useLocalStorage;
