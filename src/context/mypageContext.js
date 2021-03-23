import { createContext, useContext, useReducer, useState } from 'react';
import { GetUser } from '../lib/api/users.js';
import useAsync from '../hooks/useAsync.js';
import useInputs from '../hooks/useInputs.js';

const mypageStateContext = createContext(null);
const mypageDispatchContext = createContext(null);

const MypageProvider = ({ children }) => {
  const [classOfUser, setClassOfUser] = useState('admin');

  //mypage api
  const [userState, refetch] = useAsync(() => GetUser(classOfUser), [
    classOfUser,
  ]);

  const [succed, setSucced] = useState(false);

  // set a passwords
  const [passwordVal, FETCH_PASSWORD] = useInputs({
    newPassword: '',
    checkPassword: '',
  });

  // set a contacts
  const [contactVal, FETCH_CONTACTS] = useInputs({
    phoneNumber: '',
    kakaoId: '',
    instagramId: '',
  });

  const value = { userState, succed, passwordVal, contactVal };
  const dispatch = {
    setSucced,
    FETCH_PASSWORD,
    FETCH_CONTACTS,
    refetch,
  };

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
