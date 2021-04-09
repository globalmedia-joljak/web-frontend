import React from 'react';
import styled, { css } from 'styled-components';
import { useAppState } from '../../context/appContext';
import Button from './Button.js';
import CancelBtn from './CancelBtn.js';
import './modalStyle.scss';

const ModalTempBlock = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 1200;
  left: 0;
  top: 0;
`;

const ModalForm = styled.form`
  background-color: #00000066;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: ${({ size }) => (size === 'web' ? 'center' : 'end center')};
`;

const ModalUl = styled.ul`
  position: relative;
  background-color: #ffffff;
  box-shadow: 0px 0px 6px #00000029;
  display: grid;
  grid-auto-rows: max-content;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  ${({ size }) => {
    if (size === 'web') {
      return css`
        padding: 24px 40px 42px;
        gap: 54px;
        max-width: 786px;
        max-height: 683px;
        width: 90%;
        height: 90%;
        border-radius: 12px;
      `;
    } else if (size === 'tablet') {
      return css`
        padding: 24px 8% 32px;
        gap: 32px;
        max-width: none;
        width: 100%;
        min-height: 635px;
      `;
    } else {
      return css`
        padding: 24px 20px;
        gap: 32px;
        width: 100%;
        max-width: none;
        min-height: 533px;
      `;
    }
  }}
`;

const tablet = 768;
const phone = 425;

const ModalTemp = ({
  children,
  form,
  modalShow,
  // handleSubmit,
  handleOk,
  handleCancel,
  btnTxt,
}) => {
  const { curSize } = useAppState();

  const size = curSize > tablet ? 'web' : curSize > phone ? 'tablet' : 'phone';

  const modalStyle = !modalShow ? 'none' : 'grid';
  return (
    <ModalTempBlock style={{ display: modalStyle }}>
      <ModalForm size={size}>
        <ModalUl className={`modal-lists ${form}`} size={size}>
          {children}
          {size === 'web' && (
            <li id="cancel-btn">
              <CancelBtn handleCancel={handleCancel} />
            </li>
          )}
          <li id="choice-btn">
            <Button text={btnTxt} handleOk={handleOk} />
          </li>
        </ModalUl>
      </ModalForm>
    </ModalTempBlock>
  );
};

export default ModalTemp;
