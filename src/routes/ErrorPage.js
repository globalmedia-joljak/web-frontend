import React from "react";

const ErrorPage = ({ location }) => {
  return <div>{location.pathname}_페이지를 찾을수 없습니다.</div>;
};

export default ErrorPage;
