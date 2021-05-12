import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useAppState } from '../../../context/appContext';

const tablet = 768;
const phone = 425;

const webSize = 13;
const phoneSize = 10;

const LoadBlock = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
`;
const loading = keyframes`
  0 {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 14px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const LoadItem = styled.div`
  ${({ size }) => {
    if (size < phone) {
      return css`
        width: ${webSize}px;
        height: ${webSize}px;
      `;
    } else {
      return css`
        width: ${phoneSize}px;
        height: ${phoneSize}px;
      `;
    }
  }}

  border-radius: 50%;
  background-color: ${({ color }) => color};

  &:nth-child(1) {
    animation: ${loading} 0.7s 0.2s linear infinite;
  }
  &:nth-child(2) {
    animation: ${loading} 0.7s 0.3s linear infinite;
  }
  &:nth-child(3) {
    animation: ${loading} 0.7s 0.4s linear infinite;
  }
`;

const LoadingForm = () => {
  const { curSize } = useAppState();

  const size = curSize > tablet ? 'web' : curSize > phone ? 'tablet' : 'phone';
  return (
    <LoadBlock className="load-wrapp">
      <LoadItem className="line" color="#D4C5FF" size={size}></LoadItem>
      <LoadItem className="line" color="#CBB9FF" size={size}></LoadItem>
      <LoadItem className="line" color="#C3AEFF" size={size}></LoadItem>
    </LoadBlock>
  );
};

export default LoadingForm;
