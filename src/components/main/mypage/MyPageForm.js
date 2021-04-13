import React, { useCallback, useEffect, useState } from 'react';
import './myPageStyle.scss';

import SucceedPopUp from './SucceedPopUp.js';

import {
  useMypageState,
  useMypageDispatch,
} from '../../../context/mypageContext.js';

import { updateUserInfo } from '../../../service/api/users.js';
import MypageListForm from './MypageListForm';
import { toast, ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppState } from '../../../context/appContext';

const settingLists = {
  setPassword: [
    {
      name: 'currentPassword',
      title: '현재 비밀번호',
      placeholder: '현재 비밀번호를 입력해 주세요',
      btn: true,
      edit: true,
      inputType: 'password',
    },
    {
      name: 'newPassword',
      title: '새 비밀번호',
      placeholder: '새 비밀번호를 입력해 주세요',
      btn: false,
      edit: true,
      inputType: 'password',
    },
    {
      name: 'checkPassword',
      title: '새 비밀번호 확인',
      placeholder: '새 비밀번호를 다시 입력해 주세요',
      btn: true,
      edit: true,
      inputType: 'password',
    },
  ],

  setContact: [
    {
      name: 'phoneNumber',
      title: '전화번호',
      placeholder: '전화번호를 입력해주세요',
      btn: true,
      edit: false,
      inputType: 'text',
    },
    {
      name: 'kakaoId',
      title: '카카오톡ID',
      placeholder: '카카오ID를 입력해주세요',
      btn: true,
      edit: false,
      inputType: 'text',
    },
    {
      name: 'instagramId',
      title: '인스타그램ID',
      placeholder: '인스타그램ID를 입력해주세요',
      btn: true,
      edit: false,
      inputType: 'text',
    },
  ],
};

const HandleMypage = (userInfo, state, dispatch, setPassword, setLists) => {
  const { classOf, curPw } = userInfo;
  const { contactVal } = state;
  const { setSucced, contactDispatch } = dispatch;
  const { settingList, setSettingList } = setLists;

  const { passwordVal, setPasswordVal } = setPassword;
  const { currentPassword, newPassword, checkPassword } = passwordVal;

  // 비밀번호 설정
  const handleChange = useCallback((e, type) => {
    type === 'password'
      ? setPasswordVal({
          ...passwordVal,
          [e.target.name]: e.target.value,
        })
      : contactDispatch(e.target);
  });

  const handlePassword = (e, i) => {
    e.preventDefault();

    const { name: targetName } = e.target.previousSibling;

    if (targetName === 'currentPassword') {
      const passwordLsit = e.target.form.children;
      const contactForm = e.target.form.offsetParent.nextSibling;

      if (currentPassword !== curPw) {
        toast.error('⛔ 비밀번호를 다시 확인해 주세요');
        return false;
      } else {
        const SHOW = 'show';

        setSettingList({
          ...settingList,
          setPassword: settingList.setPassword.map((data, index) => {
            if (index === i) data.btn = !data.btn;

            return data;
          }),
        });

        e.target.previousSibling.readOnly = true;
        Array.from(passwordLsit).map((el) => el.classList.add(SHOW));
        contactForm.classList.add(SHOW);

        return;
      }
    }

    if (targetName === 'checkPassword') {
      if (checkPassword === newPassword && newPassword !== '') {
        if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(newPassword)) {
          toast.error('비밀번호는 영문 숫자 조합 8~20자리입니다.');
          return false;
        }
        updateUserInfo(classOf, 'password', newPassword);

        setPasswordVal({
          newPassword: '',
          checkPassword: '',
        });

        setSucced(true);
      }
    }
  };

  // 추가 연락처 설정
  const handleContacts = useCallback((e, i, name) => {
    e.preventDefault();

    const { className } = e.target;
    const CHECK_CN = 'check-btn';

    setSettingList({
      ...settingList,
      setContact: settingList.setContact.map((data, index) => {
        if (index === i) {
          data.edit = !data.edit;
        }
        return data;
      }),
    });

    if (className === CHECK_CN) {
      const checkKr = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi;

      switch (name) {
        case 'phoneNumber':
          if (!/^\d{3}\d{3,4}\d{4}$/.test(contactVal[name])) {
            toast.error('⛔ 휴대폰 번호를 확인해 주세요.');
            return false;
          }
          updateUserInfo(classOf, 'phonenumber', contactVal[name]);
          toast.success('✅ 전화번호가 변경 됐습니다.');
          return;

        case 'kakaoId':
          if (checkKr.test(contactVal[name])) {
            toast.error('⛔ 영문으로 표기해 주세요');
            return false;
          }
          updateUserInfo(classOf, 'kakaoid', contactVal[name]);
          toast.success('✅ 카카오톡ID가 변경 됐습니다.');
          return;

        case 'instagramId':
          if (checkKr.test(contactVal[name])) {
            toast.error('⛔ 영문으로 표기해 주세요');
            return false;
          }

          updateUserInfo(classOf, 'instagramid', contactVal[name]);
          toast.success('✅ 인스타그램ID가 변경 됐습니다.');
          return;

        default:
          break;
      }
    } else {
      e.target.previousSibling.focus();
    }
  });

  return { handleContacts, handleChange, handlePassword };
};

const MyPageForm = () => {
  const state = useMypageState();
  const {
    succed,
    userState: { loading, data, error },
  } = state;

  const { userInfo } = useAppState();
  const { setUserRole } = useAppDispatch();

  const dispatch = useMypageDispatch();

  const [settingList, setSettingList] = useState(settingLists);
  const { setPassword, setContact } = settingList;

  const [passwordVal, setPasswordVal] = useState({
    currentPassword: '',
    newPassword: '',
    checkPassword: '',
  });

  const { handleChange, handleContacts, handlePassword } = HandleMypage(
    userInfo,
    state,
    dispatch,
    {
      passwordVal,
      setPasswordVal,
    },
    { settingList, setSettingList },
  );

  if (loading) return <main>로딩중...</main>;
  if (error) return <main>에러사항</main>;
  if (!data) return '';

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ color: '#ffffff', fontWeight: 'bold' }}
      />
      <main>
        <div className="mypage-wrap">
          {succed && <SucceedPopUp />}
          <div className="profile"></div>

          <div className="section-wrap inr">
            <section className="set-privacy show">
              <h3>개인정보 설정</h3>
              <p>회원정보를 수정할 수 있습니다.</p>
              <ul className="privacy-wrap">
                <li>
                  <span>이름</span>
                  <strong>{data.user.name}</strong>
                </li>
                <li>
                  <span>학번</span>
                  <strong>{data.user.classOf}</strong>
                </li>
              </ul>
              <div className="setting-lists">
                <form className={`set-input-wrap`}>
                  <MypageListForm
                    type="password"
                    setLists={setPassword}
                    passwordVal={passwordVal}
                    handleChange={handleChange}
                    handlePassword={handlePassword}
                  />
                </form>
              </div>
            </section>
            <section className="set-contact">
              <h3>추가 연락처 설정</h3>
              <p>
                핸드폰 외 추가로 연락받을 연락처를 등록하거나 수정할 수
                있습니다.
              </p>
              <div className="setting-lists">
                <form className="set-input-wrap">
                  <MypageListForm
                    type="contacts"
                    setLists={setContact}
                    handleChange={handleChange}
                    handleContacts={handleContacts}
                    passwordVal={passwordVal}
                  />
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default MyPageForm;
