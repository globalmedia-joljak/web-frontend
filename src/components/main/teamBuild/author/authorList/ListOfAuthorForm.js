import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppState } from '../../../../../context/appContext';
import { useTeamsDispatch } from '../../../../../context/teamContext';
import useAsync from '../../../../../hooks/useAsync';
import ModalTemp from '../../../../modal/ModalTemp';
import OccupationListForm from '../../../../modal/OccupationListForm';
import ThereIsNoList from '../../../common/ThereIsNoList';
import './authorStyle.scss';
import { getAuthorProfileList } from '../../../../../service/api/profile.js';

import { toast, ToastContainer } from 'react-toastify';
import ButtonWIthIcon from '../../../common/ButtonWIthIcon.js';
import { useEffect } from 'react/cjs/react.development';

const ListOfAuthorForm = ({ match, history }) => {
  const {
    infinite,
    userInfo: { isLogin, classOf },
  } = useAppState();
  const { translationKR, setJobColor } = useAppDispatch();
  const { filterClassOf, setDefaultImg } = useTeamsDispatch();

  const createAuthorEl = useRef();

  const [filterShow, setFilterShow] = useState(false);
  const [filterRole, setFilterRole] = useState(null);

  const [profilePageNum, setProfilePageNum] = useState(0);
  const [authorList, setAuthorList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const [profileList, refetch] = useAsync(
    () => getAuthorProfileList(profilePageNum),
    [profilePageNum],
  );

  const handleFilter = useCallback((e) => setFilterShow(!filterShow));
  const handleChoice = useCallback((e) => setFilterRole(e.target.value), [
    setFilterRole,
  ]);

  const [total, setTotal] = useState(true);

  useEffect(() => {
    // TODO : 스크롤시 데이터를 추가로 불러와 주어야 한다
    if (!profileList.data) return;
    setAuthorList(profileList.data.content);

    const { scrollTop, scrollHeight, clientHeight } = infinite;
    if (scrollTop === 0 || clientHeight === 0 || scrollHeight === 0) return;

    if (scrollTop + clientHeight >= scrollHeight) {
      console.log('여기서 데이터를 더 가져와야 한다.');
    }
  }, [profileList, profilePageNum, totalPage, infinite]);

  useEffect(() => {
    if (!filterRole || filterRole === '전체') {
      setFilterList(authorList);
    } else {
      setFilterList(
        authorList.filter((author) => {
          return filterRole === author.user.mainProjectRole;
        }),
      );
    }
  }, [authorList, filterRole, setFilterList]);

  const { loading, data, error } = profileList;
  if (loading) return <div>로딩중...</div>;
  if (!data) return null;
  if (error) return <div></div>;

  const handleSubmit = (e) => setFilterShow(!filterShow);

  const addAuthorHandler = (e) => {
    if (!isLogin) {
      toast.error(
        '⛔ 로그인했을 경우 작가등록이 가능합니다. 로그인 페이지로 이동합니다.',
      );
      setTimeout(() => history.push('/signin'), 2300);
      return false;
    }

    const filterAuthor = data.content.find(
      (author) => author.user.classOf === classOf,
    );

    if (filterAuthor) {
      if (!classOf) return false;
      const message =
        '이미 작가등록을 하셨습니다. 작가 목록 페이지로 가시겠습니까?';

      if (window.confirm(message)) history.push(`${match.url}/${classOf}`);

      return false;
    }

    history.push(`${match.url}/${classOf}/create`);
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
            />
          </li>
        </ModalTemp>
      ) : (
        <>
          <div className="hero-img"></div>
          <div className="author-wrap content-size" ref={createAuthorEl}>
            <div className="content-header">
              <h3>
                전체 작가 인원
                <span>{total ? data.totalElements : filterList.length}</span>
              </h3>
              <div className="search-list">
                <span className="search-icon" />
                <input type="text" placeholder="이름, 학번 검색" />
              </div>
              <div className="main-functions">
                <ButtonWIthIcon
                  btntype="filter"
                  btnTxt="상세검색"
                  handleButton={handleFilter}
                />
                <ButtonWIthIcon
                  btntype="create"
                  btnTxt="등록하기"
                  handleButton={addAuthorHandler}
                />
              </div>
            </div>

            {filterList.length < 1 ? (
              <ThereIsNoList type="team-building" />
            ) : (
              <ul className="author-list">
                {filterList.map(
                  ({
                    id,
                    user: { classOf, name, mainProjectRole, subProjectRole },
                    mediaInfo,
                  }) => (
                    <li key={id}>
                      <Link to={`${match.path}/${classOf}`}>
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
                          {name}
                          <span>{filterClassOf(classOf)}학번</span>
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
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ListOfAuthorForm;
