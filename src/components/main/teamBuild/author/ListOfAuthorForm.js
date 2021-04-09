import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppState } from '../../../../context/appContext';
import {
  useTeamsDispatch,
  useTeamsState,
} from '../../../../context/teamContext';
import useAsync from '../../../../hooks/useAsync';
import ModalTemp from '../../../modal/ModalTemp';
import OccupationListForm from '../../../modal/OccupationListForm';
import ThereIsNoList from '../ThereIsNoList';
import './authorStyle.scss';
import { getAuthorProfileList } from '../../../../service/api/profile.js';
import CreateAuthor from './CreateAuthor';
import { toast, ToastContainer } from 'react-toastify';
import AuthorButton from './AuthorButton';

const ListOfAuthorForm = ({ match, history }) => {
  const {
    userInfo: { isLogin, classOf },
  } = useAppState();
  const { translationKR, setJobColor } = useAppDispatch();
  const { filterClassOf, setShowCreate } = useTeamsDispatch();
  const { showCreate } = useTeamsState();

  const [filterShow, setFilterShow] = useState(false);
  const [filterRole, setFilterRole] = useState('');

  const [profilePageNum, setProfilePageNum] = useState(1);

  const [profileList, refetch] = useAsync(() =>
    getAuthorProfileList(profilePageNum),
  );
  // TODO : 스크롤시 데이터를 추가로 불러와 주어야 한다(setProfilePageNum)

  const { loading, data, error } = profileList;

  const handleFilter = useCallback((e) => setFilterShow(!filterShow));
  const handleChoice = useCallback((e) => setFilterRole(e.target.value), [
    setFilterRole,
  ]);

  const handleSubmit = (e) => setFilterShow(!filterShow);

  if (loading) return <div>로딩중...</div>;
  if (!data) return null;
  if (error) return <div></div>;
  console.log(data);
  let authorListData = [];

  if (filterRole === '' || filterRole === '전체') {
    authorListData = data.content;
  } else {
    authorListData = data.content.filter(
      (author) => author.user.mainProjectRole === filterRole,
    );
  }

  const addAuthorHandler = (e) => {
    if (!isLogin) {
      setShowCreate(false);
      toast.error('⛔ 로그인했을 경우 작가등록이 가능합니다!');
      return false;
    } else {
      const filterAuthor = () =>
        authorListData.find((author) => author.user.classOf === classOf);

      if (filterAuthor.length === 1) {
        toast.info(
          '❕ 이미 작가등록 하셨습니다. 작가 목록 페이지로 가시겠습니까?',
        );
        history.push(`/author/${classOf}`);
      }

      setShowCreate(true);
    }
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
        style={{ color: '#ffffff', fontWeight: 'bold' }}
      />
      {filterShow ? (
        <ModalTemp
          modalShow={filterShow}
          handleCancel={setFilterShow}
          handleOk={handleSubmit}
          form={'author'}
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
          <div className="author-wrap">
            {showCreate ? (
              <CreateAuthor type="create" />
            ) : (
              <>
                <h3>
                  전체 작가 인원<span>{authorListData.length}</span>
                </h3>
                {authorListData.length < 1 ? (
                  <ThereIsNoList />
                ) : (
                  <ul className="author-list">
                    {authorListData.map(
                      ({
                        id,
                        user: {
                          classOf,
                          name,
                          mainProjectRole,
                          subProjectRole,
                        },
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
                            <i className="author-img">
                              <i className="hover-bg"></i>
                            </i>
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                )}
                <div className="author-functions">
                  <AuthorButton
                    btnType="filter"
                    btnTxt="상세검색"
                    handleButton={handleFilter}
                  />
                  <AuthorButton
                    btnType="create"
                    btnTxt="등록하기"
                    handleButton={addAuthorHandler}
                  />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ListOfAuthorForm;
