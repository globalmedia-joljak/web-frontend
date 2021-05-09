import React from 'react';
import { Redirect, Route } from 'react-router';
import { useEffect, useState } from 'react/cjs/react.development';
import SubNavigation from '../components/header/SubNavigation';
import WorksForm from '../components/main/works';
import { useAppState } from '../context/appContext';
import { getWorksYears } from '../service/api/work';

const Works = ({ match, location }) => {
  const { currentYears } = useAppState();

  return (
    <main className="works-wrap">
      <div className="section-wrap">
        <section className="side-menu">
          <ul>
            <SubNavigation type="works" url={match.url} />
          </ul>
        </section>
        <section className="contents">
          <div className="content">
            {location.pathname === '/works' && (
              <Redirect to={`${match.path}/${currentYears}`} />
            )}
            <Route path={`${match.path}/:year`} component={WorksForm} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Works;
