import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react/cjs/react.development';
import useAsync from '../../hooks/useAsync';
import { getWorksYears } from '../../service/api/work';

const SubNavigation = ({ type, url }) => {
  const teamList = [
    { path: `${url}/author`, name: '작가 목록' },
    { path: `${url}/teams`, name: '팀 목록' },
    { path: `${url}/idea`, name: '아이디어 게시판' },
  ];

  let worksList = [];

  const [yearsList] = useAsync(() => getWorksYears(), []);
  const [subLinks, setSubLinks] = useState([]);

  const { loading, data } = yearsList;
  const createObj = () => {
    if (data) {
      data.map(
        (year) =>
          (worksList = [
            ...worksList,
            { path: `${url}/${year}`, name: `${year}` },
          ]),
      );
    }
  };

  useEffect(() => {
    if (!data) return null;

    if (data) {
      if (type === 'works') {
        createObj();
      }
    }

    type === 'teams' ? setSubLinks(teamList) : setSubLinks(worksList);
  }, [yearsList, type]);

  const ulRefs = useRef();
  const links = ulRefs.current;

  const handleClick = (e) => {
    if (links) {
      const link = [...links.children];
      link.map((el) => {
        return el.classList.remove('click');
      });
      e.target.parentNode.classList.add('click');
    }
  };

  if (loading) return null;
  if (!data) return null;

  return (
    <ul ref={ulRefs}>
      {subLinks &&
        subLinks.map(({ path, name }, i) => {
          return (
            <li key={i} className={`${i === 0 ? `click` : ''}`}>
              <Link
                to={path}
                onClick={handleClick}
                className="header-route"
                id={i}
              >
                {name}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default SubNavigation;
