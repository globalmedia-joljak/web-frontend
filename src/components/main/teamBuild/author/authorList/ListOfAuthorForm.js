import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppState } from '../../../../../context/appContext';
import { useTeamsDispatch } from '../../../../../context/teamContext';
import ModalTemp from '../../../../modal/ModalTemp';
import OccupationListForm from '../../../../modal/OccupationListForm';
import ThereIsNoList from '../../../common/ThereIsNoList';
import './authorStyle.scss';
import {
  getAuthorProfileDetail,
  getAuthorProfileList,
} from '../../../../../service/api/profile.js';

import { toast, ToastContainer } from 'react-toastify';
import ButtonWIthIcon from '../../../common/ButtonWIthIcon.js';
import { useEffect } from 'react/cjs/react.development';
import HeroImageForm from '../../../common/HeroImageForm';
import LoadingForm from '../../../common/LoadingForm';
import useTitle from '../../../../../hooks/useTitle';

const ListOfAuthorForm = ({ match, history }) => {
  useTitle(`:작가`);

  const {
    infinite,
    userInfo: { isLogin, classOf },
  } = useAppState();

  const { translationKR, setJobColor } = useAppDispatch();
  const { filterClassOf, setDefaultImg } = useTeamsDispatch();

  const createAuthorEl = useRef();

  const [filterShow, setFilterShow] = useState(false);
  const [filterRole, setFilterRole] = useState(null);

  const [loading, setLoading] = useState(false);
  const [authorList, setAuthorList] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    last: false,
    totalElements: 0,
  });

  useEffect(() => {
    const authorImg = document.querySelectorAll('.author-img');
    if (authorImg) {
      [...authorImg].map((el) => {
        return (el.style.height = `${el.clientWidth}px`);
      });
    }
  });

  // 필터관련내용
  const handleFilter = useCallback((e) => setFilterShow(!filterShow));
  const handleChoice = useCallback(
    (e) => setFilterRole(e.target.value),
    [setFilterRole],
  );

  useEffect(() => {
    const { scrollTop, scrollHeight, clientHeight } = infinite;
    if (scrollTop === 0 || clientHeight === 0 || scrollHeight === 0)
      return false;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setLastPage(true);
    }
  }, [lastPage, infinite]);

  useEffect(() => {
    setLastPage(false);
    if (!pageInfo.last) handleNextPage();
  }, [lastPage]);

  const handleNextPage = () => {
    setLoading(true);
    getAuthorProfileList(pageInfo.page)
      .then((res) => {
        setAuthorList([...authorList, ...res.content]);

        setPageInfo({
          ...pageInfo,
          page: res.pageable.pageNumber + 1,
          last: res.last,
          totalElements: res.totalElements,
        });

        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const handleSubmit = (e) => setFilterShow(!filterShow);

  const addAuthorHandler = (e) => {
    if (!isLogin) {
      toast.error(
        '⛔ 로그인했을 경우 작가등록이 가능합니다. 로그인 페이지로 이동합니다.',
      );
      setTimeout(() => history.push('/signin'), 2300);
      return false;
    }

    getAuthorProfileDetail(classOf)
      .then((res) => {
        const message =
          '이미 작가등록을 하셨습니다. 작가 목록 페이지로 가시겠습니까?';

        if (window.confirm(message)) history.push(`${match.url}/${classOf}`);

        return false;
      })
      .catch((err) => {
        if (err.response.status === 404) {
          history.push(`${match.url}/${classOf}/create`);
        }
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ color: '#ffffff', fontWeight: 'bold' }}
      />

      {filterShow ? (
        <ModalTemp
          modalShow={filterShow}
          handleCancel={setFilterShow}
          handleOk={handleSubmit}
          form={'author'}
          btnTxt="선택완료"
        >
          <li className="list r2">
            <h3>상세검색</h3>
            <p>관심있는 직군을 선택해보세요</p>
            <OccupationListForm
              type="filterChoice"
              handleChoice={handleChoice}
              txt="전체"
              worktype=""
            />
          </li>
        </ModalTemp>
      ) : (
        <>
          <HeroImageForm
            type="author"
            heroTitle="작가목록"
            heroContent="이번 졸업작품에 참여하는"
            heroContent2=" 작가들의 목록입니다."
          />
          <div className="author-wrap content-size" ref={createAuthorEl}>
            <div className="content-header">
              <h3>
                전체 작가 인원
                <span>{pageInfo.totalElements}</span>
              </h3>
              {/* <div className="search-list">
                <span className="search-icon" />
                <input type="text" placeholder="이름, 학번 검색" />
              </div> */}
              <div className="main-functions">
                {/* <ButtonWIthIcon
                  btntype="filter"
                  btnTxt="상세검색"
                  handleButton={handleFilter}
                /> */}
                <ButtonWIthIcon
                  btntype="create"
                  btnTxt="등록하기"
                  handleButton={addAuthorHandler}
                />
              </div>
            </div>

            {authorList.length < 1 ? (
              <ThereIsNoList type="team-building" />
            ) : (
              <>
                <ul className="author-list">
                  {authorList.map(
                    ({
                      id,
                      user: { classOf, name, mainProjectRole, subProjectRole },
                      mediaInfo,
                    }) => (
                      <li key={id}>
                        <Link to={`${match.url}/${classOf}`}>
                          <b className="main-role">
                            {translationKR(mainProjectRole)}
                            <span
                              className="main-role-hover"
                              style={{
                                backgroundColor: setJobColor(mainProjectRole),
                              }}
                            ></span>
                          </b>
                          <strong className="author-name">
                            <span className="name">{name}</span>
                            <span className="classof">
                              {filterClassOf(classOf)}학번
                            </span>
                          </strong>
                          <span
                            className="sub-role"
                            style={{
                              borderColor: setJobColor(subProjectRole),
                              color: setJobColor(subProjectRole),
                            }}
                          >
                            {translationKR(subProjectRole)}
                          </span>
                          <i
                            className="author-img"
                            style={{
                              backgroundImage: `url(${
                                mediaInfo
                                  ? mediaInfo.url
                                  : setDefaultImg(mainProjectRole)
                              })`,
                            }}
                          >
                            <i className="hover-bg" />
                          </i>
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
                {loading && <LoadingForm />}
              </>
            )}
            {pageInfo.last && <p className="last-list">마지막 게시글입니다.</p>}
          </div>
        </>
      )}
    </>
  );
};

export default ListOfAuthorForm;
