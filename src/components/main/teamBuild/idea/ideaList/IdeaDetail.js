import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useAppState } from '../../../../../context/appContext';
import { Viewer } from '@toast-ui/react-editor';
import { getIdea } from '../../../../../service/api/ideas';
import './IdeaDetail.scss';
import MemberRoleSquare from '../../team/teamList/MemberRole';
import Ideas from '..';

const dummy = {
  category: 'WEB_APP',
  classOf: 'string',
  contact: '010132465',
  content: 'aslkdfjasldfjeijfelkj',
  createDate: '2021-04-27T11:46:42.061Z',
  id: 0,
  mainProjectRole: 'DEVELOPER',
  mediaInfo: {
    fileExtension: 'string',
    fullPath: 'string',
    mediaType: 'IMAGE',
    modifyName: 'string',
    originalName: 'adkfasdlkfjasdlkfjaldkfj',
    url: 'string',
  },
  modifiedDate: '2021-04-27T11:46:42.061Z',
  name: '정만덕',
  requiredPositions: ['DEVELOPER', 'DESIGNER'],
  status: 'ONGOING',
  title: '최강남대문 쌍절곤',
};

const IdeaDetail = ({ match, history }) => {
  const id = match.params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [idea, setIdea] = useState(null);
  const { userInfo } = useAppState();

  useEffect(() => {
    // getIdea(id, history)
    //   .then((response) => {
    //     setIdea(dummy);
    //     setIsLoading(false);
    //   })
    //   .catch((e) => {
    //     history.push(`/error`);
    //     console.log(e);
    //   });
    setIdea(dummy);
    setIsLoading(false);
  }, []);

  const translateIdeaCategory = (value) => {
    switch (value) {
      case 'MEDIA_ART':
        return '미디어아트';
      case 'WEB_APP':
        return '웹/앱 서비스';
      case 'ANIMATION/FILM':
        return '영상/애니메이션';
      case 'GAME':
        return '게임';
      default:
        return '기타';
    }
  };

  const handleDelete = () => {
    // todo: 삭제
  };
  const handleUpdate = () => {
    // todo: 수정
  };

  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
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
          <div className="idea__detail__wrap">
            <div className="idea__detail__top">
              {idea.status === 'COMPLETE' ? (
                <div className="idea__detail__status">
                  <div className="idea__detail__status__fill">
                    <h3>결성완료</h3>
                  </div>
                  <div className="idea__detail__status__empty">
                    <h3>미정</h3>
                  </div>
                </div>
              ) : (
                <div className="idea__detail__status">
                  <div className="idea__detail__status__empty">
                    <h3>결성완료</h3>
                  </div>
                  <div className="idea__detail__status__fill">
                    <h3>미정</h3>
                  </div>
                </div>
              )}

              <div className="idea__detail__category">
                <h3>{translateIdeaCategory(idea.category)}</h3>
              </div>
              <div className="idea__detail__title">
                <h2>{idea.title}</h2>
              </div>
              <div className="idea__detail__info">
                <div className="idea__detail__info__left">
                  <h4>{idea.name}</h4>
                  <div className="date__image"></div>
                  <p>{idea.createDate.split('T')[0].replace(/-/gi, '.')}</p>
                </div>
                <div className="idea__detail__info__right">
                  {userInfo.name === idea.name ? (
                    <>
                      <div className="update__button" onClick={handleUpdate}>
                        <div className="update__image"></div>
                        <p>수정</p>
                      </div>
                      <div className="delete__button" onClick={handleDelete}>
                        <div className="delete__image"></div>
                        <p>삭제</p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className="idea__detail__body">
              <Viewer initialValue={idea.content}></Viewer>
            </div>
            <div className="idea__detail__bottom">
              <div className="idea__required">
                <h3>필요한 포지션</h3>
                <div className="idea__required__group">
                  {idea.requiredPositions.map((required) =>
                    required === 'DEVELOPER' ? (
                      <MemberRoleSquare
                        key={0}
                        role="DEVELOPER"
                        text="DEVELOPER"
                      />
                    ) : required === 'DESIGNER' ? (
                      <MemberRoleSquare
                        key={1}
                        role="DESIGNER"
                        text="DESIGNER"
                      />
                    ) : required === 'PLANNER' ? (
                      <MemberRoleSquare key={2} role="PLANNER" text="PLANNER" />
                    ) : (
                      <></>
                    ),
                  )}
                </div>
              </div>
              <div className="idea__contact">
                <h3>개인 연락처</h3>
                <div className="idea__contact__detail">
                  <p>{idea.contact}</p>
                </div>
              </div>
              {idea.mediaInfo ? (
                <a target="_blank" href={idea.mediaInfo.url}>
                  <div className="idea__file">
                    <div className="idea__file__left">
                      <div className="file__image"></div>
                      <p>{idea.mediaInfo.originalName}</p>
                    </div>
                    <div className="idea__file__right">
                      <div className="download__image"></div>
                    </div>
                  </div>
                </a>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IdeaDetail;
