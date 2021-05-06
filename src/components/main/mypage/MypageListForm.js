import React, { useEffect, useState } from 'react';
import { useAppState } from '../../../context/appContext.js';

const phoneSize = 425;

const MypageListForm = ({
  type,
  setLists,
  passwordVal,
  handleChange,
  handleContacts,
  handlePassword,
}) => {
  const {
    curSize,
    userState: { data },
  } = useAppState();
  const { newPassword, checkPassword } = passwordVal;

  const [disable, setDisable] = useState(true);

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

  const verifyPassword = (name) => {
    if (newPassword === checkPassword && newPassword === '') return;

    let message = '';

    switch (name) {
      case 'newPassword':
        if (name !== 'newPassword' || newPassword === '') return;

        if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(newPassword)) {
          newPassword.search(/\s/) !== -1
            ? (message = '비밀번호는 공백 없이 입력해 주세요.')
            : (message = '비밀번호는 영문 숫자 조합 8~20자리입니다.');
        }

        return <span className={`check-msg warn`}>{message}</span>;

      case 'checkPassword':
        if (name !== 'checkPassword') return;

        let messageColor = newPassword === checkPassword ? 'correct' : 'warn';

        newPassword !== checkPassword
          ? (message = '  비밀번호가 일치하지 않습니다.')
          : (message = ' 비밀번호가 일치합니다.');

        return <span className={`check-msg ${messageColor}`}>{message}</span>;

      default:
        break;
    }
  };

  const disableCondition = (name) =>
    name === 'currentPassword' ? false : disable;

  const showSettingLists = (name) =>
    name === 'checkPassword' || name === 'newPassword' ? '' : 'show';

  useEffect(() => {
    if (newPassword === checkPassword && newPassword !== '') setDisable(false);
  });
  if (!data) return null;

  return (
    <>
      {setLists.map(({ title, placeholder, btn, edit, name, inputType }, i) => {
        return (
          <div
            key={name}
            className={`set-input ${
              type === 'password' ? showSettingLists(name) : 'show'
            }`}
          >
            <span>{title}</span>
            <div className="input-box">
              <input
                name={name}
                placeholder={placeholder}
                type={inputType}
                onInput={(e) => handleChange(e, type, name)}
                defaultValue={data.user[name] === null ? '' : data.user[name]}
                readOnly={type === 'password' ? false : !edit}
              />
              {btn && (
                <button
                  type="button"
                  className={edit ? 'check-btn' : 'edit-btn'}
                  onClick={(e) =>
                    type === 'password'
                      ? handlePassword(e, i)
                      : handleContacts(e, i, name)
                  }
                  disabled={type === 'password' && disableCondition(name)}
                >
                  {btnText(edit)}
                </button>
              )}
              {type === 'password' && verifyPassword(name)}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MypageListForm;
