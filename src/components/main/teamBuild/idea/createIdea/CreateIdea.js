import React, { useState, useEffect, useRef, useCallback } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import './CreateIdea.scss';
import { Editor } from '@toast-ui/react-editor';
import { ToastContainer, toast } from 'react-toastify';
import { useAppState } from '../../../../../context/appContext';
import MemberRoleSquare from '../../team/teamList/MemberRole';
import { createIdea } from '../../../../../service/api/ideas';
import ModalTemp from '../../../../modal/ModalTemp';
import { uploadImage } from '../../../../../service/api/upload';

const CreateIdea = ({ history }) => {
  const {
    userInfo: { isLogin, classOf },
  } = useAppState();
  const { userInfo } = useAppState();

  const editorRef = useRef();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('ONGOING');

  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [requiredPositions, setRequiredPositions] = useState([]);
  const [contact, setContact] = useState('');
  const [filterShow, setFilterShow] = useState(false);
  const [developerChecked, setDeveloperChecked] = useState(false);
  const [designerChecked, setDesignerChecked] = useState(false);
  const [mediaInfo, setMediaInfo] = useState('');
  const [plannerChecked, setPlannerChecked] = useState(false);
  const [mediaArtChecked, setMediaArtChecked] = useState(false);
  const [content, setContent] = useState('');
  let formdata = new FormData();

  const handleFilter = useCallback((e) => {
    setContent(editorRef.current.getInstance().getHtml());
    setFilterShow(!filterShow);
  });

  const handleSubmit = () => {
    if (!title) {
      toast.error('⛔ 아이디어 이름을 적어주세요.');
      return;
    }
    if (!category || category === 'NONE') {
      toast.error('⛔ 카테고리를 적어주세요.');
      return;
    }

    developerChecked === true ? requiredPositions.push('DEVELOPER') : <></>;
    designerChecked === true ? requiredPositions.push('DESIGNER') : <></>;
    plannerChecked === true ? requiredPositions.push('PLANNER') : <></>;
    mediaArtChecked === true ? requiredPositions.push('MEDIA_ART') : <></>;

    makeArrFromData(requiredPositions, 'requiredPositions');

    const request = {
      title: title,
      category: category,
      status: status,
      content: editorRef.current.getInstance().getHtml(),
      contact: contact,
    };
    if (file) {
      request['file'] = file;
    }

    for (let attr in request) {
      formdata.append(attr, request[attr]);
    }

    createIdea(formdata).then((response) => {
      history.push(`/team-building/idea/${response.id}`);
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (!file) {
      document.getElementById('file__name').innerHTML = '파일을 선택해주세요.';
      return;
    }
    document.getElementById('file__name').innerHTML = file.name;
  };

  const handleFileDelete = () => {
    setFile(null);
    document.getElementById('file__name').innerHTML = '파일을 선택해주세요.';
  };

  const handleModalSubmit = (e) => setFilterShow(!filterShow);

  const handleStatusChange = (e) => {
    e.target.checked ? setStatus('COMPLETE') : setStatus('ONGOING');
  };

  const makeArrFromData = useCallback((arr, queryName) => {
    return arr.map((data, i) => {
      formdata.append(`${queryName}[${i}]`, data);
    });
  });

  useEffect(() => {}, []);

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
      {filterShow ? (
        <>
          <ModalTemp
            modalShow={filterShow}
            handleCancel={setFilterShow}
            handleOk={handleModalSubmit}
            form={'author'}
            btnTxt="선택완료"
          >
            <li className="modal__position">
              <h3>필요한 포지션</h3>
              <p>필요한 직군을 선택하세요</p>
              <div className="modal__position__list">
                {developerChecked === true ? (
                  <div
                    className="modal__developer__checked"
                    onClick={() => setDeveloperChecked(!developerChecked)}
                  >
                    <p>개발자</p>
                  </div>
                ) : (
                  <div
                    className="modal__developer"
                    onClick={() => setDeveloperChecked(!developerChecked)}
                  >
                    <p>개발자</p>
                  </div>
                )}

                {designerChecked === true ? (
                  <div
                    className="modal__designer__checked"
                    onClick={() => setDesignerChecked(!designerChecked)}
                  >
                    <p>디자이너</p>
                  </div>
                ) : (
                  <div
                    className="modal__designer"
                    onClick={() => setDesignerChecked(!designerChecked)}
                  >
                    <p>디자이너</p>
                  </div>
                )}

                {plannerChecked === true ? (
                  <div
                    className="modal__planner__checked"
                    onClick={() => setPlannerChecked(!plannerChecked)}
                  >
                    <p>기획자</p>
                  </div>
                ) : (
                  <div
                    className="modal__planner"
                    onClick={() => setPlannerChecked(!plannerChecked)}
                  >
                    <p>기획자</p>
                  </div>
                )}

                {mediaArtChecked === true ? (
                  <div
                    className="modal__media__checked"
                    onClick={() => setMediaArtChecked(!mediaArtChecked)}
                  >
                    <p>미디어아트</p>
                  </div>
                ) : (
                  <div
                    className="modal__media"
                    onClick={() => setMediaArtChecked(!mediaArtChecked)}
                  >
                    <p>미디어아트</p>
                  </div>
                )}
              </div>
            </li>
          </ModalTemp>
        </>
      ) : (
        <>
          <div className="idea__wrap">
            <div className="idea__top">
              <div className="idea__type">
                <h2>글쓰기</h2>
              </div>
              <div className="board__category">
                <h3>게시판</h3>
                <input
                  type="text"
                  defaultValue={'아이디어 게시판'}
                  readOnly={true}
                />
              </div>
              <div className="idea__status">
                <h3>결성 유무</h3>
                <div className="idea__status__check">
                  <label className="switch" htmlFor="checkbox">
                    <input
                      type="checkbox"
                      id="checkbox"
                      value={status}
                      onChange={handleStatusChange}
                    />
                    <div className="slider round"></div>
                  </label>
                </div>
              </div>
              <div className="idea__category">
                <h3>카테고리</h3>
                <select
                  name="selectCategory"
                  id="selectCategory"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="NONE">선택안함</option>
                  <option value="WEB_APP">웹/앱</option>
                  <option value="MEDIA_ART">미디어아트</option>
                  <option value="ANIMATION">영상/애니메이션</option>
                  <option value="GAME">게임</option>
                </select>
              </div>
              <div className="idea__title">
                <h3>제목</h3>
                <input
                  type="text"
                  value={title}
                  placeholder="제목을 입력하세요"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="idea__body">
              <div className="idea__body__editor">
                <Editor
                  previewStyle="vertical"
                  width="1194px"
                  height="600px"
                  initialEditType="wysiwyg"
                  initialValue={content}
                  placeholder="글을 작성해주세요"
                  ref={editorRef}
                  usageStatistics={false}
                  hooks={{
                    addImageBlobHook: (blob, callback) => {
                      uploadImage(userInfo.classOf, blob).then((response) => {
                        callback(response.url, 'alt text');
                      });
                      return false;
                    },
                  }}
                />
              </div>
            </div>
            <div className="idea__bottom">
              <div className="idea__required">
                <div className="idea__required__head" onClick={handleFilter}>
                  <h3>필요한 포지션</h3>
                  <div className="idea__requried__image"></div>
                </div>
                <div className="idea__required__checked">
                  {developerChecked === true ? (
                    <MemberRoleSquare role="DEVELOPER" text="DEVELOPER" />
                  ) : (
                    <></>
                  )}
                  {designerChecked === true ? (
                    <MemberRoleSquare role="DESIGNER" text="DESIGNER" />
                  ) : (
                    <></>
                  )}

                  {plannerChecked === true ? (
                    <MemberRoleSquare role="PLANNER" text="PLANNER" />
                  ) : (
                    <></>
                  )}

                  {mediaArtChecked === true ? (
                    <MemberRoleSquare role="MEDIA_ART" text="MEDIA_ART" />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="idea__contact">
                <h3>개인 연락처</h3>
                <input
                  type="text"
                  value={contact}
                  placeholder="핸드폰 번호나 카카오톡 아이디, 이메일 중 자유롭게 입력해주세요."
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div className="idea__file">
                <label className="idea__file__label" htmlFor="input-file">
                  <div className="idea__file__label__left">
                    <div className="file__image"></div>
                    <p id="file__name">파일을 선택해주세요.</p>
                  </div>
                  <button
                    className="delete__button"
                    onClick={handleFileDelete}
                  />
                </label>
                <input
                  type="file"
                  value={mediaInfo}
                  name="photo"
                  id="input-file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="create__button">
              <button onClick={handleSubmit}>등록</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateIdea;
