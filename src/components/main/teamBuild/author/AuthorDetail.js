import React from 'react';
import { useAppDispatch } from '../../../../context/appContext';
import {
  useTeamsDispatch,
  useTeamsState,
} from '../../../../context/teamContext';

const AuthorDetail = ({ match }) => {
  const { translationKR, setJobColor } = useAppDispatch();
  const { profileListData } = useTeamsState();
  const { filterClassOf } = useTeamsDispatch();

  const author = profileListData.content.find((data) => {
    return data.user.classOf === match.params.id;
  });

  const { user } = author;
  return (
    <div className="author-detail-wrap">
      <div className="author-info">
        <div className="author-img-box">
          <span
            className="author-bg"
            style={{ backgroundColor: setJobColor(user.mainProjectRole) }}
          />
        </div>
        <div className="author-contents">
          <div className="author-contents-info">
            <h3
              className="author-role"
              style={{ color: setJobColor(user.mainProjectRole) }}
            >
              {translationKR(user.mainProjectRole)}
              <span className="author-sub-role">
                {translationKR(user.subProjectRole)}
              </span>
            </h3>
            <h2 className="author-name">
              {user.name}
              <span className="classof-author">
                {filterClassOf(user.classOf)}학번
              </span>
            </h2>
            <ul className="edit-author-info">
              <li className="author-edit">
                <i className="icon" />
                <button>수정</button>
              </li>
              <li className="author-del">
                <i className="icon" />
                <button>삭제</button>
              </li>
            </ul>
          </div>
          <p className="author-introduction">자기소개</p>
        </div>
      </div>
      <div className="author-portfolio">
        <h3>작업물(포트폴리오)</h3>
        {/* 작업물이 유무에 따라 마크업이 다르다. */}
        <ul className="portfolio-lists">
          <li className="portfolio">
            <i className="icon-link"></i>
            <strong className="title">작업물제목</strong>
            <a>
              https://www.youtube.com/watch?v=UADJDSICiCI&ab_channel=MBCentertainment
            </a>
          </li>
        </ul>
      </div>
      <div className="author-contact">
        <h3>연락처</h3>
        <ul className="contacts">
          <li className="phone">
            <i className="contact-img"></i>
            <span>연락처</span>
          </li>
          <li className="kakao">
            <i className="contact-img"></i>
            <span>연락처</span>
          </li>
          <li className="instagram">
            <i className="contact-img"></i>
            <span>연락처</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AuthorDetail;
