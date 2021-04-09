import React from 'react';
import styled, { css } from 'styled-components';
import { useAppState } from '../../../../context/appContext';
import filterIcon from '../../../../assets/images/filter@2x.png';
import editIcon from '../../../../assets/images/create-24px@2x.png';

const webAuthorBtnWidth = 145;
const tabletAuthorBtnWidth = 108;
const phoneAuthorBtnWidth = 83;

const webAuthorBtnHeigth = 48;
const tabletAuthorBtnHeigth = 36;
const phoneAuthorBtnHeigth = 28;

const webAuthorIcon = 24;
const tabletAuthorIcon = 18;
const phoneAuthorIcon = 14;

const tablet = 768;
const phone = 425;

const Icon = styled.i`
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${({ btntype }) =>
    btntype === 'filter' ? filterIcon : editIcon});

  ${({ size }) => {
    if (size === 'web') {
      return css`
        width: ${webAuthorIcon}px;
        height: ${webAuthorIcon}px;
      `;
    } else if (size === 'tablet') {
      return css`
        width: ${tabletAuthorIcon}px;
        height: ${tabletAuthorIcon}px;
      `;
    } else {
      return css`
        width: ${phoneAuthorIcon}px;
        height: ${phoneAuthorIcon}px;
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
    btntype === 'filter' ? '#baa2ff' : '#074fd8'};

  ${({ size }) => {
    if (size === 'web') {
      return css`
        width: ${webAuthorBtnWidth}px;
        height: ${webAuthorBtnHeigth}px;
        font-size: 20px;
        padding: 0 16px;
      `;
    } else if (size === 'tablet') {
      return css`
        width: ${tabletAuthorBtnWidth}px;
        height: ${tabletAuthorBtnHeigth}px;
        font-size: 15px;
        padding: 0 12px;
      `;
    } else {
      return css`
        width: ${phoneAuthorBtnWidth}px;
        height: ${phoneAuthorBtnHeigth}px;
        font-size: 11px;
        padding: 0 11px;
      `;
    }
  }}
`;

// 버튼 타입, 버튼내용글, 버튼함수
const AuthorButton = ({ btnType, btnTxt, handleButton }) => {
  const { curSize } = useAppState();
  const size = curSize > tablet ? 'web' : curSize > phone ? 'tablet' : 'phone';

  return (
    <Button
      className={`author-btn ${btnType}`}
      size={size}
      onClick={handleButton}
      btntype={btnType}
    >
      <Icon size={size} btntype={btnType} />
      {btnTxt}
    </Button>
  );
};

export default AuthorButton;
