import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

import mediAart from '../assets/images/mediaart.jfif';
import designer from '../assets/images/designer.jfif';
import developer from '../assets/images/developer.jfif';
import planner from '../assets/images/planner.jfif';

export const teamStateContext = createContext(null);
export const teamDispatchContext = createContext(null);

const TeamsProvider = ({ children }) => {
  const [showCreate, setShowCreate] = useState(false);
  const filterClassOf = useCallback((classOf) => classOf.substr(2, 2));

  const setDefaultImg = (role) => {
    switch (role) {
      case 'MEDIA_ART':
        return mediAart;
      case 'DESIGNER':
        return designer;
      case 'DEVELOPER':
        return developer;
      case 'PLANNER':
        return planner;
      default:
    }
  };

  const value = useMemo(() => ({ showCreate }), [showCreate]);
  const dispatch = useMemo(
    () => ({ filterClassOf, setShowCreate, setDefaultImg }),
    [filterClassOf, setShowCreate, setDefaultImg],
  );

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
