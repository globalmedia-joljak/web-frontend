import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { useAppDispatch, useAppState } from '../../../../../context/appContext';
import { useTeamsDispatch } from '../../../../../context/teamContext';
import useAsync from '../../../../../hooks/useAsync';
import {
  deleteAuthorProfile,
  getAuthorProfileDetail,
} from '../../../../../service/api/profile';
import EditDeleteButton from '../../../common/EditDeleteButton';
import './authorDetailStyle.scss';

const AuthorDetail = ({ match, history }) => {
  const { translationKR, setJobColor } = useAppDispatch();
  const {
    userInfo: { isLogin, classOf, name },
  } = useAppState();

  const { filterClassOf, setDefaultImg } = useTeamsDispatch();

  const [profileDetail] = useAsync(
    () => getAuthorProfileDetail(match.params.id),
    [match.params.id],
  );

  const { loading, data, error } = profileDetail;

  const handleDelete = () => {
    const delMessage = window.confirm(
      `${name}님을 작가목록에서 삭제 하시겠습니까?`,
    );
    if (delMessage) {
      deleteAuthorProfile(classOf);
      setTimeout(() => history.push(`/author`), 1000);
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (!data) return null;
  if (error) return <div>상세페이지 에러</div>;

  const { user, portfolioLinks, content, mediaInfo } = profileDetail.data;

  return (
    <div className="author-detail-wrap page-box">
      <div className="author-info">
        <div
          className="author-img-box"
          style={{
            backgroundImage: `url(${
              !mediaInfo ? setDefaultImg(user.mainProjectRole) : mediaInfo.url
            })`,
          }}
        >
          <span
            className="author-bg"
            style={{ backgroundColor: setJobColor(user.mainProjectRole) }}
          />
        </div>
        <div className="author-contents">
          <div className="author-contents-info">
            <h3 className="author-role">
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
            {classOf === match.params.id && (
              <EditDeleteButton
                form={'author'}
                handleEdit={() => history.push(`${match.url}/edit`)}
                handleDelete={handleDelete}
              />
            )}
          </div>
          <p className="author-introduction">
            {content ?? '등록된 자기소개가 없습니다.'}
          </p>
        </div>
      </div>
      <div className="author-portfolio">
        <h3>작업물(포트폴리오)</h3>
        {portfolioLinks.length < 1 ? (
          <p className="no-list">등록된 포트폴리오가 없습니다.</p>
        ) : (
          <ul className="portfolio-lists">
            {portfolioLinks.map(({ title, link }, i) => (
              <li className="portfolio" key={i}>
                <i className="icon-link"></i>
                <strong className="title">{title}</strong>
                <a href={link} target="_blank">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        )}
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
