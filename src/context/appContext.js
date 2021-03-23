import { createContext, useContext, useEffect, useState } from 'react';

export const appStateContext = createContext(null);
export const appDispatchContext = createContext(null);

const AppProvider = ({ children }) => {
  const [curSize, setCurSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setCurSize(window.innerWidth));

    return () => {
      window.removeEventListener('resize', () => setCurSize(window.innerWidth));
    };
  }, [curSize]);

  const value = { curSize };
  const dispatch = {};

  return (
    <appStateContext.Provider value={value}>
      <appDispatchContext.Provider value={dispatch}>
        {children}
      </appDispatchContext.Provider>
    </appStateContext.Provider>
  );
};

export const useAppState = () => {
  const state = useContext(appStateContext);
  if (!state) throw new Error('AppProvider 에러');
  return state;
};

export const useAppDispatch = () => {
  const dispatch = useContext(appDispatchContext);
  if (!dispatch) throw new Error('AppProvider 에러');
  return dispatch;
};

export default AppProvider;
