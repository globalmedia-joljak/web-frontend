import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ThereIsNoList from '../../common/ThereIsNoList';
import ButtonWIthIcon from '../../common/ButtonWIthIcon.js';
import { useEffect, useState } from 'react/cjs/react.development';
import { getWorksYearList } from '../../../../service/api/work.js';
import noImage from '../../../../assets/images/노이미지@2x.png';
import './listOfWorksStyle.scss';
import WorkListModal from './WorkListModal';
import { useAppDispatch, useAppState } from '../../../../context/appContext';
import { Link } from 'react-router-dom';
import HeroImageForm from '../../common/HeroImageForm';
import LoadingForm from '../../common/LoadingForm';
import useTitle from '../../../../hooks/useTitle';

const ListOfWorks = ({ match, history }) => {
  useTitle(
    `:졸업작품 - ${match.params['year'] ? match.params['year'] : '리스트'}`,
  );

  const { worksKR, worksColor } = useAppDispatch();
  const {
    infinite,
    userInfo: { isLogin },
  } = useAppState();

  const [loading, setLoading] = useState(false);
  const [worksList, setWorksList] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    last: false,
    totalElements: 0,
  });

  useEffect(() => {
    const { scrollTop, scrollHeight, clientHeight } = infinite;
    if (scrollTop === 0 || clientHeight === 0 || scrollHeight === 0)
      return false;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setLastPage(true);
    }
  }, [lastPage]);

  useEffect(() => {
    setLastPage(false);
    if (!pageInfo.last) getWorksData();
  }, [match.url, lastPage]);

  const getWorksData = () => {
    setLoading(true);
    getWorksYearList(
      {
        pageNum: pageInfo.page,
        year: match.params.year,
      },
      history,
    )
      .then((res) => {
        const worksData = res.workResponseList;
        setWorksList([...worksList, ...worksData.content]);

        setPageInfo({
          ...pageInfo,
          page: worksData.pageable.pageNumber + 1,
          last: worksData.last,
          totalElements: worksData.totalElements,
        });
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  // filter
  const [filterShow, setFilterShow] = useState(false);
  const [choiceValue, seChoiceValue] = useState({
    worksList: [],
    exhibitedYear: [],
  });

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

  // create
  const handleAddWorks = () => {
    if (!isLogin) {
      toast.warn(
        `⛔ 로그인후 이용가능한 서비스 입니다. 로그인 페이지로 이동합니다.`,
      );
      setTimeout(() => history.push('/signin'), 1200);
      return false;
    }

    history.push(`${match.url}/none/create`);
  };

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
    };
    return style;
  };

  const listItemBackgroundImg = (imageInfoList) => {
    return imageInfoList ? `url(${imageInfoList[0].url})` : `url(${noImage})`;
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
          handleSubmit={() => setFilterShow(false)}
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
                전체 작품 수<span>{worksList ? worksList.length : 0}</span>
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
            {worksList.length === 0 ? (
              <ThereIsNoList type="works" />
            ) : (
              <>
                <ul className="works-list">
                  {worksList.length > 0 &&
                    worksList.map(
                      ({
                        id,
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
                                  backgroundImage:
                                    listItemBackgroundImg(imageInfoList),
                                }}
                              >
                                <i className="work-hover-bg" />
                              </i>
                            </span>
                            <div className="work-contets-wrap">
                              <span
                                className="project-category"
                                style={projectCategoryStyle(projectCategory)}
                              >
                                {worksKR(projectCategory)}
                              </span>
                              <strong className="work-name">{workName}</strong>
                              <b className="team-name">{teamName}</b>
                              <span className="members">
                                {teamMember.map((name, i) => (
                                  <i key={i}>{name}</i>
                                ))}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ),
                    )}
                </ul>
                {loading && <LoadingForm />}
                {pageInfo.last && (
                  <p className="last-list">마지막 게시글입니다.</p>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ListOfWorks;
