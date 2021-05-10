import React from 'react';
import styled, { css } from 'styled-components';
import { useAppState } from '../../../context/appContext';

import authorImg from '../../../assets/images/Members_image@2x.png';
import mypageImg from '../../../assets/images/Mypage_image@2x.png';
import worksImg from '../../../assets/images/Works_image@2x.png';

const tablet = 768;
const phone = 425;

const HeroImgBlock = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 1px 2px #00000029;
  height: ${({ size }) =>
    size === 'phone' ? '210px' : size === 'tablet' ? '320px' : '463px'};
  width: 100%;
`;

const HeroImage = styled.div`
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${({ type }) =>
    type === 'works' ? worksImg : type === 'mypage' ? mypageImg : authorImg});
  margin-left: 3%;

  ${({ size, type }) => {
    if (size === 'web') {
      if (type === 'works') {
        return css`
          width: 408px;
          height: 256px;
        `;
      }
      if (type === 'mypage') {
        return css`
          width: 453px;
          height: 325px;
        `;
      }
      if (type === 'author') {
        return css`
          width: 378px;
          height: 286px;
        `;
      }
    }

    if (size === 'tablet') {
      if (type === 'works') {
        return css`
          width: 218px;
          height: 137px;
        `;
      }
      if (type === 'mypage') {
        return css`
          width: 219px;
          height: 157px;
        `;
      }
      if (type === 'author') {
        return css`
          width: 222px;
          height: 152px;
        `;
      }
    }
    if (size === 'phone') {
      if (type === 'works') {
        return css`
          width: 147px;
          height: 106px;
        `;
      }
      if (type === 'mypage') {
        return css`
          width: 147px;
          height: 106px;
        `;
      }
      if (type === 'author') {
        return css`
          width: 152px;
          height: 95px;
        `;
      }
    }
  }}; ;;;;
`;

const HeroTitle = styled.h1`
  color: #000000;
  ${({ size }) => {
    if (size === 'web') {
      return css`
        font-size: 32px;
        margin-bottom: 33px;
      `;
    }
    if (size === 'tablet') {
      return css`
        font-size: 26px;
        margin-bottom: 12px;
      `;
    }

    if (size === 'phone') {
      return css`
        font-size: 18px;
        margin-bottom: 12px;
      `;
    }
  }}
`;

const ContentBox = styled.h2`
  font-weight: bold;
  color: #000000cc;
  font-size: ${({ size }) =>
    size === 'web' ? '24px' : size === 'tablet' ? '20px' : '13px'};
`;

const HeroImageForm = ({ type, heroTitle, heroContent, heroContent2 }) => {
  const { curSize } = useAppState();
  const size = curSize > tablet ? 'web' : curSize > phone ? 'tablet' : 'phone';

  return (
    <HeroImgBlock className="hero-img" size={size}>
      <div className="hero-contents">
        <HeroTitle size={size}>{heroTitle}</HeroTitle>
        <ContentBox size={size}>
          <span size={size}>{heroContent}</span>
          <span size={size}>{heroContent2}</span>
        </ContentBox>
      </div>
      <HeroImage className="hero-image" type={type} size={size} />
    </HeroImgBlock>
  );
};

export default HeroImageForm;
