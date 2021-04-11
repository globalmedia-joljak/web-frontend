import React from 'react';
import { Route } from 'react-router';
import TeamList from './teamList/TeamList';

const Teams = ({ match }) => {
  return (
    <>
      <Route exact path={`${match.path}`} component={TeamList} />
      {/* <Route path={`${match.path}/:id`} component={AuthorDetail} /> */}
    </>
  );
};

export default Teams;
