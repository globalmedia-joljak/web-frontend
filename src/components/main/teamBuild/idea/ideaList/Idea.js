import React from 'react';
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
}) {
  const { curSize } = useAppState();
  const size = curSize < 768 ? 'tablet' : curSize < 425 ? 'phone' : 'web';

  const translateCategory = (value) => {
    switch (value) {
      case 'MEDIA_ART':
        return '미디어아트';
      case 'WEB_APP':
        return '웹/앱';
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
    >
      <div className="idea">
        <div className="idea__id">{id}</div>
        <div className="idea__title">{title}</div>
        {size !== 'web' ? (
          <div className="idea__body__bottom">
            <div className="idea__category">{translateCategory(category)}</div>
            <div className="idea__author">{author}</div>
            {/* <div className="idea__date">{createDate.split('T')[0]}</div> */}
          </div>
        ) : (
          <>
            <div className="idea__category">{category}</div>
            <div className="idea__author">{author}</div>
            {/* <div className="idea__date">{createDate.split('T')[0]}</div> */}
          </>
        )}
        <div className="idea__required">{requiredPositions}</div>
      </div>
    </Link>
  );
}

export default Idea;
