import React, { useState, useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import './CreateIdea.scss';
import { Editor } from '@toast-ui/react-editor';
import { ToastContainer, toast } from 'react-toastify';
import { useAppState } from '../../../../../context/appContext';
import MemberRoleSquare from '../../team/teamList/MemberRole';
import { createIdea } from '../../../../../service/api/ideas';
import OccupationListForm from '../../../../modal/OccupationListForm';

const CreateIdea = ({ history }) => {
  const {
    userInfo: { isLogin, classOf },
  } = useAppState();

  const editorRef = useRef();
  const [title, setTitle] = useState(null);
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState(null);
  const [file, setFile] = useState(null);
  const [requiredPositions, setRequiredPosition] = useState(null);
  const [contact, setContact] = useState(null);

  const handleSubmit = () => {
    if (!title) {
      toast.error('⛔ 아이디어 이름을 적어주세요.');
      return;
    }
    if (!category || category === 'NONE') {
      toast.error('⛔ 카테고리를 적어주세요.');
      return;
    }
    const request = {
      title: title,
      category: category,
      status: status,
      content: editorRef.current.getInstance().getHtml(),
      requiredPositions: requiredPositions,
      contact: contact,
    };
    if (file) {
      request['file'] = file;
    }

    createIdea(request).then((response) => {
      history.push(`/ideas/${response.id}`);
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

  const handleStatusChange = (e) => {
    e.target.checked ? setStatus('COMPLETE') : setStatus('ONGOING');
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
      />
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
              placeholder="글을 작성해주세요"
              ref={editorRef}
              usageStatistics={false}
            />
          </div>
        </div>
        <div className="idea__bottom">
          <div className="idea__required">
            <h3>필요한 포지션</h3>
            {/* 모달 */}
          </div>
          <div className="idea__contact">
            <h3>개인 연락처</h3>
            <input
              type="text"
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
              <button className="delete__button" onClick={handleFileDelete} />
            </label>
            <input
              type="file"
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
  );
};

export default CreateIdea;
