import React, { useEffect, useRef, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { navRoutes, subRoutes } from "./headerDataList.js";

import "./headerStyle.scss";

//로딩후 넓이와 resize될때 넓이값에 따라 nav에 clickEvent를 준다.
const SizeChecking = (curSize) => {
  const [size, setSize] = useState(curSize);

  const handleResize = () => setSize(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return { size };
};

// clickHandler
const NavClickEvent = (size, tablet, navEl) => {
  useEffect(() => {
    if (navEl.current === undefined) return;

    const handleClick = (e) => {
      let { classList, tagName, parentElement } = e.target;
      const ON = "on";

      // overflow된 video 태그 없애기(스크롤시)
      navEl.current.offsetParent.nextSibling.style.display =
        navEl.current.className !== ON ? "none" : "grid";

      if (tagName === "NAV") {
        return classList.contains(ON)
          ? classList.remove(ON)
          : classList.add(ON);
      }

      if (
        tagName === "A" ||
        (tagName === "DIV" && classList.contains("t-nav"))
      ) {
        // 팀빌딩, 프로젝트일경우
        if (tagName === "A") {
          const { id } = parentElement;
          const SHOW = "show";

          if (id === "teams" || id === "project") {
            if (tagName === "A") {
              const { classList } = e.target.parentElement;

              return classList.contains(SHOW)
                ? classList.remove(SHOW)
                : classList.add(SHOW);
            }
          }
        }

        // a클릭시 nav페이지 나가기
        if (navEl.current.classList.contains(ON))
          navEl.current.classList.remove(ON);
      }
    };

    // tablet사이즈일때 부터
    if (size < tablet) {
      navEl.current.addEventListener("click", handleClick);
    } else if (size > tablet) {
      navEl.current.classList.remove("on");
      navEl.current.removeEventListener("click", handleClick);
    }

    // cleanUp
    return () => {
      navEl.current.removeEventListener("click", handleClick);
    };
  }, [size, tablet, navEl]);

  return { navEl };
};

// tablet ~ phone / sub_nav_template
const SubNavigation = (id) => {
  if (id === null) return;

  let data = [];

  const { teamList, projectList } = subRoutes;

  switch (id) {
    case "teams":
      data = teamList;
      break;

    case "project":
      data = projectList;
      break;

    default:
      break;
  }

  return data.map(({ path, name }, i) => {
    return <li key={i}>{<Link to={path}>{name}</Link>}</li>;
  });
};

// routes_template
const RouterLink = (size, tablet, CheckMoreBtn) => {
  let data = "";

  let linkData = navRoutes;
  let webNav = linkData.filter((_, i) => i > 0 && i < linkData.length - 1);

  size > tablet ? (data = webNav) : (data = linkData);
  return data.map(({ path, name, id }) => {
    return (
      <li key={id} id={id}>
        <Link to={path}>
          {name}
          {(id === "teams" || id === "project") && size < tablet && (
            <div id="more-icon">
              <span></span>
              <span className="rotate"></span>
            </div>
          )}
        </Link>
        {(id === "teams" || id === "project") && size < tablet && (
          <ul className="nav-sub-wrap">{SubNavigation(id)}</ul>
        )}
      </li>
    );
  });
};

const Navigation = ({ location: { pathname } }) => {
  const navEl = useRef();

  // 현재 사이즈 확인.
  const tablet = 768;
  const { size } = SizeChecking(window.innerWidth);

  // roter lists
  NavClickEvent(size, tablet, navEl);
  const router = RouterLink(size, tablet);

  return (
    <header className={pathname === "/" ? "light" : "dark"}>
      <div className="inr">
        <div className={`h-nav`}>
          <h1 className="h-logo">
            <Link to="/" />
          </h1>

          <nav ref={navEl}>
            {size < tablet ? (
              <div className="t-nav">
                <div className="t-nav-inr">
                  <h1 className="h-logo">
                    <Link to="/" />
                  </h1>
                  <ul className="nav-inr-wrap">{router}</ul>
                </div>
              </div>
            ) : (
              <ul className="nav-inr-wrap">{router}</ul>
            )}
          </nav>
        </div>

        <div className="mypage">
          <button className="mp-btn">
            <Link to="/mypage">user</Link>
            <span>님, 안녕하세요</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Navigation);
