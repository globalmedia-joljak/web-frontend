import React from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import ListOfAuthorForm from '../components/main/teamBuild/author/ListOfAuthorForm';
import ListOfTeamForm from '../components/main/teamBuild/team/ListOfTeamForm.js';
import ListOfIdeaForm from '../components/main/teamBuild/idea/ListOfIdeaForm.js';
import '../components/mainStyle.scss';
import AuthorForm from '../components/main/teamBuild/author/index.js';
import TeamsProvider from '../context/teamContext';

const Tbuild = ({ match, location }) => {
  return (
    <TeamsProvider>
      <main className="team-build-wrap">
        <div className="team-section-wrap">
          {/* tablet사이즈 일경우 사라진다. */}
          <section className="team-side-menu">
            <ul>
              <li>
                <Link to={`${match.url}/author`}>작가 목록</Link>
                <span></span>
              </li>
              <li>
                <Link to={`${match.url}/list`}>팀 목록</Link>
                <span></span>
              </li>
              <li>
                <Link to={`${match.url}/idea`}>아이디어 게시판</Link>
                <span></span>
              </li>
            </ul>
          </section>
          <section className="team-contents">
            <div className="content">
              <Route path={`${match.path}/author`} component={AuthorForm} />
              <Route path={`${match.path}/list`} component={ListOfTeamForm} />
              <Route path={`${match.path}/idea`} component={ListOfIdeaForm} />

              {location.pathname === match.path && (
                <Redirect
                  to={`${match.path}/author`}
                  component={ListOfAuthorForm}
                />
              )}
            </div>
          </section>
        </div>
      </main>
    </TeamsProvider>
  );
};

export default Tbuild;
