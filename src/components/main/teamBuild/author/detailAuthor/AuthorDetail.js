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
import useTitle from '../../../../../hooks/useTitle';
import swal from 'sweetalert';

const phone = 426;

const AuthorDetail = ({ match, history }) => {
  useTitle(`:작가 - ${match.params['id']}`);

  const { translationKR, setJobColor } = useAppDispatch();
  const {
    curSize,
    userInfo: { classOf, name },
  } = useAppState();

  const { filterClassOf, setDefaultImg } = useTeamsDispatch();

  const [profileDetail] = useAsync(
    () => getAuthorProfileDetail(match.params.id),
    [match.params.id],
  );

  const { loading, data, error } = profileDetail;

  const handleDelete = () => {
    const delMessage = `${name} 님을 작가목록에서 삭제 하시겠습니까?`;

    swal(delMessage, {
      buttons: ['아니오', '네'],
    }).then((create) => {
      if (create) {
        deleteAuthorProfile(classOf);
        setTimeout(() => history.push('/team-building/author'), 1000);
      }
    });
  };

  useEffect(() => {
    const imagesBox = document.querySelector('.author-img-box');
    const backgroundImg = document.querySelector('.author-bg');

    if (imagesBox) {
      imagesBox.style.height = `${
        Math.floor(imagesBox.clientWidth / 3) + imagesBox.clientWidth
      }px`;

      if (backgroundImg) {
        if (curSize > phone) {
          return (backgroundImg.style.height = `${
            Math.floor(imagesBox.clientHeight / 6) + imagesBox.clientHeight
          }px`);
        } else {
          return (backgroundImg.style.height = `${imagesBox.clientHeight}px`);
        }
      }
    }
  });

  if (loading) return <div>로딩중...</div>;
  if (!data) return null;
  if (error) return <div>상세페이지 에러</div>;

  const { user, portfolioLinks, content, mediaInfo } = profileDetail.data;
  const { instagramId, kakaoId, phoneNumber } = user;

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
                <div className="portfolio-info">
                  <strong className="title">{title}</strong>
                  <a href={link} target="_blank">
                    {link}
                  </a>
                </div>
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
            <span>{phoneNumber}</span>
          </li>
          <li className="kakao">
            <i className="contact-img"></i>
            <span>{kakaoId}</span>
          </li>
          <li className="instagram">
            <i className="contact-img"></i>
            <span>{instagramId}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AuthorDetail;
