import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { GetUser } from '../lib/api/users.js';
import useAsync from '../hooks/useAsync.js';
import useInput from '../hooks/useInput.js';

const mypageStateContext = createContext(null);
const mypageDispatchContext = createContext(null);

const JsonFilter = (userState) => {
  if (userState.data === '') return;

  const userData = userState.data.user;

  const contacts = {
    phoneNumber: userData.phoneNumber,
    kakaoId: userData.kakaoId,
    instagramId: userData.instagramId,
  };

  for (let name in contacts) {
    contacts[name] = JSON.parse(contacts[name])[name];
  }

  return contacts;
};

const MypageProvider = ({ children }) => {
  const [classOfUser, setClassOfUser] = useState('admin');
  const [message, setMessage] = useState(false);
  const [succed, setSucced] = useState(false);

  //mypage api
  const [userState, refetch] = useAsync(
    async () => await GetUser(classOfUser),
    [classOfUser],
  );

  /* 여기서 문제가 생기는 거임.. ! ------------------------------------ */
  JsonFilter(userState);
  // console.log(lala);
  // const { phoneNumber, kakaoId, instagramId } = lala; // 해당 주석을 풀었을 경우 말했던 문제가 생김
  /* ------------------------------------ */

  // set a passowrd
  const [passwordVal, passwordDispatch] = useInput({
    newPassword: '',
    checkPassword: '',
  });

  // set a contacts
  const [contactVal, contactDispatch] = useInput({
    phoneNumber: '',
    kakaoId: '',
    instagramId: '',
  });

  const value = useMemo(
    () => ({
      userState,
      succed,
      passwordVal,
      contactVal,
      classOfUser,
    }),
    [userState, succed, passwordVal, contactVal, classOfUser, message],
  );
  const dispatch = useMemo(
    () => ({
      setSucced,
      passwordDispatch,
      contactDispatch,
      refetch,
      setMessage,
    }),
    [setSucced, passwordDispatch, contactDispatch, refetch, setMessage],
  );

  return (
    <mypageStateContext.Provider value={value}>
      <mypageDispatchContext.Provider value={dispatch}>
        {children}
      </mypageDispatchContext.Provider>
    </mypageStateContext.Provider>
  );
};

// state 조회하는 hook
export const useMypageState = () => {
  const state = useContext(mypageStateContext);
  if (!state) {
    throw new Error('MypageProvider를 찾을수 없다 !');
  }
  return state;
};

//dispatch 조회하는 hook
export const useMypageDispatch = () => {
  const dispatch = useContext(mypageDispatchContext);
  if (!dispatch) {
    throw new Error('MypageProvider를 찾을수 없다 !');
  }
  return dispatch;
};

export default MypageProvider;
