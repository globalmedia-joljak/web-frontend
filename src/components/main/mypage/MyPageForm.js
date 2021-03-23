import React, { useEffect, useState } from 'react';
import './myPageStyle.scss';

import SettingLists from './SettingLists.js';
import SucceedPopUp from './SucceedPopUp.js';

import {
  useMypageState,
  useMypageDispatch,
} from '../../../context/mypageContext.js';
import MyPageDataList from './myPageDataList';

// 직군에 따른 프로필 배경색상
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

const MyPageEvents = (state, actions) => {
  const { passwordVal, contactVal, settintState, classOfUser } = state;
  const { setSucced, FETCH_PASSWORD, FETCH_CONTACTS, refetch } = actions;
  const { settingInfo, settingInfoDispatch } = MyPageDataList();

  const handleChange = (e, type) =>
    type === 'password' ? FETCH_PASSWORD(e.target) : FETCH_CONTACTS(e.target);

  const { newPassword, checkPassword } = passwordVal;

  const handleClick = (e, i, name, type) => {
    e.preventDefault();

    const infoType = type === 'contacts' ? 'setContact' : 'setPassword';
    // console.log(name);

    // console.log(contactVal);

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
        console.log(type, i);
        settingInfoDispatch({ type: 'EDIT_CONTACTS', index: i });
        console.log(settingInfo);
      // setContactBtn({
      //   ...contactBtn,
      //   contactBtn: contactBtn.map((data, index) => {
      //     if (index === i) data.edit = !data.edit;
      //     return data;
      //   }),
      // });
      default:
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
    contactVal,
  } = state;

  const { handleChange, handleClick } = MyPageEvents(state, dispatch);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러사항</div>;
  if (data === null) return null;

  const { name, mainProjectRole, classOf } = data.user;

  return (
    <main>
      <div className="mypage-wrap">
        {succed ? (
          <SucceedPopUp />
        ) : (
          <>
            <div className="profile">
              <div className="profile-wrap">
                <div
                  className="profile-bg"
                  style={{
                    backgroundColor: setJobColor(mainProjectRole),
                  }}
                >
                  <div className="profile-img"></div>
                </div>
                <strong className="user-info">
                  user<span>(1234567)</span>
                </strong>
              </div>
            </div>

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
