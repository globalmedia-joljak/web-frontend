import React from 'react';
import { Redirect, Route } from 'react-router';
import SubNavigation from '../components/header/SubNavigation';
import ListOfWorks from '../components/main/works/ListOfWorks';
import WorksProvider from '../context/worksContext';

const Projects = ({ match }) => {
  console.log(match);
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
              <Route path={`${match.path}/2021`} component={ListOfWorks} />

              {/* <Route path={`${match.path}/:year`} component={ListOfWorks} /> */}
              {match.url === '/works' && <Redirect to={`${match.path}/2021`} />}
            </div>
          </section>
        </div>
      </main>
    </WorksProvider>
  );
};

export default Projects;
