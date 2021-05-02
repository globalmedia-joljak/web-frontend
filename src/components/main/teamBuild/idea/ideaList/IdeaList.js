import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import ButtonWithIcon from '../../../common/ButtonWIthIcon.js';
import './IdeaList.scss';
import { getIdeas } from '../../../../../service/api/ideas';
import ThereIsNoList from '../../../common/ThereIsNoList';
import Idea from './Idea';
import { Link } from 'react-router-dom';
import { useAppState } from '../../../../../context/appContext.js';

const IdeaList = ({ match, history }) => {
  const {
    userInfo: { isLogin, classOf },
  } = useAppState();
  const [ideas, setIdeas] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    last: false,
    totalElements: 0,
  });

  const [toggleIdea, setToggleIdea] = useState(false);

  const onClickToggle = () => {
    toggleIdea ? setToggleIdea(false) : setToggleIdea(true);
  };
  useEffect(() => {
    getIdeas(0)
      .then((response) => {
        const { ideaBoardResponseList } = response;
        setIdeas(ideaBoardResponseList.content);
        setPageInfo({
          ...pageInfo,
          page: ideaBoardResponseList.pageable.pageNumber,
          last: ideaBoardResponseList.last,
          totalElements: ideaBoardResponseList.totalElements,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleNextPage = async () => {
    // todo : 다음 페이지(무한 스크롤)
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
      <div className="hero-img"></div>
      <div className="ideas-wrap">
        <div className="ideas-top">
          <div className="ideas-top-left">
            <div className="ideas-count">
              <h3>전체 아이디어 수</h3>
              <h3>{pageInfo.totalElements}</h3>
            </div>
            <div className="sidebar">|</div>
            <div className="ideas-hide-complete">
              {toggleIdea === false ? (
                <h3 onClick={onClickToggle}>결성된 팀 숨기기</h3>
              ) : (
                <h3 onClick={onClickToggle}>전체 아이디어 목록 보기</h3>
              )}
            </div>
          </div>
          <div className="ideas-top-right">
            <div className="ideas-top-right-search">
              <ButtonWithIcon
                btntype="filter"
                btnTxt="상세검색"
                handleButton={handleShowFilterModal}
              />
            </div>
            <div className="ideas-top-right-create">
              <ButtonWithIcon
                btntype="create"
                btnTxt="글쓰기"
                handleButton={handleCreateTeam}
              />
            </div>
          </div>
        </div>
        <div className="ideas-body">
          {pageInfo.totalElements == 0 ? (
            <ThereIsNoList />
          ) : (
            <>
              <div className="ideas-body-title">{/* todo : title 구현 */}</div>
              <div className="ideas-body-list">
                {ideas.map((idea) => (
                  <Idea
                    key={idea.id}
                    id={idea.id}
                    title={idea.title}
                    category={idea.category}
                    requiredPositions={idea.requiredPositions}
                    author={idea.name}
                    status={idea.status}
                    createDate={idea.createDate}
                    toggleIdea={toggleIdea}
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

export default IdeaList;
