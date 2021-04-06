import React, { useCallback } from 'react';
import styled from 'styled-components';
import cancelImg from '../../assets/images/exit@2x.png';

const CancelButton = styled.button`
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${cancelImg});
`;

const CancelBtn = ({ handleCancel }) => {
  const handleCancelBtn = useCallback(() => handleCancel(false));
  return (
    <CancelButton
      type="button"
      onClick={() => handleCancelBtn()}
    ></CancelButton>
  );
};

export default CancelBtn;
