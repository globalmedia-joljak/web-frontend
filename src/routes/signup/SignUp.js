import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SignUpPopUp from '../../components/modal/SignupPopUp';
import style from './SignUp.scss';

const SignUp = (props) => {
  const [passwd, setPasswd] = useState('');
  const [confirmPasswd, setConfirmPasswd] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false); // 불린 값에 따라 모달창이 보여지냐 안보여지냐

  useEffect(() => {
    passwd === confirmPasswd
      ? setError('')
      : setError('비밀번호가 일치하지 않습니다.');
  });

  const handleChange = (event) => {
    const { value } = event.target;

    setPasswd(value);
  };

  const goToHome = () => {
    props.history.push(`/`);
  };

  // 이곳에서 클릭했을 경우 모달창 보이는 여부 설정
  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div className="signUp-container">
      {/* 조건식으로 show가 ture일 경우 모달창 보이게함  
       show & setShow를 전달해줘서 모달창이 닫힐 경우 다시 메인페이지 변경할수 있도록 props전달. => SignUpPopUp모달창 이동해서 닫기 버튼이나 가입하기 버튼을 눌렀을경우 다시 회원가입 페이지가 보여야 하므로 false로 변경해준다.*/}
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
                    onChange={() => handleChange}
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
                    onChange={() => handleChange}
                    className="signUp-input insert-name"
                  />

                  {/* <select className="select-job">
                  <option disabled="disabled" value>
                    직군
                  </option>
                  <option value="designer">디자이너</option>
                  <option value="dev">개발자</option>
                  <option value="planner">기획자</option>
                </select> */}
                  {/* 📌 클릭 이벤트 함수 생성*/}
                  <button onClick={handleClick}>직군 선택</button>
                </div>
                <div className="check-info"></div>

                <div className="input-phone">
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    placeholder="핸드폰 번호를 입력하세요"
                    onChange={() => handleChange}
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
                    onChange={() => handleChange}
                    className="signUp-input"
                  />
                </div>
                <div className="check-info"></div>
              </div>
            </div>

            <button onClick={() => this.goToHome()} className="signUp-button">
              가입하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
