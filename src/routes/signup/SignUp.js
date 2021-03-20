import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SignUpPopUp from '../../components/modal/SignupPopUp';
import selectJobIcon from './image/Modal@2x.png';
import style from './SignUp.scss';

const SignUp = ({ history, location }) => {
  const [passwd, setPasswd] = useState('');
  const [confirmPasswd, setConfirmPasswd] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  location.state = { show: false };
  useEffect(() => {
    passwd === confirmPasswd
      ? setError('')
      : setError('비밀번호가 일치하지 않습니다.');
  });

  const handleChange = (event) => {
    const { value } = event.target;
    console.log(event.target);
  };

  const handleSignUpSubmit = () => {
    history.push(`/`);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div className="signUp-container">
      {show ? (
        <SignUpPopUp show={show} setShow={setShow} />
      ) : (
        <div className="el-main">
          <form>
            <div className="sub-info">
              <div className="info-title">계정정보</div>
              <div className="info-body">
                <div className="input-id group-start">
                  <input
                    type="text"
                    name="student_code"
                    id="student_code"
                    placeholder="학번을 입력해주세요"
                    onChange={(e) => handleChange(e)}
                    className="signUp-input"
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
                    />
                    <div className="check-info">{error}</div>
                  </div>
                  <div className="form2-input-password ">
                    <input
                      type="password"
                      name="confirm_password"
                      id="confirm_password"
                      value={confirmPasswd}
                      placeholder="비밀번호를 다시 확인하세요"
                      onChange={(e) => setConfirmPasswd(e.target.value)}
                      className="signUp-input"
                    />
                    <div className="check-info"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sub-info">
              <div className="info-title">개인정보</div>
              <div className="info-body">
                <div className="input-name group-start">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="이름을 입력해주세요"
                    onChange={(e) => handleChange(e)}
                    className="signUp-input insert-name"
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
                    placeholder="핸드폰 번호를 입력하세요"
                    onChange={(e) => handleChange(e)}
                    className="signUp-input"
                  />
                </div>
                <div className="check-info"></div>
              </div>
            </div>
            <div className="sub-info">
              <div className="info-title">인증번호</div>
              <div className="info-body">
                <div className="input-auth-num group-start">
                  <input
                    type="text"
                    name="auth_number"
                    id="auth_number"
                    placeholder="인증번호를 입력하세요"
                    onChange={(e) => handleChange(e)}
                    className="signUp-input"
                  />
                </div>
                <div className="check-info"></div>
              </div>
            </div>
            <button onClick={handleSignUpSubmit} className="signUp-button">
              가입하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default SignUp;
