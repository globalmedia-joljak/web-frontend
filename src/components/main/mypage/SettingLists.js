import React from 'react';
import {
  useMypageDispatch,
  useMypageState,
} from '../../../context/mypageContext';
import MyPageDataList from './myPageDataList';
import { useAppState } from '../../../context/appContext.js';

const inputValueConfirm = ({ userState: { data }, passwordVal }) => {
  const Message = () => {
    const { newPassword, checkPassword } = passwordVal;
    if (newPassword === '' && checkPassword === '') return;
    if (newPassword !== checkPassword) {
      return (
        <span className="check-msg" style={{ color: '#FF0000' }}>
          비밀번호가 일치하지 않습니다.
        </span>
      );
    } else {
      return (
        <span className="check-msg" style={{ color: '#367DD9' }}>
          비밀번호가 일치합니다.
        </span>
      );
    }
  };

  const setInputValue = (name) => {
    const { phoneNumber, kakaoId, instagramId } = data.user;

    switch (name) {
      case 'phoneNumber':
        return phoneNumber || '';

      case 'kakaoId':
        return kakaoId || '';

      case 'instagramId':
        return instagramId || '';
      default:
    }
  };

  return { Message, setInputValue };
};

const SettingLists = ({ type, handleChange, handleClick }) => {
  const { curSize } = useAppState();
  const state = useMypageState();
  const dispatch = useMypageDispatch();

  const {
    settingInfo: { setPassword, setContact },
  } = MyPageDataList();

  const { Message, setInputValue } = inputValueConfirm(state, dispatch);
  const { newPassword, checkPassword } = state.passwordVal;

  let data = type === 'password' ? setPassword : setContact;

  const phoneSize = 425;
  const btnText = (edit) => {
    switch (type) {
      case 'password':
        return curSize > phoneSize ? '적용하기' : '적용';

      case 'contacts':
        return edit
          ? curSize > phoneSize
            ? '적용하기'
            : '적용'
          : curSize > phoneSize
          ? '수정하기'
          : '수정';

      default:
    }
  };

  return (
    <div>
      <form className="set-input-wrap">
        {data.map(({ title, placeholder, btn, edit, name }, i) => {
          return (
            <div key={name} className="set-input">
              <span>{title}</span>
              <div className="input-box">
                <input
                  name={name}
                  placeholder={placeholder}
                  type={type !== 'password' ? 'text' : 'password'}
                  onChange={(e) => handleChange(e, type, name)}
                  value={setInputValue(name)}
                  readOnly={type === 'password' ? false : !edit}
                />
                {btn && (
                  <button
                    type="submit"
                    className={edit ? 'check-btn' : 'edit-btn'}
                    onClick={(e) => handleClick(e, i, name, type)}
                    disabled={
                      type === 'password' && checkPassword !== newPassword
                    }
                  >
                    {btnText(edit)}
                  </button>
                )}

                {type === 'password' && name === 'checkPassword' && Message()}
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default SettingLists;
