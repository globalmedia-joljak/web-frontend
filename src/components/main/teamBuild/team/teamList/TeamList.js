import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import AuthorButton from '../../author/AuthorButton';

import './TeamList.scss';

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    last: false,
    totalElements: 0,
  });

  const handleNextPage = async () => {
    // todo : 다음페이지(무한 스크롤)
  };


  const test = () => {
    console.log('test');
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ color: '#ffffff', fontWeight: 'bold' }}
      />
      <div className="hero-img">

      </div>
      <div className="teams-wrap">
        <div className="teams-top">
          <div className="teams-top-left">
            <h3>전체 팀 수</h3>
            <h3>{pageInfo.totalElements}</h3>
          </div>
          <div className="teams-top-right">
            <AuthorButton
              btnType="filter"
              btnTxt="상세검색"
              handleButton={test}
            />
            <AuthorButton
              btnType="create"
              btnTxt="등록하기"
              handleButton={test}
            />
          </div>
        </div>
        <div className="teams-body">
          <div className="teams-body-title">
            title 
          </div>
          <div className="teams-body-list">
            list
          </div>
          
        </div>
      </div>
    </>
  );
};

export default TeamList;
