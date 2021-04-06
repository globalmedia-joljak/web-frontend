import React, { useEffect, useRef, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { navRoutes, subRoutes } from './headerDataList.js';

import './headerStyle.scss';
import { useAppState } from '../../context/appContext.js';

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

//로딩후 넓이와 resize될때 넓이값에 따라 nav에 clickEvent를 준다.
const SizeChecking = (curSize, navEl, pathname, state) => {
  const [size, setSize] = useState(curSize);
  const [scroll, setScroll] = useState(0);

  const handleResize = () => setSize(window.innerWidth);
  const handleScroll = () => setScroll(Math.floor(window.scrollY));

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return { size, scroll };
};

const NavClickEvent = (size, tablet, navEl) => {
  useEffect(() => {
    if (navEl.current === undefined) return;

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

          style.display = navEl.current.classList.contains(ON)
            ? 'none'
            : 'block';
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
      navEl.current.removeEventListener('click', handleClick);
    };
  }, [size, tablet, navEl]);

  return { navEl };
};

// tablet ~ phone / sub_nav_template
const SubNavigation = (id) => {
  if (id === null) return;

  const { teamList, projectList } = subRoutes;

  let data = [];
  switch (id) {
    case 'teams':
      data = teamList;
      break;

    case 'project':
      data = projectList;
      break;

    default:
      break;
  }

  return data.map(({ path, name, id }, i) => {
    return (
      <li key={i}>
        {
          <Link to={path} className="header-route" id={id}>
            {name}
          </Link>
        }
      </li>
    );
  });
};

// routes_template
const RouterLink = (size, tablet) => {
  let data = '';

  let linkData = navRoutes;
  let webNav = linkData.filter((_, i) => i < linkData.length - 1);

  size > tablet ? (data = webNav) : (data = linkData);

  return data.map(({ path, name, id }) => {
    return (
      <li key={id}>
        <Link to={path} className="header-route" id={id}>
          {name}
          {(id === 'teams' || id === 'project') && size < tablet && (
            <div id="more-icon">
              <span></span>
              <span className="rotate"></span>
            </div>
          )}
        </Link>
        {(id === 'teams' || id === 'project') && size < tablet && (
          <ul className="nav-sub-wrap">{SubNavigation(id)}</ul>
        )}
      </li>
    );
  });
};

const Navigation = ({ location: { pathname, state } }) => {
  const navEl = useRef();
  const { userInfo } = useAppState();

  // 현재 사이즈 확인.
  const tablet = 768;
  const { size, scroll } = SizeChecking(
    window.innerWidth,
    navEl,
    pathname,
    state,
  );
  const { hStyle } = NavStyling(navEl, size, tablet);

  // roter lists
  NavClickEvent(size, tablet, navEl);
  const router = RouterLink(size, tablet);

  return (
    <header
      className={pathname !== '/' || scroll > 0 ? 'dark' : 'light'}
      style={{ display: state !== undefined ? 'none' : 'grid' }}
    >
      <div className="header-inr inr">
        <div className="header-inr-wrap" style={{ ...hStyle }}>
          <h1 className="header-logo">
            <Link to="/" />
          </h1>

          <nav className="h-nav" ref={navEl}>
            {size > tablet ? (
              <ul className="nav-inr-wrap" style={{ ...hStyle }}>
                {router}
              </ul>
            ) : (
              <div className="header-nav-tablet">
                <div className="header-nav-tablet-inr">
                  <h1 className="header-logo">
                    <Link to="/" className="header-route" />
                  </h1>

                  <ul className="nav-inr-wrap">{router}</ul>
                </div>
              </div>
            )}
          </nav>
        </div>

        <div className="mypage">
          <button className="mypage-btn">
            {
              userInfo.isLogin ? 
                <>
                <Link to="/mypage">{userInfo.name}</Link>
                <span>님, 안녕하세요</span>
                </>
              :
                <>
                <Link to="/signin"> 로그인 </Link>
                |
                <Link to="/signup"> 회원가입 </Link>
                </>
            }
            
          </button>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Navigation);
