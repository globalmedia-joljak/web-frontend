import React, { useEffect, useState } from 'react';
import './myPageStyle.scss';

import SettingLists from './SettingLists.js';
import SucceedPopUp from './SucceedPopUp.js';

import {
  useMypageState,
  useMypageDispatch,
} from '../../../context/mypageContext.js';

import MyPageDataList from './myPageDataList.js';
import {
  updateInstagramId,
  updateKakaoId,
  updatePassword,
  updatePhoneNumber,
} from '../../../lib/api/users';
import useInput from '../../../hooks/useInput';

const MyPageEvents = (state, actions) => {
  const { passwordVal, contactVal, classOfUser } = state;
  const { setSucced, passwordDispatch, contactDispatch, setMessage } = actions;
  const { settinginfo, setSettinginfo } = MyPageDataList();

  const handleChange = (e, type) => {
    type === 'password'
      ? passwordDispatch(e.target)
      : contactDispatch(e.target);
  };

  const { newPassword, checkPassword } = passwordVal;

  const handleClick = (e, i, name, type) => {
    e.preventDefault();
    const { className } = e.target;
    const CHECK_CN = 'check-btn';

    switch (type) {
      case 'password':
        if (newPassword === '' && checkPassword === '') {
          alert('변경할 비밀번호를 입력해 주세요');
          return;
        }
        if (newPassword === checkPassword) {
          console.log('같다 비밀번호 변경 ~');
          setSucced(true);
        }

      //수정하기 클릭시 적용하기로 변경
      case 'contacts':
        setSettinginfo({
          ...state,
          setContact: settinginfo.setContact.map((data, index) => {
            if (index === i) data.edit = !data.edit;
            return data;
          }),
        });

        if (className === CHECK_CN) {
          console.log(name);
          console.log(contactVal);
          const patch_value = { [name]: contactVal[name] };
          console.log(patch_value);
          switch (name) {
            case 'phoneNumber':
              updatePhoneNumber(classOfUser, patch_value);
              console.log('전화번호 성공!');
              break;
            case 'kakaoId':
              updateKakaoId(classOfUser, patch_value);
              console.log('카카오 성공!');
              break;
            case 'instagramId':
              updateInstagramId(classOfUser, patch_value);
              console.log('인스타 성공!');
              break;
            default:
              break;
          }
        }

      default:
        break;
    }
  };

  return {
    handleChange,
    handleClick,
  };
};

const MyPageForm = () => {
  const state = useMypageState();
  const dispatch = useMypageDispatch();

  const {
    succed,
    userState: { loading, data, error },
  } = state;

  const { handleChange, handleClick } = MyPageEvents(state, dispatch);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러사항</div>;
  if (data === '') return '';

  const { name, classOf, phoneNumber, kakaoId, instagramId } = data.user;

  return (
    <main>
      <div className="mypage-wrap">
        {succed ? (
          <SucceedPopUp />
        ) : (
          <>
            <div className="profile"></div>

            <div className="section-wrap inr">
              <section className="set-privacy">
                <h3>개인정보 설정</h3>
                <p>회원정보를 수정할 수 있습니다.</p>
                <ul className="privacy-wrap">
                  <li>
                    <span>이름</span>
                    <strong>{name}</strong>
                  </li>
                  <li>
                    <span>학번</span>
                    <strong>{classOf}</strong>
                  </li>
                </ul>
                <SettingLists
                  type="password"
                  handleChange={handleChange}
                  handleClick={handleClick}
                />
              </section>
              <section className="set-contact">
                <h3>추가 연락처 설정</h3>
                <p>
                  핸드폰 외 추가로 연락받을 연락처를 등록하거나 수정할 수
                  있습니다.
                </p>
                <SettingLists
                  type="contacts"
                  handleChange={handleChange}
                  handleClick={handleClick}
                />
              </section>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default MyPageForm;
