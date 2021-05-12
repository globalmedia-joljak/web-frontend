import React from 'react';
import { Route } from 'react-router-dom';
import NoticePage from '../components/main/notices/NoticePage.js';

const Notices = ({ match, location }) => {
  return (
    <main>
      <NoticePage />
    </main>
  );
};

export default Notices;
