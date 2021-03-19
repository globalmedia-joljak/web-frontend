import React from 'react';

const ErrorPage = ({ history, location }) => {
  location.state = { show: false };
  const handleHome = (e) => history.push('/');
  return (
    <div className="error-page-wrap">
      <div className="error-page-inr">
        <div className="erorr-img"></div>
        <h3>
          페이지를 <span>찾을 수 없습니다</span>
        </h3>
        <div className="error-txt">
          <p>죄송합니다. 기술적인 문제로 일시적으로 접속되지 않았습니다.</p>
          <p>잠시 후 다시 이용 부탁 드리며 이용에 불편을 드려 죄송합니다.</p>
        </div>
        <button className="home-btn" onClick={handleHome}>
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
