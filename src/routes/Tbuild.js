import React from 'react';
import { Route } from 'react-router-dom';
import ListOfTeamForm from '../components/main/teamBuild/team/ListOfTeamForm.js';
import ListOfIdeaForm from '../components/main/teamBuild/idea/ListOfIdeaForm.js';
import '../components/mainStyle.scss';
import AuthorForm from '../components/main/teamBuild/author/index.js';
import TeamsProvider from '../context/teamContext';
import SubNavigation from '../components/header/SubNavigation';

const Tbuild = () => {
  return (
    <TeamsProvider>
      <main className="team-build-wrap">
        <div className="team-section-wrap">
          <section className="team-side-menu">
            <ul>
              <SubNavigation type="teams" />
            </ul>
          </section>
          <section className="team-contents">
            <div className="content">
              <Route path="/author" component={AuthorForm} />
              <Route path="/teams" component={ListOfTeamForm} />
              <Route path="/idea" component={ListOfIdeaForm} />
            </div>
          </section>
        </div>
      </main>
    </TeamsProvider>
  );
};

export default Tbuild;
