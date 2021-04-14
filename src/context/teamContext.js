import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

export const teamStateContext = createContext(null);
export const teamDispatchContext = createContext(null);

const TeamsProvider = ({ children }) => {
  const [showCreate, setShowCreate] = useState(true);
  const filterClassOf = useCallback((classOf) => classOf.substr(2, 2));

  const value = useMemo(() => ({ showCreate }), [showCreate]);
  const dispatch = useMemo(() => ({ filterClassOf, setShowCreate }), [
    filterClassOf,
    setShowCreate,
  ]);

  return (
    <teamStateContext.Provider value={value}>
      <teamDispatchContext.Provider value={dispatch}>
        {children}
      </teamDispatchContext.Provider>
    </teamStateContext.Provider>
  );
};

export const useTeamsState = () => {
  const state = useContext(teamStateContext);
  if (!state) throw new Error('TeamsProvider 에러');
  return state;
};

export const useTeamsDispatch = () => {
  const dispatch = useContext(teamDispatchContext);
  if (!dispatch) throw new Error('TeamsProvider 에러');
  return dispatch;
};

export default TeamsProvider;
