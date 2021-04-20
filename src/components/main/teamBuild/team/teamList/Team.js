import React from "react";
import { Link } from "react-router-dom";
import "./Team.scss";
import MemberRoleSquare from "./MemberRole";
import { useAppState } from "../../../../../context/appContext";


function Team({id, teamName, category, designerMember, developerMember, mediaArtMember, plannerMember, author, createdDate}) {
  const { curSize } = useAppState();
  const size = curSize < 768 ? 'tablet' : curSize < 425 ? 'phone' : 'web';
  const translateCategory = (value) => {
    switch (value) {
      case 'MEDIA_ART' :
        return '미디어아트';
      case 'WEB_APP' :
        return '웹/앱';
      case 'ANIMATION' :
        return '영상/애니메이션';
      case 'GAME' :
        return '게임';
      default :
        return '기타';
    }
  }
  return (
    <Link to={{
      pathname: `teams/${id}`,
      state: {
        id
      }
    }}>
      <div className="team">
        <div className="team__id">
          {id}
        </div>
        <div className="team__teamname">
          {teamName}
        </div>
        {
          size !== 'web' ? (
            <div className="team__body__bottom">
              <div className="team__category">
                {translateCategory(category)}
              </div>
              <div className="team__author">
                {author}
              </div>
              <div className="team__date">
                {createdDate.split('T')[0]}
              </div>
            </div>
          ) : (
            <>
            <div className="team__category">
              {category}
            </div>
            <div className="team__author">
              {author}
            </div>
            <div className="team__date">
              {createdDate.split('T')[0]}
            </div>
            </>
          )
        }
        <div className="team__members">
          {
            designerMember === null || designerMember ==='' ? (
              <></>
            ) : (
              <MemberRoleSquare
                role="DESIGNER"
                text="DESIGNER"
              />
            )            
          }
          {
            developerMember === null || developerMember ==='' ? (
              <></>
            ) : (
              <MemberRoleSquare
                role="DEVELOPER"
                text="DEVELOPER"
              />
            )   
          }
          {
            mediaArtMember === null || mediaArtMember ==='' ? (
              <></>
            ) : (
              <MemberRoleSquare
                role="MEDIA_ART"
                text="MEDIA_ART"
              />
            )   
          }
          {
            plannerMember === null || plannerMember ==='' ? (
              <></>
            ) : (
              designerMember && developerMember && mediaArtMember ? (
                <></>
              ) : (
                <MemberRoleSquare
                  role="PLANNER"
                  text="PLANNER"
                />
              )
            )   
          }
        </div>
      </div>
    </Link>
    
  )
}

export default Team;