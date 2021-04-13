import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppState } from '../../../../context/appContext';
import { createAuthorProfile } from '../../../../service/api/profile';
import AuthorButton from './AuthorButton';
import { SettingPortfolio, SettingRole } from './AuthorModal';
import './editAuthorStyle.scss';
import EditDeleteButton from './EditDeleteButton';

const CreateAuthor = ({ type }) => {
  const setImgEl = useRef();
  const {
    userRole,
    userInfo: { classOf },
  } = useAppState();
  const { setJobColor, translationKR } = useAppDispatch();

  const [image, setImage] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [mainRole, setMainRole] = useState('');
  const [subRole, setSubRole] = useState('');
  const [portfolioLinks, setPortfolioLinks] = [];

  // TODO : 이미지를 가져온 경우 클래스명을 줘 사진가져오기 icon을 변경해줘야 한다.

  //set role
  const [modalShow, setModalShow] = useState(false);
  const handleRoleChoice = () => {};
  const handleRoleSubmit = () => {};

  // set introduce
  const [textLen, setTextLen] = useState(0);
  const [txtOver, setTxtOver] = useState('');

  const handleIntroduce = (e) => {
    // console.log(e);
    if (textLen < 1000) {
      console.log('전달 완료');
      return createAuthorProfile(classOf, { introduce: introduce });
    }
  };
  const handleTextArea = (e) => {
    setIntroduce(e.target.value);
    setTextLen(e.target.value.length);
  };

  // set portfolio
  const [portfolioShow, setPortfolioShow] = useState(false);

  const handleEdit = () => {};
  const handleDelete = () => {};
  const handlePfSubmit = () => {};
  const handlePfChange = () => {};

  useEffect(() => {
    textLen >= 1000 ? setTxtOver('over') : setTxtOver('');

    if (setImgEl.current) {
      Array.from(setImgEl.current.children).map(
        (el) => (el.style.height = `${el.clientWidth}px`),
      );
    }
  });

  //TODO : 직군 설정 란 (MYPAGE에서 가져와 적용시켜줘야한다.)

  return (
    <>
      {modalShow ? (
        SettingRole({
          handleRoleChoice,
          handleRoleSubmit,
          modalShow,
          setModalShow,
        })
      ) : (
        <>
          {portfolioShow ? (
            SettingPortfolio({
              handlePfSubmit,
              handlePfChange,
              portfolioShow,
              setPortfolioShow,
            })
          ) : (
            <div className="edit-author-wrap">
              {/* 사진설정 */}
              <section className="edit-section">
                <h3 className="edit-author-title">
                  <i className="title-icon" />
                  사진 설정
                </h3>
                <p className="edit-author-description">
                  자신을 나타낼 수 있는 사진들을 등록해보세요.
                </p>
                <div className="section-contents set-img" ref={setImgEl}>
                  <div className="custom-img">
                    <div className="img"></div>
                    <div className="set-img-icon">
                      <i className="icon" />
                      <span>사진 가져오기</span>
                    </div>
                    <label className="file-button" htmlFor="input-file" />
                    <input
                      type="file"
                      id="input-file"
                      accept="image/png, image/jpeg"
                    />
                  </div>
                  <div className="default-img">
                    <div className="img"></div>
                    <div className="set-img-icon">
                      <i className="icon" />
                      <span>기본 이미지로 설정</span>
                    </div>
                  </div>
                </div>
              </section>
              {/* 직군 설정 */}
              <section className="edit-section">
                <h3 className="edit-author-title">
                  <i className="title-icon" />
                  직군 설정
                  <button
                    className="set-role-icon"
                    onClick={() => setModalShow(true)}
                  />
                </h3>
                <p className="edit-author-description">
                  자신의 직군을 설정하세요.(대표 1개, 부가직군 1개까지 설정
                  가능)
                </p>
                <div className="section-contents set-role">
                  <ul>
                    <li>
                      <strong>선택하세요</strong>
                      <span>대표직군</span>
                    </li>
                    <li>
                      <strong>선택하세요</strong>
                      <span>부가직군</span>
                    </li>
                  </ul>
                </div>
              </section>
              {/* 자기소개글 설정 */}
              <section className="edit-section">
                <h3 className="edit-author-title">
                  <i className="title-icon" />
                  자기소개글 설정
                </h3>
                <p className="edit-author-description">
                  자기소개글을 작성하세요.(공백 포함 1000자 이내)
                </p>
                <div className="section-contents set-introduce">
                  <textarea
                    name="introduce"
                    maxLength={1000}
                    onChange={handleTextArea}
                  ></textarea>
                  <span
                    className={`txt-length ${txtOver}`}
                  >{`${textLen}/1000`}</span>
                  <AuthorButton
                    btntype="edit"
                    btnTxt="수정완료"
                    handleButton={handleIntroduce}
                  />
                </div>
              </section>
              {/* 포트폴리오 설정 */}
              <section className="edit-section">
                <h3 className="edit-author-title">
                  <i className="title-icon" />
                  포트폴리오 설정
                </h3>
                <p className="edit-author-description">
                  본인의 포트폴리오를 설정하세요.(최대 5개)
                </p>
                <div className="section-contents set-portfolio">
                  <ul>
                    <li className="portfolio">
                      <i className="porfolio-icon"></i>
                      <div className="portfolio-title-box">
                        <strong className="porfolio-title">작업물제목</strong>
                        <div className="edit-delete-box">
                          <EditDeleteButton
                            form="portfolio"
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                          />
                        </div>
                      </div>
                      <a className="porfolio-link">
                        https://www.youtube.com/watch?v=UADJDSICiCI&ab_channel=MBCentertainment
                      </a>
                    </li>
                  </ul>

                  <button
                    className="portfolio-add-btn"
                    onClick={() => setPortfolioShow(true)}
                  >
                    <i className="porfolio-add-icon" />
                    등록하기
                  </button>
                </div>
              </section>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CreateAuthor;
