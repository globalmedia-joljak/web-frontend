import { createContext, useContext, useMemo } from 'react';

export const worksStateContext = createContext(null);
export const worksDispatchContext = createContext(null);

const WorksProvider = ({ children }) => {
  const value = useMemo(() => ({}), []);
  const dispatch = useMemo(() => ({}), []);

  return (
    <worksStateContext.Provider value={value}>
      <worksDispatchContext.Provider value={dispatch}>
        {children}
      </worksDispatchContext.Provider>
    </worksStateContext.Provider>
  );
};

export const useWorksState = () => {
  const state = useContext(worksStateContext);
  if (!state) throw new Error('WorksProvider 에러');
  return state;
};

export const useWorksDispatch = () => {
  const dispatch = useContext(worksDispatchContext);
  if (!dispatch) throw new Error('WorksProvider 에러');
  return dispatch;
};

export default WorksProvider;
