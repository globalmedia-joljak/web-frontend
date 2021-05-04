import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import ButtonWIthIcon from '../../../common/ButtonWIthIcon.js';
import './TeamList.scss';
import { getTeams, getTeam } from '../../../../../service/api/teams';
import ThereIsNoList from '../../../common/ThereIsNoList';
import Team from './Team';
import { Link } from 'react-router-dom';
import { useAppState } from '../../../../../context/appContext.js';

const TeamList = ({ match, history }) => {
  const {
    userInfo: { isLogin, classOf },
  } = useAppState();
  const [teams, setTeams] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    last: false,
    totalElements: 0,
  });
  const [isBottom, setIsBottom] = useState(false);
  const { curSize } = useAppState();

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setIsBottom(false);
    if (!pageInfo.last) {
      handleNextPage();
    }
  }, [isBottom]);

  const onScroll = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 10
    ) {
      setIsBottom(true);
    }

  }

  const handleNextPage = async () => {
    getTeams(pageInfo.page)
      .then((response) => {
        const { getTeamResponsePage } = response;
    
        const merged = [...teams, ...getTeamResponsePage.content];
        setTeams(merged);

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
  };

  const handleShowFilterModal = () => {
    // todo : 상세검색
  };

  const handleCreateTeam = (e) => {
    if (!isLogin) {
      history.push(`/signin`);
      return;
    }

    history.push(`${match.path}/create`);
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
      <div className="hero-img">
        <div className="hero-img__left">
          <h1>팀 목록<br></br></h1>
          {curSize >= 768 ? <h2>이번 졸업작품 팀들을 모아볼 수 있습니다</h2> : <h2>이번 졸업작품 팀들을<br></br> 모아볼 수 있습니다</h2>}
        </div>
        <div className="hero-img__right">
          
        </div>
      </div>
      <div className="teams-wrap">
      {pageInfo.totalElements == 0 ? (
        <ThereIsNoList type="team-building" />
      ) : (
        <>
        <div className="teams-top">
          <div className="teams-top-left">
            <h3>전체 팀 수</h3>
            <h3>{pageInfo.totalElements}</h3>
          </div>
          <div className="teams-top-right">
            {/* <ButtonWIthIcon
              btntype="filter"
              btnTxt="상세검색"
              handleButton={handleShowFilterModal}
            /> */}
            <ButtonWIthIcon
              btntype="create"
              btnTxt="등록하기"
              handleButton={handleCreateTeam}
            />
          </div>
        </div>
        <div className="teams-body">
          <table className="teams-body-title">
            <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>카테고리</th>
                  <th>팀 구성원</th>
                  <th>작성자</th>
                  <th>날짜</th>
                </tr>
              </thead>
          </table>
          
          <div className="teams-body-list">
            {[...teams].map(team => (
              <Team
                key={team.id}
                id={team.id}
                category={team.projectCategory}
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
          {
            pageInfo.last ? <div className="last-list"><p>마지막 게시글입니다</p></div> : <div></div>
          }
        </div>
        </>
      )}
        
      </div>
    </>
  );
};

export default TeamList;
