import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ThereIsNoList from '../../common/ThereIsNoList';
import ButtonWIthIcon from '../../common/ButtonWIthIcon.js';
import useAsync from '../../../../hooks/useAsync';
import { useEffect, useState } from 'react/cjs/react.development';
import { getWorksLists } from '../../../../service/api/work.js';
import noImage from '../../../../assets/images/노이미지@2x.png';
import './listOfWorksStyle.scss';
import WorkListModal from './WorkListModal';
import { useAppDispatch, useAppState } from '../../../../context/appContext';
import { Link } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';
import HeroImageForm from '../../common/HeroImageForm';

const ListOfWorks = ({ match, history }) => {
  const { worksKR, worksColor } = useAppDispatch();
  const {
    userInfo: { name, isLogin },
  } = useAppState();

  const [pageNum, setPageNum] = useState(0);

  const [worksListData] = useAsync(() => getWorksLists(pageNum), [pageNum]);
  const { loading, data, error } = worksListData;

  // filter
  const [filterShow, setFilterShow] = useState(false);
  const [choiceValue, seChoiceValue] = useState({
    worksList: [],
    exhibitedYear: [],
  });

  // list style
  useEffect(() => {
    const workImages = document.querySelectorAll('.work-img-wrap');
    Array.from(workImages).map(
      (img) =>
        (img.style.height = `${Math.floor(img.offsetWidth / 3) * 1.8}px`),
    );
  });

  const projectCategoryStyle = (category) => {
    const style = {
      color: worksColor(category),
      borderColor: worksColor(category),
    };
    return style;
  };

  // filter
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

  if (loading) return <div>로딩중...</div>;
  if (!data) return null;
  if (error) return <div>listof work error</div>;

  const handleModalSubmit = () => {
    setFilterShow(false);
  };
  // create
  const handleAddWorks = () => {
    if (!isLogin) {
      toast.warn(
        `⛔ 로그인후 이용가능한 서비스 입니다. 로그인 페이지로 이동합니다.`,
      );
      setTimeout(() => history.push('/signin'), 1200);
      return false;
    }

    const isItAuthor = data.workResponseList.content.find(
      (el) => el.author === name,
    );

    if (isItAuthor) {
      const message =
        '이미 졸업작품을 등록하셨습니다. 졸업작품 상세페이지로 가시겠습니까?';

      return window.confirm(message)
        ? history.push(`${match.url}/${isItAuthor.id}`)
        : false;
    }

    history.push(`${match.url}/none/create`);
  };

  const { page, workResponseList } = data;

  const listItemBackgroundImg = (imageInfoList) => {
    // return imageInfoList ? `url(${imageInfoList[0].url})` : `url(${noImage})`;
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
        <WorkListModal
          modalShow={filterShow}
          handleSubmit={handleModalSubmit}
          handleCancel={setFilterShow}
          handleChoice={handleChoiceCategory}
        />
      ) : (
        <>
          <HeroImageForm
            type="works"
            heroTitle="졸업작품"
            heroContent="역대 졸업작품들을 감상해보세요"
            heroContent2=""
          />
          <div className="works-wrap content-size">
            <div className="content-header">
              <h3>
                전체 작가 인원
                <span>{workResponseList.totalElements}</span>
              </h3>
              {/* <div className="search-list">
                <span className="search-icon" />
                <input
                  type="text"
                  placeholder="전체 년도 작품검색"
                  onFocus={(e) => e.target.parentNode.classList.add('dark')}
                  onBlur={(e) => e.target.parentNode.classList.remove('dark')}
                />
              </div> */}
              <div className="main-functions">
                {/* <ButtonWIthIcon
                  btntype="filter"
                  btnTxt="상세검색"
                  handleButton={() => setFilterShow(true)}
                /> */}
                <ButtonWIthIcon
                  btntype="create"
                  btnTxt="등록하기"
                  handleButton={handleAddWorks}
                />
              </div>
            </div>
            {workResponseList.totalElements === 0 ? (
              <ThereIsNoList type="works" />
            ) : (
              <ul className="works-list">
                {workResponseList.content.map(
                  ({
                    id,
                    content,
                    imageInfoList,
                    projectCategory,
                    teamMember,
                    teamName,
                    workName,
                  }) => (
                    <li key={id}>
                      <Link to={`${match.url}/${id}`}>
                        <span className="work-img-wrap">
                          <i
                            className="work-img"
                            style={{
                              backgroundImage: listItemBackgroundImg(
                                imageInfoList,
                              ),
                            }}
                          >
                            <i className="work-hover-bg" />
                          </i>
                        </span>
                        <div className="work-contets-wrap">
                          <strong className="work-name">
                            {workName}
                            <span
                              className="project-category"
                              style={projectCategoryStyle(projectCategory)}
                            >
                              {worksKR(projectCategory)}
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
                          <Viewer initialValue={content} />
                        </div>
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

export default ListOfWorks;
