import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import ButtonWIthIcon from '../../../common/ButtonWIthIcon.js';
import './TeamList.scss';
import { getTeams } from '../../../../../service/api/teams';
import ThereIsNoList from '../../ThereIsNoList';
import Team from './Team';

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    last: false,
    totalElements: 0,
  });

  useEffect(() => {
    getTeams(0)
      .then((response) => {
        const { getTeamResponsePage } = response;
        setTeams(getTeamResponsePage.content);
        setPageInfo({
          ...pageInfo,
          page: getTeamResponsePage.pageable.pageNumber + 1,
          last: getTeamResponsePage.last,
          totalElements: getTeamResponsePage.totalElements,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const handleNextPage = async () => {
    // todo : 다음페이지(무한 스크롤)
  };

  const handleCreateTeam = () => {
    // todo : 등록하기 클릭
  };

  const handleShowFilterModal = () => {
    // todo : 상세검색
  };

  const test = () => {
    console.log('test');
  };
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
      />
      <div className="hero-img"></div>
      <div className="teams-wrap">
        <div className="teams-top">
          <div className="teams-top-left">
            <h3>전체 팀 수</h3>
            <h3>{pageInfo.totalElements}</h3>
          </div>
          <div className="teams-top-right">
            <ButtonWIthIcon
              btntype="filter"
              btnTxt="상세검색"
              handleButton={handleShowFilterModal}
            />
            <ButtonWIthIcon
              btntype="create"
              btnTxt="등록하기"
              handleButton={handleCreateTeam}
            />
          </div>
        </div>
        <div className="teams-body">
          {pageInfo.totalElements == 0 ? (
            <ThereIsNoList />
          ) : (
            <>
              <div className="teams-body-title">{/* todo : title 구현 */}</div>
              <div className="teams-body-list">
                {teams.map((team) => (
                  <Team
                    key={team.id}
                    id={team.id}
                    category={team.category}
                    designerMember={team.designerMember}
                    developerMember={team.developerMember}
                    mediaArtMember={team.mediaArtMember}
                    plannerMember={team.plannerMember}
                    author={team.author}
                    createdDate={team.createdDate}
                    images={team.imageInfoList}
                    teamName={team.teamName}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TeamList;
