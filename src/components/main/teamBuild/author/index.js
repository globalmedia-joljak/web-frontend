import React from 'react';
import { Route } from 'react-router';
import AuthorDetail from './authorList/AuthorDetail.js';
import ListOfAuthorForm from './authorList/ListOfAuthorForm.js';

const AuthorForm = ({ match }) => {
  return (
    <>
      <Route exact path={`${match.path}`} component={ListOfAuthorForm} />
      <Route path={`${match.path}/:id`} component={AuthorDetail} />
    </>
  );
};

export default AuthorForm;
