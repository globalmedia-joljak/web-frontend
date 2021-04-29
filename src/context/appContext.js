import { createContext, useContext, useEffect, useState } from 'react';
import useAsync from '../hooks/useAsync';
import { getUser } from '../service/api/users';

export const appStateContext = createContext(null);
export const appDispatchContext = createContext(null);

const AppProvider = ({ children }) => {
  const [curSize, setCurSize] = useState(window.innerWidth);
  const [scroll, setScroll] = useState(0);
  const [infinite, setInfinite] = useState({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
  });

  const date = new Date();
  const currentYears = date.getFullYear();

  const [modalShow, setModalShow] = useState(false);

  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    classOf: '',
    name: '',
  });

  const [userState] = useAsync(() => {
    if (!userInfo.classOf) return false;
    return getUser(userInfo.classOf);
  }, [userInfo.classOf]);

  const handleScroll = () => {
    const { documentElement, body } = document;
    let scrollHeight = Math.max(
      documentElement.scrollHeight,
      body.scrollHeight,
    );
    let scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);
    let clientHeight = documentElement.clientHeight;

    setInfinite({
      ...infinite,
      scrollTop,
      scrollHeight,
      clientHeight,
    });

    setScroll(Math.floor(window.scrollY));
  };

  useEffect(() => {
    window.addEventListener('resize', () => setCurSize(window.innerWidth));
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('resize', () => setCurSize(window.innerWidth));
      window.addEventListener('scroll', handleScroll, true);
    };
  }, [curSize]);

  const setJobColor = (role) => {
    switch (role) {
      case 'MEDIA_ART':
        return '#d92b3a';
      case 'DESIGNER':
        return '#f2cb05';
      case 'DEVELOPER':
        return '#367dd9';
      case 'PLANNER':
        return '#03a61c';
      default:
        return '#baa2ff';
    }
  };

  const translationKR = (role, txt) => {
    switch (role) {
      case 'MEDIA_ART':
        return '미디어아트';

      case 'DESIGNER':
        return '디자이너';

      case 'DEVELOPER':
        return '개발자';

      case 'PLANNER':
        return '기획자';
      case txt:
        return txt;
      default:
        return '선택안함';
    }
  };

  const worksKR = (category) => {
    switch (category) {
      case 'MEDIA_ART':
        return '미디어아트';
      case 'WEB_APP':
        return '웹/앱 서비스';
      case 'ANIMATION_FILM':
        return '영상/애니메이션';
      case 'GAME':
        return '게임';
      default:
        return category;
    }
  };
  const worksColor = (category) => {
    switch (category) {
      case 'MEDIA_ART':
        return '#D92B3A';
      case 'WEB_APP':
        return '#367DD9';
      case 'ANIMATION_FILM':
        return '#BD36D9';
      case 'GAME':
        return '#F27405';
      default:
        return '#BAA2FF';
    }
  };

  const value = {
    curSize,
    modalShow,
    userInfo,
    scroll,
    userState,
    infinite,
    currentYears,
  };
  const dispatch = {
    setJobColor,
    setModalShow,
    setUserInfo,
    translationKR,
    worksKR,
    worksColor,
  };

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
