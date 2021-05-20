import React, { useCallback, useState } from 'react';
import './myPageStyle.scss';

import SucceedPopUp from './SucceedPopUp.js';

import {
  useMypageState,
  useMypageDispatch,
} from '../../../context/mypageContext.js';

import { updateUserInfo } from '../../../service/api/users.js';
import MypageListForm from './MypageListForm';
import { toast, ToastContainer } from 'react-toastify';
import { useAppState } from '../../../context/appContext';
import { useEffect, useRef } from 'react/cjs/react.development';
import { checkMypagePassword } from '../../../service/api/auth';
import HeroImageForm from '../common/HeroImageForm';

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
  const { classOf } = userInfo;
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

    const signInRequest = {
      classOf,
      password: currentPassword,
    };

    if (targetName === 'currentPassword') {
      const passwordLsit = e.target.form.children;
      const contactForm = e.target.form.offsetParent.nextSibling;

      checkMypagePassword(signInRequest)
        .then((res) => {
          const SHOW = 'show';

          setSettingList({
            ...settingList,
            setPassword: settingList.setPassword.map((data, index) => {
              if (index === i) data.btn = !data.btn;

              return data;
            }),
          });

          Array.from(passwordLsit).map((el) => el.classList.add(SHOW));
          contactForm.classList.add(SHOW);

          return;
        })
        .catch((e) => {
          if (currentPassword === '') {
            toast.error(`⛔ 비밀번호를 입력해 주세요.`);
          } else {
            toast.error('⛔ 비밀번호를 다시 확인해 주세요');
          }

          return false;
        });
    }

    if (targetName === 'checkPassword') {
      if (checkPassword === newPassword && newPassword !== '') {
        if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(newPassword)) {
          toast.error('비밀번호는 영문 숫자 조합 8~20자리입니다.');
          return false;
        }
        updateUserInfo({ classOf, url: 'password' }, checkPassword).then(
          (res) => {
            setPasswordVal({
              newPassword: '',
              checkPassword: '',
            });

            setSucced(true);
          },
        );
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
            toast.error(
              '⛔ 휴대폰 번호는 (-)없이 숫자만 가능합니다. 번호를 확인해 주세요.(10자 이내)',
            );
            return false;
          }

          updateUserInfo(
            { classOf, url: 'phonenumber', succed: '전화번호' },
            contactVal[name],
          );
          return;

        case 'kakaoId':
          if (checkKr.test(contactVal[name])) {
            toast.error('⛔ 영문으로 표기해 주세요');
            return false;
          }
          if (contactVal[name].length > 20) {
            toast.error(`⛔ 20자 이내로 입력해 주세요.`);
            return false;
          }
          updateUserInfo(
            { classOf, url: 'kakaoid', succed: '카카오톡ID' },
            contactVal[name],
          );
          return;

        case 'instagramId':
          if (checkKr.test(contactVal[name])) {
            toast.error('⛔ 영문으로 표기해 주세요');
            return false;
          }
          if (contactVal[name].length > 20) {
            toast.error(`⛔ 20자 이내로 입력해 주세요.`);
            return false;
          }
          updateUserInfo(
            { classOf, url: 'instagramid', succed: '인스타그램ID' },
            contactVal[name],
          );
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
    userInfo,
    userState: { loading, data, error },
  } = useAppState();
  const { succed } = state;

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

  const setInputEl = useRef();

  useEffect(() => {
    if (setInputEl.current) {
      const inputChild = [...setInputEl.current.children];

      if (!inputChild[1].classList.contains('show')) {
        setSettingList({
          ...settingList,
          setPassword: settingList.setPassword.map((data) => {
            data.btn = true;
            return data;
          }),
        });
      }
    }
  }, []);

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
          <HeroImageForm
            type="mypage"
            heroTitle="마이페이지"
            heroContent="비밀번호와 개인 연락처를 "
            heroContent2="관리 할수 있습니다."
          />

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
                <form className={`set-input-wrap`} ref={setInputEl}>
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
