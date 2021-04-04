import { createContext, useContext, useEffect, useState } from 'react';

export const appStateContext = createContext(null);
export const appDispatchContext = createContext(null);

const AppProvider = ({ children }) => {
  const [curSize, setCurSize] = useState(window.innerWidth);
  const [modalShow, setModalShow] = useState(false);

  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    classOf: '',
    name: ''
  });

  useEffect(() => {
    window.addEventListener('resize', () => setCurSize(window.innerWidth));

    return () => {
      window.removeEventListener('resize', () => setCurSize(window.innerWidth));
    };
  }, [curSize]);

  const setJobColor = (job) => {
    switch (job) {
      case 'MEDIA_ART':
        return '#d92b3a';
      case 'DESIGNER':
        return '#f2cb05';
      case 'DEVELOPER':
        return '#367dd9';
      case 'PLANNER':
        return '#03a61c';
      default:
    }
  };

  const value = { curSize, modalShow, userInfo };
  const dispatch = { setJobColor, setModalShow, setUserInfo };

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
