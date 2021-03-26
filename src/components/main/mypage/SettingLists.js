import React, { useEffect, useState } from 'react';
import {
  useMypageDispatch,
  useMypageState,
} from '../../../context/mypageContext';
import { useAppState } from '../../../context/appContext.js';
import MyPageDataList from './myPageDataList.js';

const inputValueConfirm = (state, dispatch) => {
  const {
    userState: { data },
    passwordVal,
    contactVal,
  } = state;

  const { setMessage } = dispatch;

  // 비밀번호 설정
  const Message = () => {
    const { newPassword, checkPassword } = passwordVal;

    if (newPassword === '' && checkPassword === '') return;
    if (newPassword)
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

  const passwordCheck = () => {
    const { newPassword, checkPassword } = passwordVal;
    const validate = /^[a-xA-Z{4,12}]/;
    if (newPassword === '') return;
    if (validate.test(newPassword)) {
      // setMessage(true);
      return (
        <span className="check-msg" style={{ color: '#FF0000' }}>
          대소문자, 숫자를 4~12자 이내로 입력해 주세요.
        </span>
      );
    }
  };

  //추가 연락처 설정
  const setInputValue = (name) => {
    const { phoneNumber, kakaoId, instagramId } = data.user;

    switch (name) {
      case 'phoneNumber':
        return contactVal.phoneNumber;

      case 'kakaoId':
        return contactVal.kakaoId;

      case 'instagramId':
        return contactVal.instagramId;
      default:
    }
  };

  return { Message, setInputValue, passwordCheck };
};

const SettingLists = ({ type, handleChange, handleClick }) => {
  const { curSize } = useAppState();

  const [disable, setDisable] = useState(false);

  const state = useMypageState();
  const dispatch = useMypageDispatch();
  const { newPassword, checkPassword } = state.passwordVal;

  const { settinginfo, setSettinginfo } = MyPageDataList();
  const { setPassword, setContact } = settinginfo;

  const { Message, setInputValue, passwordCheck } = inputValueConfirm(
    state,
    dispatch,
  );

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

  useEffect(() => {
    if (
      type === 'passowrd' &&
      newPassword !== checkPassword &&
      newPassword === '' &&
      checkPassword === ''
    ) {
      setDisable(true);
    }
  }, [disable]);

  return (
    <div>
      <form className="set-input-wrap">
        {data.map(({ title, placeholder, btn, edit, name, inputType }, i) => {
          return (
            <div key={name} className="set-input">
              <span>{title}</span>
              <div className="input-box">
                <input
                  name={name}
                  placeholder={placeholder}
                  type={inputType}
                  onChange={(e) => handleChange(e, type, name)}
                  value={setInputValue(name)}
                  readOnly={type === 'password' ? false : !edit}
                />
                {btn && (
                  <button
                    type="submit"
                    className={edit ? 'check-btn' : 'edit-btn'}
                    onClick={(e) => handleClick(e, i, name, type)}
                    disabled={disable}
                  >
                    {btnText(edit)}
                  </button>
                )}
                {type === 'password' &&
                  name === 'newPassword' &&
                  passwordCheck()}
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
