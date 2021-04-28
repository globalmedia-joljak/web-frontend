import React from 'react';
import { Redirect, Route } from 'react-router';
import SubNavigation from '../components/header/SubNavigation';
import WorksForm from '../components/main/works';
import { useAppState } from '../context/appContext';
import WorksProvider from '../context/worksContext';

const Projects = ({ match, location }) => {
  const { crrentYear } = useAppState();

  return (
    <WorksProvider>
      <main className="works-wrap">
        <div className="section-wrap">
          <section className="side-menu">
            <ul>
              <SubNavigation type="works" url={match.url} />
            </ul>
          </section>
          <section className="contents">
            <div className="content">
              <Route path={`${match.path}/:year`} component={WorksForm} />

              {location.pathname === '/works' && (
                <Redirect to={`${match.path}/${crrentYear}`} />
              )}
            </div>
          </section>
        </div>
      </main>
    </WorksProvider>
  );
};

export default Projects;
