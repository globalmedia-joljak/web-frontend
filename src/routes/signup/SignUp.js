import React, { useState, useEffect } from 'react';
import selectJobIcon from './image/Modal@2x.png';
import globalmediaLogo from './image/GlobalMedia_Logo.png';
import './SignUp.scss';
import OccupationListForm from '../../components/modal/OccupationListForm.js';

import ModalTemp from '../../components/modal/ModalTemp.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signup } from '../../service/api/auth';
import { useAppState } from '../../context/appContext';
import useTitle from '../../hooks/useTitle';

const tablet = 768;

const SignUp = ({ history, location }) => {
  useTitle(':회원가입');
  location.state = { show: false };

  const { curSize } = useAppState();

  const [userInfo, setUserInfo] = useState({
    classOf: '',
    name: '',
    phoneNumber: '',
    inviteCode: '',
  });
  const [passwd, setPasswd] = useState('');
  const [confirmPasswd, setConfirmPasswd] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [roles, setRoles] = useState({
    mainProjectRole: '',
    subProjectRole: '',
  });
  const { mainProjectRole, subProjectRole } = roles;

  const handlePassword = (value) => {
    if (value === passwd) {
      setPasswordError(' ');
    }
  };

  const handleChoice = (e) => {
    const { value, name, form } = e.target;

    var isDuplicate = false;

    if (name === 'mainProjectRole') {
      if (value === subProjectRole) {
        isDuplicate = true;
      }
    } else {
      if (value === mainProjectRole) {
        isDuplicate = true;
      }
    }

    if (isDuplicate) {
      toast.error('⛔ 대표직군과 부가직군은 중복하여 설정이 불가능합니다.');
      e.target.checked = false;
      setRoles({
        ...roles,
        [name]: '',
      });
      return;
    }

    setRoles({
      ...roles,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mainProjectRole === '' || subProjectRole === '') {
      toast.error('⛔ 선택하지않은 직군이 있습니다.');
      return;
    }

    setModalShow(false);
  };

  const verifyPassword = () => {
    if (passwd === confirmPasswd && passwd === '') {
      setPasswordError('');
      return false;
    }
    if (!/^[a-zA-Z0-9]{8,20}$/.test(passwd)) {
      setPasswordError('비밀번호는 영문 숫자 조합 8~20자리입니다.');
      return false;
    }

    const checkNum = passwd.search(/[0-9]/g);
    const checkEng = passwd.search(/[a-z]/gi);
    if (checkNum < 0 || checkEng < 0) {
      setPasswordError('비밀번호는 영문 숫자 조합 8~20자리입니다.');
      return false;
    }

    if (passwd !== confirmPasswd) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const verifyEmptyValue = (value, text) => {
    if (value === '' || value === null) {
      toast.error(`⛔ ${text}`);
      return false;
    }

    return true;
  };

  const handleSignUpSubmit = (e) => {
    if (
      !verifyEmptyValue(userInfo.classOf, '학번을 입력해주세요.') ||
      !verifyEmptyValue(userInfo.name, '이름을 입력해주세요.') ||
      !verifyEmptyValue(userInfo.phoneNumber, '연락처를 입력해주세요.') ||
      !verifyEmptyValue(userInfo.inviteCode, '인증번호를 입력해주세요.') ||
      !verifyEmptyValue(mainProjectRole, '대표직군을 설정해주세요.') ||
      !verifyEmptyValue(subProjectRole, '부가직군을 설정해주세요.')
    ) {
      return;
    }
    if (!/^\d{3}\d{3,4}\d{4}$/.test(userInfo.phoneNumber)) {
      toast.error('⛔ 휴대폰 번호를 확인해주세요.');
      return false;
    }
    if (!verifyPassword()) {
      toast.error('⛔ 비밀번호를 확인해주세요.');
      return;
    }

    const signUpRequest = {
      classOf: userInfo.classOf,
      inviteCode: userInfo.inviteCode,
      name: userInfo.name,
      phoneNumber: userInfo.phoneNumber,
      password: passwd,
      mainProjectRole: mainProjectRole,
      subProjectRole: subProjectRole === '선택안함' ? null : subProjectRole,
    };
    console.log(signUpRequest);
    const successSignup = () => {
      toast.success('✅ 회원가입에 성공하셨습니다.');
      e.target.disabled = true;
      setTimeout(() => history.push('/signin'), 2000);
    };

    const errorSignup = () => {
      toast.error(
        '⛔ 회원가입에 실패하였습니다. 입력하신 정보가 맞는지 확인해주세요.',
      );
    };

    signup(signUpRequest, successSignup, errorSignup);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="signUp-container">
        {modalShow ? (
          <ModalTemp
            modalShow={modalShow}
            handleOk={handleSubmit}
            handleCancel={setModalShow}
            form={'signup'}
            btnTxt="선택완료"
          >
            <li className="list r2">
              <h2>직군설정</h2>
              <p>
                자신의 직군을 설정하세요.
                <span>(대표 1개, 부가직군1개까지 설정 가능)</span>
              </p>
            </li>
            <li className="list r2">
              <h3>대표직군</h3>
              <OccupationListForm
                projectRole={mainProjectRole}
                type="mainProjectRole"
                handleChoice={handleChoice}
                worktype=""
              />
            </li>
            <li className="list r2">
              <h3>부가직군</h3>
              <OccupationListForm
                projectRole={subProjectRole}
                type="subProjectRole"
                handleChoice={handleChoice}
                txt="선택안함"
                worktype=""
              />
            </li>
            {curSize > tablet && (
              <li className="list alert">
                <p>회원가입 후 작가등록 페이지에서 변경할 수 있습니다.</p>
              </li>
            )}
          </ModalTemp>
        ) : (
          <div className="el-main">
            <div className="home-image">
              <a href="/">
                <img
                  src={globalmediaLogo}
                  alt="My dongho"
                  width="100px"
                  height="100px"
                  className="globalmedia-logo-image"
                />
              </a>
            </div>
            <div className="sub-wrapper">
              <div className="sub-info">
                <div className="info-title">계정정보</div>
                <div className="info-body">
                  <div className="input-id group-start">
                    <input
                      type="text"
                      name="student_code"
                      id="student_code"
                      placeholder="학번을 입력해주세요"
                      defaultValue={userInfo.classOf}
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          classOf: e.target.value,
                        })
                      }
                      className="signUp-input"
                      maxLength="20"
                    />
                    <div className="check-info"></div>
                  </div>
                  <div className="input-password">
                    <div className="form1-input-password">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={passwd}
                        placeholder="비밀번호를 입력하세요"
                        onChange={(e) => setPasswd(e.target.value)}
                        className="signUp-input passwrod1"
                        maxLength="20"
                      />
                      <div className="check-info">
                        <p>{passwordError}</p>
                      </div>
                    </div>
                    <div className="form2-input-password ">
                      <input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        value={confirmPasswd}
                        placeholder="비밀번호를 다시 확인하세요"
                        onChange={(e) => {
                          setConfirmPasswd(e.target.value);
                          handlePassword(e.target.value);
                        }}
                        className="signUp-input"
                        maxLength="20"
                      />
                      <div className="check-info"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sub-info-private">
                <div className="info-title-private">개인정보</div>
                <div className="info-body">
                  <div className="input-name group-start">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="이름을 입력해주세요"
                      defaultValue={userInfo.name}
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          name: e.target.value,
                        })
                      }
                      className="insert-name"
                      maxLength="20"
                    />
                    <button className="select-job" onClick={handleClick}>
                      직군 선택
                      <img
                        src={selectJobIcon}
                        alt="No icon"
                        className="selectJobIcon"
                      />
                    </button>
                  </div>
                  <div className="check-info"></div>
                  <div className="input-phone">
                    <input
                      type="text"
                      name="phone_number"
                      id="phone_number"
                      placeholder="핸드폰 번호(- 제외)"
                      defaultValue={userInfo.phoneNumber}
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          phoneNumber: e.target.value,
                        })
                      }
                      className="signUp-input"
                      maxLength="12"
                    />
                  </div>
                  <div className="check-info"></div>
                </div>
              </div>
              <div className="sub-info">
                <div className="info-title">초대코드</div>
                <div className="info-body">
                  <div className="input-auth-num group-start">
                    <input
                      type="text"
                      name="auth_number"
                      id="auth_number"
                      placeholder="초대코드를 입력하세요"
                      defaultValue={userInfo.inviteCode}
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          inviteCode: e.target.value,
                        })
                      }
                      className="signUp-input"
                      maxLength="10"
                    />
                  </div>
                  <div className="check-info"></div>
                </div>
                <button
                  type="button"
                  onClick={handleSignUpSubmit}
                  className="signUp-button"
                >
                  가입하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUp;
