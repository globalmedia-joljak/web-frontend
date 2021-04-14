import React from 'react';
import { Route } from 'react-router';
import TeamList from './teamList/TeamList';
import CreateTeam from './createTeam/CreateTeam';

const Teams = ({ match }) => {
  return (
    <>
      <Route exact path={`${match.path}`} component={TeamList} />
      <Route path={`${match.path}/create`} component={CreateTeam} />
    </>
  );
};

export default Teams;
