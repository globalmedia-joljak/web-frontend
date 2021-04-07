import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../../context/appContext';
import {
  useTeamsDispatch,
  useTeamsState,
} from '../../../../context/teamContext';
import ModalTemp from '../../../modal/ModalTemp';
import OccupationListForm from '../../../modal/OccupationListForm';
import ThereIsNoList from '../ThereIsNoList';
import './authorStyle.scss';

const ListOfAuthorForm = ({ match }) => {
  const { translationKR, setJobColor } = useAppDispatch();
  const { profileList, profileListData } = useTeamsState();
  const { filterClassOf } = useTeamsDispatch();

  const [filterShow, setFilterShow] = useState(false);
  const [filterRole, setFilterRole] = useState('');

  const { loading, data, error } = profileList;

  const handleFilter = useCallback((e) => setFilterShow(!filterShow));
  const handleChoice = useCallback((e) => setFilterRole(e.target.value), [
    setFilterRole,
  ]);

  let authorListData = [];
  const handleSubmit = (e) => setFilterShow(!filterShow);

  if (filterRole === '' || filterRole === '전체') {
    authorListData = profileListData.content;
  } else {
    authorListData = profileListData.content.filter(
      (author) => author.user.mainProjectRole === filterRole,
    );
  }

  if (loading) return <div>로딩중...</div>;
  if (error) return <div></div>;

  return (
    <>
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
            <h3>
              전체 작가 인원<span>{authorListData.length}</span>
            </h3>
            {authorListData.length <= 0 ? (
              <ThereIsNoList />
            ) : (
              <ul className="author-list">
                {authorListData.map(
                  ({
                    id,
                    user: { classOf, name, mainProjectRole, subProjectRole },
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
              <button className="btn filter" onClick={(e) => handleFilter(e)}>
                <i className="icon"></i>상세검색
              </button>
              <button className="btn create">
                <i className="icon"></i>등록하기
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListOfAuthorForm;
