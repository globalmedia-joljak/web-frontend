import React, { useState, useCallback } from 'react';

import Signinbackground from './image/SigninbackgroundHalf.png';
import globalmediaLogo from './image/GlobalMedia_Logo.png';
import style from './SignIn.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signin } from '../../service/api/auth';
import { useAppState, useAppDispatch } from '../../context/appContext';
import { client } from '../../service/api/client';

const SignIn = ({ history, location }) => {
  location.state = { show: false };

  const [signinInfo, setSigninInfo] = useState({
    classOf: '',
    password: '',
  });
  const [autoSignin, setAutoSignin] = useState(false);

  const { userInfo } = useAppState();
  const { setUserInfo } = useAppDispatch();

  const onAutoSigninCheckBoxHandler = (e) => {
    if (e.target.checked) {
      setAutoSignin(true);
    } else {
      setAutoSignin(false);
    }
  };

  const handleSigninSubmit = useCallback((e, i, name) => {
    if (!signinInfo.classOf || !signinInfo.password) {
      toast.error('⛔ 로그인/비밀번호를 입력해주세요.');
      return;
    }

    const signInRequest = {
      classOf: signinInfo.classOf,
      password: signinInfo.password,
    };

    signin(signInRequest)
      .then(function (response) {
        const { data } = response;
        client.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.accessToken.token}`;
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userClassOf', data.user.classOf);
        localStorage.setItem('accessToken', data.accessToken.token);
        if (autoSignin) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }

        setUserInfo({
          ...userInfo,
          classOf: data.user.classOf,
          name: data.user.name,
          isLogin: true,
        });
        history.push('/');
      })
      .catch(() => {
        toast.error(
          '⛔ 입력한 아이디와 비밀번호가 일치하지 않습니다. 아이디 또는 비밀번호를 다시 한번 입력해 주세요.',
        );
      });
  });

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
      <div className="login-container">
        <div className="login-left">
          <div className="globalmedia-logo">
            <a href="/">
              <img
                src={globalmediaLogo}
                alt="My dongho"
                className="globalmedia-logo-image"
              />
            </a>

            <a href="/" />
          </div>

          <div className="login-input">
            <input
              className="login-input"
              type="text"
              name="query"
              placeholder="학번"
              onChange={(e) =>
                setSigninInfo({
                  ...signinInfo,
                  classOf: e.target.value,
                })
              }
            />

            <div className="check-info"></div>

            <input
              className="login-input"
              type="password"
              name="query"
              placeholder="비밀번호"
              onChange={(e) =>
                setSigninInfo({
                  ...signinInfo,
                  password: e.target.value,
                })
              }
            />
            <div className="check-info"></div>

            <div className="auto-login">
              <label className="remember-id-container">
                자동 로그인
                <input type="checkbox" onChange={onAutoSigninCheckBoxHandler} />
                <span className="remember-id-checkmark"></span>
              </label>
            </div>
          </div>
          <div className="login-button" onClick={handleSigninSubmit}>
            <p>로그인</p>
          </div>

          <div className="signup-char-tablet">
            <p className="url-signUp">
              <a href="/signup" className="signUp">
                회원가입
              </a>
            </p>
          </div>
        </div>

        <div className="login-right">
          <div className="signup-char">
            <p className="url-signUp">
              <a href="/signup" className="signUp">
                회원가입
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
