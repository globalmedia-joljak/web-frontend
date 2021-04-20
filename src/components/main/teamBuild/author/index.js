import React from 'react';
import { Redirect, Route } from 'react-router';
import AuthorDetail from './authorList/AuthorDetail.js';
import ListOfAuthorForm from './authorList/ListOfAuthorForm.js';
import CreateAuthor from './createAuthor/CreateAuthor.js';

const AuthorForm = ({ match }) => {
  return (
    <>
      <Route exact path={`${match.path}`} component={ListOfAuthorForm} />
      <Route exact path={`${match.path}/:id`} component={AuthorDetail} />
      {/* <Route path={`${match.path}/:id/:state`} component={CreateAuthor} /> */}
      {/* <Redirect /> */}
    </>
  );
};

export default AuthorForm;
