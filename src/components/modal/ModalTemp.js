import React from 'react';
import styled, { css } from 'styled-components';
import { useAppState } from '../../context/appContext';

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
  background-color: ${({ size }) => (size === 'web' ? '#00000066' : '#f2f2f2')};
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const ModalUl = styled.ul`
  position: relative;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 0px 6px #00000029;
  display: grid;
  grid-template-rows: repeat(3, max-content) 1fr max-content;
  gap: ${({ size }) => (size === 'web' ? '39px' : '56px')};
  width: 90%;
  height: 90%;
  max-width: ${({ size }) =>
    size === 'web' ? '786px' : size === 'tablet' ? '608px' : '320px'};
  max-height: ${({ size }) =>
    size === 'web' ? '683px' : size === 'tablet' ? '790px' : '650px'};
`;

const ModalTemp = ({ children, handleSubmit }) => {
  const { modalShow } = useAppState();
  const { curSize } = useAppState();
  const tablet = '768px';
  const phone = '425px';

  const size = curSize < tablet ? 'tablet' : curSize < phone ? 'phone' : 'web';
  const modalStyle = !modalShow ? 'none' : 'grid';
  return (
    <ModalTempBlock style={{ display: modalStyle }}>
      <ModalForm onSubmit={handleSubmit}>
        <ModalUl className="modal-lists signup" size={size}>
          {children}
        </ModalUl>
      </ModalForm>
    </ModalTempBlock>
  );
};

export default ModalTemp;
