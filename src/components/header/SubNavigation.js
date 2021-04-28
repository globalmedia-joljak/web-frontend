import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react/cjs/react.development';
import { useAppState } from '../../context/appContext';
import useAsync from '../../hooks/useAsync';
import { getWorksYears } from '../../service/api/work';

const SubNavigation = ({ type, url }) => {
  const { crrentYear } = useAppState();

  const teamList = [
    { path: `${url}/author`, name: '작가 목록' },
    { path: `${url}/teams`, name: '팀 목록' },
    { path: `${url}/idea`, name: '아이디어 게시판' },
  ];

  const [yearsState] = useAsync(() => getWorksYears());

  const [worksList, setWorksList] = useState([]);
  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    if (yearsState.data) {
      yearsState.data.map((el) => {
        setWorksList(worksList.concat({ path: `/works/${el}`, name: el }));
      });
    } else {
      setWorksList(
        worksList.concat({ path: `/works/${crrentYear}`, name: crrentYear }),
      );
    }
    type === 'teams' ? setSubLinks(teamList) : setSubLinks(worksList);
  }, [yearsState.data]);

  return (
    <>
      {subLinks.map(({ path, name, id }, i) => {
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
