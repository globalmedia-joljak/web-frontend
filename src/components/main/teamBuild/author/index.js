import React from 'react';
import { Route } from 'react-router';
import AuthorDetail from './AuthorDetail';
import ListOfAuthorForm from './ListOfAuthorForm';

const AuthorForm = ({ match }) => {
  return (
    <>
      <Route exact path={`${match.path}`} component={ListOfAuthorForm} />
      <Route path={`${match.path}/:id`} component={AuthorDetail} />
    </>
  );
};

export default AuthorForm;
