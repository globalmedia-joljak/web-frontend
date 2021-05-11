import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Ideas from '../components/main/teamBuild/idea/index.js';
import '../components/mainStyle.scss';
import AuthorForm from '../components/main/teamBuild/author/index.js';
import TeamsProvider from '../context/teamContext';
import SubNavigation from '../components/header/SubNavigation';
import Teams from '../components/main/teamBuild/team/index.js';

const Tbuild = ({ match, location }) => {
  return (
    <TeamsProvider>
      <main className="team-build-wrap">
        <div className="section-wrap">
          <section className="side-menu">
            <SubNavigation type="teams" url={match.url} location={location} />
          </section>
          <section className="contents">
            <div className="content">
              {location.pathname === '/team-building' && (
                <Redirect from={match.path} to={`${match.path}/author`} />
              )}
              <Route path={`${match.path}/author`} component={AuthorForm} />
              <Route path={`${match.path}/teams`} component={Teams} />
              <Route path={`${match.path}/idea`} component={Ideas} />
            </div>
          </section>
        </div>
      </main>
    </TeamsProvider>
  );
};

export default Tbuild;
