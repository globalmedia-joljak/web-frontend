import React from 'react';
import styled, { css } from 'styled-components';
import { useAppState } from '../../../context/appContext';
import editButton from '../../../assets/images/edit@2x.png';
import deleteButton from '../../../assets/images/delete@2x.png';

const tablet = 768;
const phone = 425;

const PortfolioIcon = css`
  ${({ size }) => {
    if (size === 'web') {
      return css`
        width: 18px;
        height: 18px;
      `;
    } else if (size === 'tablet') {
      return css`
        width: 16px;
        height: 16px;
      `;
    } else {
      return css`
        width: 12px;
        height: 12px;
      `;
    }
  }}
`;

const PortfolioButton = css`
  font-size: ${({ size }) => (size === 'web' ? '16px' : '12px')};
`;

const AutorDetailIcon = css`
  ${({ size }) => {
    if (size === 'web') {
      return css`
        width: 24px;
        height: 24px;
      `;
    } else if (size === 'tablet') {
      return css`
        width: 18px;
        height: 18px;
      `;
    } else {
      return css`
        width: 12px;
        height: 12px;
      `;
    }
  }}
`;

const AuthorButton = css`
  font-size: ${({ size }) =>
    size === 'web' ? '24px' : size === 'tablet' ? '16px' : '12px'};
`;

const SettingButtonBlock = styled.div`
  display: flex;
  gap: ${({ size }) =>
    size === 'web' ? '24px' : size === 'tablet' ? '11px' : '10px'};
`;

const SetButton = styled.button`
  display: inherit;
  align-items: center;
  color: #6d6d6dcc;
  ${({ form }) => (form === 'portfolio' ? PortfolioButton : AuthorButton)};
`;

const SetIcon = styled.i`
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${({ btntype }) =>
    btntype === 'eidt' ? editButton : deleteButton});
  ${({ form }) => (form === 'portfolio' ? PortfolioIcon : AutorDetailIcon)};
`;

//authordetail : 데이터 추가됐을때 다시 해야한다 . 현재 등록된 작가목록이 없어서 확인 불가.
const EditDeleteButton = ({ handleEdit, handleDelete, form }) => {
  const { curSize } = useAppState();
  const size = curSize > tablet ? 'web' : curSize > phone ? 'tablet' : 'phone';

  return (
    <SettingButtonBlock size={size}>
      <SetButton size={size} onClick={handleEdit} form={form}>
        <SetIcon btntype="eidt" size={size} form={form} />
        수정
      </SetButton>
      <SetButton size={size} onClick={handleDelete} form={form}>
        <SetIcon btntype="delete" size={size} form={form} />
        삭제
      </SetButton>
    </SettingButtonBlock>
  );
};

export default EditDeleteButton;
