import { createContext, useContext, useMemo, useState } from 'react';
import useInput from '../hooks/useInput.js';

const mypageStateContext = createContext(null);
const mypageDispatchContext = createContext(null);

const MypageProvider = ({ children }) => {
  const [succed, setSucced] = useState(false);

  // set a contacts
  const [contactVal, contactDispatch] = useInput({
    phoneNumber: '',
    kakaoId: '',
    instagramId: '',
  });

  const value = useMemo(
    () => ({
      succed,
      contactVal,
    }),
    [succed, contactVal],
  );

  const dispatch = useMemo(
    () => ({
      setSucced,
      contactDispatch,
    }),
    [setSucced, contactDispatch],
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
