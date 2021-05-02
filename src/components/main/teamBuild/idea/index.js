import React from 'react';
import { Route, Switch } from 'react-router';

import CreateIdea from './createIdea/CreateIdea.js';
import IdeaDetail from './ideaList/IdeaDetail.js';
import IdeaList from './ideaList/IdeaList.js';
import UpdateIdea from './updateIdea/updateIdea.js';

const Ideas = ({ match }) => {
  return (
    <>
      <Switch>
        <Route exact path={`${match.path}`} component={IdeaList} />
        <Route
          exact={true}
          path={`${match.path}/create`}
          component={CreateIdea}
        />
        <Route path={`${match.path}/:id/update`} component={UpdateIdea} />
        <Route exact path={`${match.path}/:id`} component={IdeaDetail} />
      </Switch>
    </>
  );
};

export default Ideas;
