import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import { useAppState } from '../../context/appContext';

const tablet = 768;

const SubNavigation = ({ type, url }) => {
  console.log(url);
  const teamList = [
    { path: `${url}/author`, name: '작가 목록' },
    { path: `${url}/teams`, name: '팀 목록' },
    { path: `${url}/idea`, name: '아이디어 게시판' },
  ];
  // TODO:데이터에서 년도를 가져올 예정(api연동-----내림차순으로 정렬)
  const [worksList, setWorksList] = useState([
    {
      path: '/works/2021',
      name: '2021',
    },
  ]);

  const { curSize } = useAppState();

  const subLink = type === 'teams' ? teamList : worksList;

  return (
    <>
      {subLink.map(({ path, name, id }, i) => {
        return (
          <li key={i}>
            <Link to={path} className="header-route" id={id}>
              {name}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default SubNavigation;
