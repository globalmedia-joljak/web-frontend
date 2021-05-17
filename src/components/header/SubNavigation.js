import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react/cjs/react.development';
import { useAppState } from '../../context/appContext';
import useAsync from '../../hooks/useAsync';
import { getWorksYears } from '../../service/api/work';
const tablet = 768;
const SubNavigation = ({ type, url, location }) => {
  const { curSize } = useAppState();
  const teamList = [
    { path: `${url}/author`, name: '작가 목록', id: 'author' },
    { path: `${url}/teams`, name: '팀 목록', id: 'teams' },
    { path: `${url}/idea`, name: '아이디어 게시판', id: 'idea' },
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
            { path: `${url}/${year}`, name: `${year}`, id: `${year}` },
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

    type === 't-build' ? setSubLinks(teamList) : setSubLinks(worksList);
  }, [yearsList, type]);

  const ulRefs = useRef();

  useEffect(() => {
    if (curSize > tablet) {
      const filterPathName = location.pathname.split('/');

      if (ulRefs.current) {
        const links = [...ulRefs.current.children];
        links.map((link) => {
          if (link.classList.contains('click')) {
            link.classList.remove('click');
          }

          filterPathName.find((path) => {
            if (path === link.children[0].id) {
              link.classList.add('click');
            }
          });
        });
      }
    }
  });

  if (loading) return null;
  if (!data) return null;

  return (
    <ul ref={ulRefs}>
      {subLinks &&
        subLinks.map(({ path, name, id }, i) => {
          return (
            <li key={i} className={`sub-links ${i === 0 ? `click` : ''}`}>
              <Link to={path} className="header-route" id={id}>
                {name}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default SubNavigation;
