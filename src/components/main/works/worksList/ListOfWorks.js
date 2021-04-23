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
import { useRef } from 'react';
import WorkListModal from './WorkListModal';

const ListOfWorks = ({ match }) => {
  const [filterShow, setFilterShow] = useState(false);
  const [choiceValue, seChoiceValue] = useState({
    worksList: [],
    exhibitedYear: [],
  });
  const handleFilter = () => setFilterShow(true);
  const handleChoiceCategory = (e) => {
    const { name, value, checked } = e.target;

    const inputTags = document.querySelectorAll('.work-list input');
    const ALL_CHOICE = '전체선택';

    Array.from(inputTags).map((el, _, arr) => {
      if (name !== el.name) return;

      if (value === ALL_CHOICE) el.checked = checked ?? false;
    });

    const query = `input[name=${name}]:checked`;
    const checkedBoxes = document.querySelectorAll(query);
    const selected = Array.from(checkedBoxes).map((el) => {
      if (el.value === ALL_CHOICE) el.value = null;
      return el.value;
    });

    seChoiceValue({
      ...choiceValue,
      [name]: selected,
    });
  };
  const handleModalSubmit = () => {
    setFilterShow(false);
    console.log(choiceValue);
  };

  const handleAddWorks = () => {};

  const [pageNum, setPageNum] = useState(0);
  // const [worksListData] = useAsync(() => getWorksLists(pageNum), [pageNum]);

  // 실제 사용할 데이터 data.workResponseList

  const [totalPage, setTotalPage] = useState(false);

  useEffect(() => {
    const workImages = document.querySelectorAll('.work-img-wrap');
    Array.from(workImages).map(
      (img) =>
        (img.style.height = `${Math.floor(img.offsetWidth / 3) * 1.8}px`),
    );
  });

  const handleFocus = (e) => e.target.parentNode.classList.add('dark');
  const handleBlur = (e) => e.target.parentNode.classList.remove('dark');

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
        {filterShow && (
          <WorkListModal
            modalShow={filterShow}
            handleSubmit={handleModalSubmit}
            handleCancel={setFilterShow}
            handleChoice={handleChoiceCategory}
          />
        )}
        <div className="hero-img"></div>
        <div className="works-wrap content-size">
          <div className="content-header">
            <h3>
              전체 작가 인원
              <span>{workResponseList.length}</span>
            </h3>
            <div className="search-list">
              <span className="search-icon" />
              <input
                type="text"
                placeholder="전체 년도 작품검색"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
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
