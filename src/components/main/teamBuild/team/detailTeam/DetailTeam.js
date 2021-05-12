import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import { getTeam, deleteTeam } from '../../../../../service/api/teams';
import { useAppState } from '../../../../../context/appContext';
import { Viewer } from '@toast-ui/react-editor';
import './DetailTeam.scss';
import MemberRoleSquare from '../teamList/MemberRole';

const translateTeamCategory = (category) => {
  switch (category) {
    case 'WEB_APP' :
      return '웹/앱';
    case 'MEDIA_ART' :
      return '미디어아트';
    case 'ANIMATION' :
      return '영상/애니메이션';
    case 'GAME' :
      return '게임';
    default :
      return '기타';
  }
}

const DetailTeanm = ({match, history}) => {
  const id = match.params.id;
  const { userInfo } = useAppState();
  const [team, setTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    getTeam(id, history)
      .then((response) => {
        setTeam(response);
        setIsLoading(false);
      })
      .catch((e) => {
        history.push(`/error`);
        console.log(e);
      });
  }, []);

  const hadleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteTeam(id).then((response) => {
        history.push('/team-building/teams');
      })
    }
  }
  const hadleUpdate =  () => {
    history.push(`${match.url}/update`);
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
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
        <div className="team__detail__wrap">
          <div className="team__detail__top">
            <div className="team__detail__category">
              <h3>{translateTeamCategory(team.projectCategory)}</h3>
            </div>
            <div className="team__detail__teamname">
              <h2>{team.teamName}</h2>
            </div>
            <div className="team__detail__info">
              <div className="team__detail__info__left">
                <h4>{team.author}</h4>
                <div className="date__image"></div>
                <p>{team.createdDate.split('T')[0].replace(/-/gi, ".")}</p>
              </div>
              <div className="team__detail__info__right">
                {userInfo.name === team.author ? (
                  <>
                    <div className="update__button" onClick={hadleUpdate}>
                      <div className="update__image"></div>
                      <p>수정</p>
                    </div>
                    <div className="delete__button" onClick={hadleDelete}>
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
          <div className="team__detail__body">
            <Viewer 
              initialValue={team.content}
              isWysiwygMode={true}
            >
            </Viewer>
          </div>
          <div className="team__detail__bottom">
            <div className="team__members">
              <h3>팀 구성원</h3>
              {
                team.designerMember === null || team.designerMember === '' ? (
                  <></>
                ) : (
                  <div className="team__member">
                    <MemberRoleSquare
                      role="DESIGNER"
                      text="DESIGNER"
                    />
                    <h4>{team.designerMember}</h4>
                  </div>
                  
                )
              }
              {
                team.developerMember === null || team.developerMember === '' ? (
                  <></>
                ) : (
                  <div className="team__member">
                    <MemberRoleSquare
                      role="DEVELOPER"
                      text="DEVELOPER"
                    />
                    <h4>{team.developerMember}</h4>
                  </div>
                )
              }
              {
                team.mediaArtMember === null || team.mediaArtMember === '' ? (
                  <></>
                ) : (
                  <div className="team__member">
                    <MemberRoleSquare
                      role="MEDIA_ART"
                      text="MEDIA_ART"
                    />
                    <h4>{team.mediaArtMember}</h4>
                  </div>
                )
              }
              {
                team.plannerMember === null || team.plannerMember === '' ? (
                  <></>
                ) : (
                  <div className="team__member">
                    <MemberRoleSquare
                      role="PLANNER"
                      text="PLANNER"
                    />
                    <h4>{team.plannerMember}</h4>
                  </div>
                )
              }
              {
                team.fileInfo ? (
                  <a target='_blank' href={team.fileInfo.url}>
                    <div className="team__file">
                      <div className="team__file__left">
                        <div className="file__image"></div>
                        <p>{team.fileInfo.originalName}</p>
                      </div>
                      <div className="team__file__right">
                        <div className="download__image"></div>
                      </div>
                    </div>
                  </a>
                ) : (
                  <></>
                )
              }
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  )
}

export default DetailTeanm;