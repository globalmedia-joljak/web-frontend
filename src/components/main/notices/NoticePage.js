import React, { useEffect } from 'react';
import './NoticePage.scss';

const NoticePage = ({ match, history }) => {
  useEffect(() => {}, []);

  return (
    <>
      <div className="notice-wrap">
        <div className="poster"></div>
      </div>
    </>
  );
};

export default NoticePage;
