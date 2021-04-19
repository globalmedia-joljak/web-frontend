import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

import mediaArt from '../assets/images/Members_MediaArt@2x.png';
import designer from '../assets/images/Members_design@2x.png';
import developer from '../assets/images/Members_dev@2x.png';
import planner from '../assets/images/Members_Planner@2x.png';

export const teamStateContext = createContext(null);
export const teamDispatchContext = createContext(null);

const TeamsProvider = ({ children }) => {
  const [showCreate, setShowCreate] = useState(false);
  const filterClassOf = useCallback((classOf) => classOf.substr(2, 2));

  const setDefaultImg = (role) => {
    switch (role) {
      case 'MEDIA_ART':
        return mediaArt;
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
