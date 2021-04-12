import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppState } from '../../../../../context/appContext';

const MemberRole = styled.div`
  background-color:  ${({ color }) => color};
  color: #ffffff;
  cursor: pointer;
  border-radius: 4px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  margin-right: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ fontSize }) => fontSize}px;
`;

const MemberRoleSquare = ({ role, text }) => {
  const { curSize } = useAppState();
  const { translationKR, setJobColor } = useAppDispatch();
  const occupations = ['MEDIA_ART', 'DESIGNER', 'DEVELOPER', 'PLANNER'];

  const tablet = 768;
  const phone = 425;
  const size = curSize < tablet ? 'tablet' : curSize < phone ? 'phone' : 'web';
  const setWidht = (size) => {
    switch(size) {
      case 'web' :
        return 90;
      default:
        return 62;
    }
  }
  const setHeight = (size) => {
    switch(size) {
      case 'web' :
        return 42;
      case 'tablet' :
        return 29;
      case 'phone' :
        return 24;
    }
  }

  const setFontSize = (size) => {
    switch(size) {
      case 'web' :
        return 16;
      case 'tablet' :
        return 10;
      case 'phone' :
        return 10;
    }
  }

  return (
    <MemberRole
      color={setJobColor(role)}
      width={setWidht(size)}
      height={setHeight(size)}
      fontSize={setFontSize(size)}
    >
      {translationKR(role)}
    </MemberRole>
      
  )
}

export default MemberRoleSquare;