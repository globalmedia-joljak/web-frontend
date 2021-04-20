import React from 'react';
import { Route, Switch } from 'react-router';
import TeamList from './teamList/TeamList';
import CreateTeam from './createTeam/CreateTeam';
import DetailTeanm from './detailTeam/DetailTeam';

const Teams = ({ match }) => {
  return (
    <>
    <Switch>
      <Route exact path={`${match.path}`} component={TeamList} />
      <Route exact={true} path={`${match.path}/create`} component={CreateTeam} />
      <Route exact path={`${match.path}/:id`} component={DetailTeanm} />
    </Switch>
    </>
  );
};

export default Teams;
