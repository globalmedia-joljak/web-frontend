import React, { useEffect } from 'react';
import { useAppDispatch, useAppState } from '../../../../context/appContext';
import {
  useTeamsDispatch,
  useTeamsState,
} from '../../../../context/teamContext';
import useAsync from '../../../../hooks/useAsync';
import { getUserProfileDetail } from '../../../../service/api/profile';

// 클릭한 작가의 classOf 를 넣어준다. ->detail정보를 가져오기위해서.
// 로그인을 했고, 본인의 classOf와 클릭한 classOf가 같으면 수정 삭제 버튼을 활성화 시켜준다.
const AuthorDetail = ({ match }) => {
  const { translationKR, setJobColor } = useAppDispatch();
  const {
    userInfo: { isLogin, classOf },
  } = useAppState();
  const { profileListData } = useTeamsState();
  const { filterClassOf } = useTeamsDispatch();

  const [profileDetail, refetch] = useAsync(() =>
    getUserProfileDetail(match.params.id),
  );

  const { loading, data, error } = profileDetail;
  console.log(profileDetail);

  if (loading) return <div>로딩중...</div>;
  if (!data) return null;
  if (error) return <div></div>;

  const author = profileListData.content.find((data) => {
    return data.user.classOf === match.params.id;
  });

  const authorEditBtn = () => {
    return classOf === match.params.id ? (
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
    ) : (
      false
    );
  };

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
            {isLogin && authorEditBtn()}
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
