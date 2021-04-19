import React, { useEffect, useRef, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './headerStyle.scss';
import { useAppDispatch, useAppState } from '../../context/appContext.js';
import SubNavigation from './SubNavigation';
import { client } from '../../service/api/client';

// routes간격
const NavStyling = (navEl, size, tablet) => {
  const [hStyle, setHstyle] = useState({});

  useEffect(() => {
    const { parentElement } = navEl.current;
    if (size > tablet) {
      const parentWidth = parentElement.clientWidth,
        calculated = Math.floor(parentWidth * 0.07),
        maxGap = 96;

      calculated > maxGap
        ? setHstyle({ gap: `${maxGap}px` })
        : setHstyle({ gap: `${calculated}px` });
    } else {
      return setHstyle({ gap: 0 });
    }
  }, [navEl, setHstyle, size, tablet]);

  return { hStyle };
};

const NavClickEvent = (size, tablet, navEl) => {
  useEffect(() => {
    if (navEl.current === undefined || navEl.current === null) return;

    const handleClick = (e) => {
      let { classList, parentElement, id } = e.target;
      let { style } = navEl.current.offsetParent.nextSibling;

      const ON = 'on';

      const tagFilter = (className) => {
        return classList.contains(className) ?? false;
      };

      switch (true) {
        case tagFilter('h-nav'):
          !tagFilter(ON) ? classList.add(ON) : classList.remove(ON);
          return;

        // routes일 경우
        case tagFilter('header-route'):
          const SHOW = 'show';

          if (id === 'teams' || id === 'project') {
            return parentElement.classList.contains(SHOW)
              ? parentElement.classList.remove(SHOW)
              : parentElement.classList.add(SHOW);
          }

          navEl.current.classList.remove(ON);
          break;

        default:
          navEl.current.classList.remove(ON);
          style.display = 'block';
          break;
      }
    };

    // tablet사이즈일때 부터
    if (size < tablet) {
      navEl.current.addEventListener('click', handleClick);
    } else if (size > tablet) {
      navEl.current.classList.remove('on');
      navEl.current.removeEventListener('click', handleClick);
    }

    return () => {
      if (navEl.current === null) return;
      navEl.current.removeEventListener('click', handleClick);
    };
  }, [size, tablet, navEl]);

  return { navEl };
};

let navRoutes = [
  { id: 'notice', path: '/notice', name: '공지사항' },
  { id: 'teams', path: '/author', name: '팀 빌딩', type: 'sub-nav' },
  { id: 'project', path: '/projects', name: '졸업작품', type: 'sub-nav' },
];

// routes_template
const RouterLink = (size, tablet, signOutHandler, isLogin) => {
  return (
    <>
      {navRoutes.map(({ path, name, id, type }) => {
        return (
          <li key={id}>
            <Link to={path} className="header-route" id={id}>
              {name}
              {(type = 'sub-nav') && size < tablet && (
                <div id="more-icon">
                  <span></span>
                  <span className="rotate"></span>
                </div>
              )}
            </Link>
            {(type = 'sub-nav') && size < tablet && (
              <ul className="nav-sub-wrap">
                <SubNavigation type={id} />
              </ul>
            )}
          </li>
        );
      })}
      {size < tablet && (
        <li>
          {isLogin ? (
            <Link to="/" className="header-route" onClick={signOutHandler}>
              로그아웃
            </Link>
          ) : (
            <Link to="/signin" className="header-route">
              로그인
            </Link>
          )}
        </li>
      )}
    </>
  );
};

const Navigation = ({ location: { pathname }, history }) => {
  const navEl = useRef();
  const { userInfo, curSize, scroll } = useAppState();
  const { setUserInfo } = useAppDispatch();

  // 스타일링
  const tablet = 768;
  const { hStyle } = NavStyling(navEl, curSize, tablet);
  const headerDisplayStyle = () => {
    return pathname === '/signin' || pathname === '/signup'
      ? 'hidden'
      : 'visible';
  };

  const signOutHandler = (e) => {
    window.localStorage.clear();
    delete client.defaults.headers.common["Authorization"];
    delete client.defaults.headers.common["refreshToken"];
    delete client.defaults.headers.common["accessToken"];
    setTimeout(() => setUserInfo({
      ...userInfo,
      classOf: '',
      name: '',
      isLogin: false,
    }), 500);
  };

  // roter lists
  NavClickEvent(curSize, tablet, navEl);
  const router = RouterLink(curSize, tablet, signOutHandler, userInfo.isLogin);

  return (
    <header
      className={pathname !== '/' || scroll > 0 ? 'dark' : 'light'}
      style={{ visibility: headerDisplayStyle() }}
    >
      <div className="header-inr inr">
        <div className="header-inr-wrap" style={{ ...hStyle }}>
          <h1 className="header-logo">
            <Link to="/" />
          </h1>

          <nav className="h-nav" ref={navEl}>
            {curSize < tablet ? (
              <div className="header-nav-tablet">
                <div className="header-nav-tablet-inr">
                  <h1 className="header-logo">
                    <Link to="/" className="header-route" />
                  </h1>

                  <ul className="nav-inr-wrap">{router}</ul>
                </div>
              </div>
            ) : (
              <ul className="nav-inr-wrap" style={{ ...hStyle }}>
                {router}
              </ul>
            )}
          </nav>
        </div>

        <div className="login-status-wrap">
          <div className="login-status-btn">
            {userInfo.isLogin ? (
              <>
                <Link to="/mypage" className="mypage-btn">
                  {userInfo.name}
                </Link>
                <span>님, 안녕하세요</span>
                <button
                  className="logout-btn"
                  onClick={signOutHandler}
                ></button>
              </>
            ) : (
              <>
                <Link to="/signin" className="signin-btn">
                  로그인
                </Link>
                <Link to="/signup" className="signup-btn">
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Navigation);
