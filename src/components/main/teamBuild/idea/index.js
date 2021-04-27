import React from 'react';
import { Route } from 'react-router';
import CreateIdea from './createIdea/CreateIdea.js';
import IdeaDetail from './ideaList/IdeaDetail.js';
import IdeaList from './ideaList/IdeaList.js';

const Ideas = ({ match }) => {
  return (
    <>
      <Route exact path={`${match.path}`} component={IdeaList} />
      <Route
        exact={true}
        path={`${match.path}/create`}
        component={CreateIdea}
      />
      <Route exact path={`${match.path}/:id`} component={null} />
    </>
  );
};

export default Ideas;
