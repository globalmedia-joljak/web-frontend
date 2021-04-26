import React from 'react';
import styled, { css } from 'styled-components';
import noBuild from '../../../assets/images/Nodata@2x.png';
import noWorks from '../../../assets/images/Nodata_Works@2x.png';
import { useAppState } from '../../../context/appContext';

const tablet = 768;
const phone = 425;

const NoBuildIconSize = css`
  ${({ size }) => {
    if (size === 'phone') {
      return css`
        width: 144px;
        height: 144px;
      `;
    } else {
      return css`
        width: 276px;
        height: 276px;
      `;
    }
  }}
`;

const NoWorkIconSize = css`
  ${({ size }) => {
    if (size === 'phone') {
      return css`
        width: 208px;
        height: 154px;
      `;
    } else {
      return css`
        width: 407px;
        height: 302px;
      `;
    }
  }}
`;

const NoPostImg = styled.i`
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${({ type }) =>
    type === 'team-building' ? noBuild : noWorks});
  margin-bottom: ${({ size }) => (size === 'phone' ? '23px' : '32px')};
  ${({ type }) => (type === 'team-building' ? NoBuildIconSize : NoWorkIconSize)}
`;

const noPostBuild = '아직 아무런 게시글도 등록되지 않았습니다.';
const noPostWorks = `등록된 졸업작품이 없습니다. 다른 연도의 졸업작품을 검색해주세요.`;

const ThereIsNoList = ({ type }) => {
  const { curSize } = useAppState();
  const size = curSize > tablet ? 'web' : curSize > phone ? 'tablet' : 'phone';
  return (
    <div className="list-none">
      <NoPostImg type={type} size={size} />
      <strong>{type === 'team-building' ? noPostBuild : noPostWorks}</strong>
    </div>
  );
};

export default ThereIsNoList;
