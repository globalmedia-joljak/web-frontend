import React from 'react';
import { Route } from 'react-router';
import CreateIdea from './createIdea/CreateIdea.js';
import IdeaList from './ideaList/IdeaList.js';

const Ideas = ({ match }) => {
  return (
    <>
      <Route exact path={`${match.path}`} component={IdeaList} />
      <Route path={`${match.path}/create`} component={CreateIdea} />
    </>
  );
};

export default Ideas;
