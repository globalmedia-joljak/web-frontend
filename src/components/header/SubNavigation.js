import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react/cjs/react.development';
import { useAppState } from '../../context/appContext';
import useAsync from '../../hooks/useAsync';
import { getWorksYears } from '../../service/api/work';
import TeamList from '../main/teamBuild/team/teamList/TeamList';

const SubNavigation = ({ type, url }) => {
  const { crrentYear } = useAppState();

  const teamList = [
    { path: `${url}/author`, name: '작가 목록' },
    { path: `${url}/teams`, name: '팀 목록' },
    { path: `${url}/idea`, name: '아이디어 게시판' },
  ];

  const [worksList, setWorksList] = useState([
    { path: `${url}/2021`, name: '2021' },
  ]);

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
