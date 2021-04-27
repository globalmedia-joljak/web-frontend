import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Idea.scss';
import MemberRoleSquare from '../../team/teamList/MemberRole';
import { useAppState } from '../../../../../context/appContext';

function Idea({
  id,
  title,
  category,
  requiredPositions,
  author,
  status,
  createDate,
  toggleIdea,
}) {
  const { curSize } = useAppState();
  const size = curSize < 768 ? 'tablet' : curSize < 425 ? 'phone' : 'web';

  const translateCategory = (value) => {
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

  return (
    <Link
      to={{
        pathname: `ideaboards/${id}`,
        state: {
          id,
        },
      }}
      className={toggleIdea && status === 'COMPLETE' ? 'hidden' : null}
    >
      <div className="idea">
        <div className="idea__status">
          {status === 'COMPLETE' ? (
            <div className="idea__status__complete"></div>
          ) : (
            <div className="idea__status__ongoing"></div>
          )}
        </div>

        <div className="idea__id">{id + 1}</div>

        <div className="idea__title">{title}</div>
        {size !== 'web' ? (
          <div className="idea__body__bottom">
            <div className="idea__category">{translateCategory(category)}</div>
            <div className="idea__author">{author}</div>
            <div className="idea__date">{createDate.split('T')[0]}</div>
          </div>
        ) : (
          <>
            <div className="idea__category">{translateCategory(category)}</div>
            <div className="idea__author">{author}</div>
            <div className="idea__date">{createDate.split('T')[0]}</div>
          </>
        )}

        <div className="idea__required">
          {requiredPositions.map((requiredPosition) =>
            requiredPosition === 'DEVELOPER' ? (
              <MemberRoleSquare key={1} role="DEVELOPER" text="DEVELOPER" />
            ) : requiredPosition === 'DESIGNER' ? (
              <MemberRoleSquare key={2} role="DESIGNER" text="DESIGNER" />
            ) : requiredPosition === 'MEDIA_ART' ? (
              <MemberRoleSquare key={3} role="MEDIA_ART" text="MEDIA_ART" />
            ) : requiredPosition === 'PLANNER' ? (
              <MemberRoleSquare key={4} role="PLANNER" text="PLANNER" />
            ) : (
              <></>
            ),
          )}
        </div>
      </div>
    </Link>
  );
}

export default Idea;
