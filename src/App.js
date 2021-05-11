import React, { useEffect } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import {
  Home,
  Notice,
  Tbuild,
  Works,
  Search,
  MyPage,
  ErrorPage,
  SignIn,
  SignUp,
} from './routes';
import './assets/style.scss';
import './components/mainStyle.scss';

import {
  getAccessTokenByRefreshToken,
  getAccessTokenByAccessToken,
  stoargeInfo,
} from './service/api/auth';
import { client } from './service/api/client';
import { useAppState, useAppDispatch } from './context/appContext';
import Navigation from './components/header/Navigation';
import Visitors from './routes/visitors/Visitors';

const App = () => {
  const { userInfo } = useAppState();
  const { setUserInfo } = useAppDispatch();

  useEffect(() => {
    const refreshToken = stoargeInfo.refreshToken;
    client.defaults.headers.common['refreshToken'] = `${refreshToken}`;

    if (refreshToken) {
      getAccessTokenByRefreshToken()
        .then((response) => {
          const token = response.data.token;
          client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          localStorage.setItem('accessToken', token);

          setUserInfo({
            ...userInfo,
            classOf: stoargeInfo.userClassOf,
            name: stoargeInfo.userName,
            isLogin: true,
          });
        })
        .catch((e) => {
          console.log(e.response);
          delete client.defaults.headers.common['Authorization'];
          delete client.defaults.headers.common['refreshToken'];
          delete client.defaults.headers.common['accessToken'];
          localStorage.clear();
          setUserInfo({
            ...userInfo,
            classOf: '',
            name: '',
            isLogin: false,
          });
        });
      return;
    }

    const accessToken = stoargeInfo.accessToken;
    if (accessToken) {
      client.defaults.headers.common['accessToken'] = `${accessToken}`;
      getAccessTokenByAccessToken()
        .then((response) => {
          const token = response.data.token;
          client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          localStorage.setItem('accessToken', token);

          setUserInfo({
            ...userInfo,
            classOf: stoargeInfo.userClassOf,
            name: stoargeInfo.userName,
            isLogin: true,
          });
        })
        .catch((e) => {
          console.log(e.response);
          delete client.defaults.headers.common['Authorization'];
          delete client.defaults.headers.common['refreshToken'];
          delete client.defaults.headers.common['accessToken'];
          localStorage.clear();
          setUserInfo({
            ...userInfo,
            classOf: '',
            name: '',
            isLogin: false,
          });
        });
    }
  }, []);

  return (
    <div className="joljak-wrapper">
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/signin" exact={true} component={SignIn} />
          <Route path="/signup" exact={true} component={SignUp} />
          <Route path="/mypage" exact={true} component={MyPage} />
          <Route path="/notice" exact={true} component={Notice} />
          <Route path="/error" exact={true} component={ErrorPage} />
          <Route path="/team-building" component={Tbuild} />
          <Route path="/works" component={Works} />
          <Route path="/search" exact={true} component={Search} />
          <Route path="/visitors/:year" exact={true} component={Visitors} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
