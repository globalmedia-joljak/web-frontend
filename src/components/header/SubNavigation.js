import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import { useAppState } from '../../context/appContext';

const SubNavigation = ({ type, url, years }) => {
  const { crrentYear } = useAppState();

  const teamList = [
    { path: `${url}/author`, name: '작가 목록' },
    { path: `${url}/teams`, name: '팀 목록' },
    { path: `${url}/idea`, name: '아이디어 게시판' },
  ];

  const [worksList, setWorksList] = useState([]);
  useEffect(() => {
    if (years) {
      years.map((year) => {
        setWorksList(worksList.concat({ path: `${url}/${year}`, name: year }));
      });
    }
  }, []);

  const subLinks = type === 'teams' ? teamList : worksList;

  return (
    <>
      {subLinks.map(({ path, name }, i) => {
        return (
          <li key={i}>
            <Link to={path} className="header-route" id={i}>
              {name}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default SubNavigation;
