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
  const [isBottom, setIsBottom] = useState(false);
  const { curSize } = useAppState();
  const onClickToggle = () => {
    toggleIdea ? setToggleIdea(false) : setToggleIdea(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
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
  };

  const handleNextPage = async () => {
    getIdeas(pageInfo.page)
      .then((response) => {
        const { ideaBoardResponseList } = response;

        const merged = [...ideas, ...ideaBoardResponseList.content];
        setIdeas(merged);

        setPageInfo({
          ...pageInfo,
          page: ideaBoardResponseList.pageable.pageNumber + 1,
          last: ideaBoardResponseList.last,
          totalElements: ideaBoardResponseList.totalElements,
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
          <h1>
            아이디어 게시판<br></br>
          </h1>
          <h2>아이디어들을 모아볼 수 있습니다</h2>
        </div>
        <div className="hero-img__right__idea"></div>
      </div>
      <div className="ideas-wrap">
        {pageInfo.totalElements == 0 ? (
          <ThereIsNoList />
        ) : (
          <>
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
                  {/* <ButtonWithIcon
                btntype="filter"
                btnTxt="상세검색"
                handleButton={handleShowFilterModal}
              /> */}
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
              <table className="ideas-body-title">
                <thead>
                  <tr>
                    <th>결성유무</th>
                    <th>번호</th>
                    <th>제목</th>
                    <th>카테고리</th>
                    <th>필요한 포지션</th>
                    <th>작성자</th>
                    <th>날짜</th>
                  </tr>
                </thead>
              </table>
              <div className="ideas-body-list">
                {[...ideas].map((idea) => (
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
              {pageInfo.last ? (
                <div className="last-list">
                  <p>마지막 게시글입니다</p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default IdeaList;
