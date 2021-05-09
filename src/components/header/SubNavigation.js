import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import useAsync from '../../hooks/useAsync';
import { getWorksYears } from '../../service/api/work';

const SubNavigation = ({ type, url }) => {
  const teamList = [
    { path: `${url}/author`, name: '작가 목록' },
    { path: `${url}/teams`, name: '팀 목록' },
    { path: `${url}/idea`, name: '아이디어 게시판' },
  ];

  const [worksList, setWorksList] = useState([]);

  const [yearsList] = useAsync(() => getWorksYears(), []);
  const [subLinks, setSubLinks] = useState([]);

  const { loading, data } = yearsList;
  const createObj = () => {
    if (data) {
      data.map((year) =>
        setWorksList(
          worksList.push({ path: `/works/${year}`, name: `${year}` }),
        ),
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

  if (loading) return null;
  if (!data) return null;

  return (
    <>
      {subLinks &&
        subLinks.map(({ path, name }, i) => {
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
