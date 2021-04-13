import React, { useState, useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import './CreateTeam.scss';
import { Editor } from '@toast-ui/react-editor';
import { ToastContainer } from 'react-toastify';
import MemberRoleSquare from '../teamList/MemberRole';

const CreateTeam = () => {
  const editorRef = useRef()

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
    <div className="team__wrap">
      <div className="team__top">
        <div className="team__type">
          <h2>글쓰기</h2>
        </div>
        <div className="team__category">
          <h3>게시판</h3>
          <input
            type="text"
            onChange={(e) => {}}
            defaultValue={"팀 목록"}
            readOnly={true}
          />
        </div>
        <div className="team__title">
          <h3>제목</h3>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            onChange={(e) => {}}
          />
        </div>
      </div>
      <div className="team__body">
        <div className="team__body__editor">
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
      <div className="team__bottom">
        <div className="team__members">
          <h3>팀 구성원</h3>
          <div className="team__member">
            <MemberRoleSquare
              role="DESIGNER"
              text="DESIGNER"
            />
            <input
              type="text"
              onChange={(e) => {}}
              placeholder="이름(학번) 형식으로 입력해주세요. ex)홍길동(20151234)"
            />
          </div>
          <div className="team__member">
            <MemberRoleSquare
              role="DEVELOPER"
              text="DEVELOPER"
            />
            <input
              type="text"
              onChange={(e) => {}}
              placeholder="이름(학번) 형식으로 입력해주세요. ex)홍길동(20151234)"
            />
          </div>
          <div className="team__member">
            <MemberRoleSquare
              role="MEDIA_ART"
              text="MEDIA_ART"
            />
            <input
              type="text"
              onChange={(e) => {}}
              placeholder="이름(학번) 형식으로 입력해주세요. ex)홍길동(20151234)"
            />
          </div>
          <div className="team__member">
            <MemberRoleSquare
              role="PLANNER"
              text="PLANNER"
            />
            <input
              type="text"
              onChange={(e) => {}}
              placeholder="이름(학번) 형식으로 입력해주세요. ex)홍길동(20151234)"
            />
          </div>
          <div className="team__file">
            <label className="team__file__label" htmlFor="input-file">
              <div className="team__file__label__left">
                <div className="file__image"></div>
                <p>파일을 선택해주세요.</p>
              </div>
              <button className="delete__button"></button>
            </label>
            <input type="file" name="photo" id="input-file" />  
          </div>
        </div>
        
      </div>
    </div>
    
    </>
    
  );

}

export default CreateTeam;