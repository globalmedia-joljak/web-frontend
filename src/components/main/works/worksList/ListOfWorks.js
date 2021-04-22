import React from 'react';
import { ToastContainer } from 'react-toastify';
import ThereIsNoList from '../../common/ThereIsNoList';
import ButtonWIthIcon from '../../common/ButtonWIthIcon.js';
import useAsync from '../../../../hooks/useAsync';
import { useEffect, useState } from 'react/cjs/react.development';
import { getWorksLists } from '../../../../service/api/work.js';
import { data } from '../data.js';
import noImage from '../../../../assets/images/노이미지@2x.png';
import './listOfWorksStyle.scss';

const ListOfWorks = ({ match }) => {
  const [pageNum, setPageNum] = useState(0);
  // const [worksListData] = useAsync(() => getWorksLists(pageNum), [pageNum]);

  // 실제 사용할 데이터 data.workResponseList
  const handleFilter = () => {};
  const handleAddWorks = () => {};

  const [totalPage, setTotalPage] = useState(false);
  useEffect(() => {
    const lis = document.querySelectorAll('.works-list > li');
    const workImages = document.querySelectorAll('.work-img-wrap');

    Array.from(workImages).map(
      (img) =>
        (img.style.height = `${Math.floor(img.offsetWidth / 3) * 1.8}px`),
    );
  });
  // if (!worksListData.data) return null;
  const { page, workResponseList } = data;

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
      <>
        <div className="hero-img"></div>
        <div className="works-wrap content-size">
          <div className="content-header">
            <h3>
              전체 작가 인원
              <span>{workResponseList.length}</span>
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
                handleButton={handleAddWorks}
              />
            </div>
          </div>

          {workResponseList.length < 0 ? (
            <ThereIsNoList type="works" />
          ) : (
            <ul className="works-list">
              {workResponseList.map(
                ({
                  id,
                  content,
                  url,
                  projectCategory,
                  teamMember,
                  teamName,
                  workName,
                }) => (
                  <li key={id}>
                    <span className="work-img-wrap">
                      <i
                        className="work-img"
                        style={{ backgroundImage: `url(${url ?? noImage})` }}
                      >
                        <i className="work-hover-bg" />
                      </i>
                    </span>
                    <div className="work-contets-wrap">
                      <strong className="work-name">
                        {workName}
                        <span className="project-category">
                          {projectCategory}
                        </span>
                      </strong>
                      <b className="team-name">
                        {teamName}
                        <span className="members">
                          {teamMember.map((name, i) => (
                            <i key={i}>{name}</i>
                          ))}
                        </span>
                      </b>
                      <p className="work-content">{content}</p>
                    </div>
                  </li>
                ),
              )}
            </ul>
          )}
        </div>
      </>
    </>
  );
};

export default ListOfWorks;
