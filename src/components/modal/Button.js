import React from 'react';
import styled, { css } from 'styled-components';
import { useAppState } from '../../context/appContext';

const tablet = 768;
const phone = 425;

const ButtonBolck = styled.button`
  background-color: #baa2ff;
  color: #ffffff;
  border-radius: 4px;

  ${({ size }) => {
    if (size === 'web') {
      return css`
        width: 234px;
        height: 56px;
        font-size: 20px;
      `;
    } else if (size === 'tablet') {
      return css`
        width: 296px;
        height: 56px;
        font-size: 20px;
      `;
    } else {
      return css`
        width: 208px;
        height: 48px;
        font-size: 17px;
      `;
    }
  }}
`;
const Button = ({ text, handleOk }) => {
  const { curSize } = useAppState();

  const size = curSize > tablet ? 'web' : curSize > phone ? 'tablet' : 'phone';
  return (
    <ButtonBolck type="button" size={size} onClick={handleOk}>
      {text}
    </ButtonBolck>
  );
};

export default Button;
