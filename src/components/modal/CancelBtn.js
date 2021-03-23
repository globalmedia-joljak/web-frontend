import React from 'react';
import styled from 'styled-components';
import cancelImg from '../../assets/images/exit@2x.png';
import { useAppDispatch } from '../../context/appContext';

const CancelButton = styled.button`
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${cancelImg});
`;

const CancelBtn = () => {
  const { setModalShow } = useAppDispatch();
  const handleCancel = (e) => setModalShow(false);
  return <CancelButton type="button" onClick={handleCancel}></CancelButton>;
};

export default CancelBtn;
