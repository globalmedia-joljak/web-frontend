import React from 'react';
import { Route } from 'react-router';
import AuthorDetail from './detailAuthor/AuthorDetail.js';
import ListOfAuthorForm from './authorList/ListOfAuthorForm.js';
import CreateAuthor from './createAuthor/CreateAuthor.js';

const AuthorForm = ({ match }) => {
  return (
    <>
      <Route path={`${match.path}`} exact={true} component={ListOfAuthorForm} />
      <Route path={`${match.path}/:id`} component={AuthorDetail} exact={true} />
      <Route
        path={`${match.path}/:id/:state`}
        exact={true}
        component={CreateAuthor}
      />
    </>
  );
};

export default AuthorForm;
