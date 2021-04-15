import React from 'react';
import styled, { css } from 'styled-components';
import { useAppState } from '../../../context/appContext';
import filterIcon from '../../../assets/images/filter@2x.png';
import editIcon from '../../../assets/images/create-24px@2x.png';
import saveIcon from '../../../assets/images/save@2x.png';

const webBtnWidth = 145;
const tabletBtnWidth = 108;
const phoneBtnWidth = 83;

const webBtnHeigth = 48;
const tabletBtnHeight = 36;
const phoneBtnHeight = 28;

const webBtnIcon = 24;
const tabletBtnIcon = 18;
const phoneBtnIcon = 14;

const tablet = 768;
const phone = 425;

const Icon = styled.i`
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${({ btntype }) =>
    btntype === 'filter'
      ? filterIcon
      : btntype === 'edit' || btntype === 'create'
      ? editIcon
      : saveIcon});

  ${({ size }) => {
    if (size === 'web') {
      return css`
        width: ${webBtnIcon}px;
        height: ${webBtnIcon}px;
      `;
    } else if (size === 'tablet') {
      return css`
        width: ${tabletBtnIcon}px;
        height: ${tabletBtnIcon}px;
      `;
    } else {
      return css`
        width: ${phoneBtnIcon}px;
        height: ${phoneBtnIcon}px;
      `;
    }
  }};
`;

const Button = styled.button`
  display: grid;
  border-radius: 4px;
  color: #ffffff;
  align-items: center;
  justify-items: end;
  grid-template-columns: auto 1fr;
  background-color: ${({ btntype }) =>
    btntype === 'edit' || btntype === 'create' ? '#074fd8' : '#baa2ff'};
  justify-self: ${({ btntype }) => btntype === 'save' && 'center'};

  ${({ size, btntype }) => {
    if (size === 'web') {
      return css`
        width: ${btntype === 'save' ? '234px' : `${webBtnWidth}px`};
        height: ${btntype === 'save' ? '56px' : `${webBtnHeigth}px`};
        padding: 0 ${btntype === 'save' ? '36px' : '16px'};
        font-size: 20px;
      `;
    } else if (size === 'tablet') {
      return css`
        width: ${btntype === 'save' ? '172px' : `${tabletBtnWidth}px`};
        height: ${btntype === 'save' ? '41px' : `${tabletBtnHeight}px`};
        padding: 0 ${btntype === 'save' ? '30px' : '12px'};
        font-size: 14px;
      `;
    } else {
      return css`
        width: ${btntype === 'save' ? '128px' : `${phoneBtnWidth}px`};
        height: ${btntype === 'save' ? '30px' : `${phoneBtnHeight}px`};
        padding: 0 ${btntype === 'save' ? '19px' : '12px'};
        font-size: 11px;
      `;
    }
  }};
`;

// 버튼 타입, 버튼내용글, 버튼함수
const AuthorButton = ({ btntype, btnTxt, handleButton }) => {
  const { curSize } = useAppState();
  const size = curSize > tablet ? 'web' : curSize > phone ? 'tablet' : 'phone';

  return (
    <Button size={size} onClick={handleButton} btntype={btntype}>
      <Icon size={size} btntype={btntype} />
      {btnTxt}
    </Button>
  );
};

export default AuthorButton;
