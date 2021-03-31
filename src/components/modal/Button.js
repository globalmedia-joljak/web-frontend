import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppState } from '../../context/appContext';

const ButtonBolck = styled.button`
  width: ${({ size }) => (size === 'phone' ? '208px' : '234px')};
  height: ${({ size }) => (size === 'phone' ? '42px' : '56px')};
  background-color: #baa2ff;
  color: #ffffff;
  font-size: ${({ size }) => (size === 'phone' ? '16px' : '20px')};
  border-radius: 4px;
`;
const Button = ({ text, handleOk }) => {
  const { curSize } = useAppState();
  const tablet = '768px';
  const phone = '425px';
  const size = curSize < tablet ? 'tablet' : curSize < phone ? 'phone' : 'web';
  return <ButtonBolck type='button' size={size} onClick={handleOk}>{text}</ButtonBolck>;
};

export default Button;
