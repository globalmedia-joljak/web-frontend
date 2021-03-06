import React from 'react';
import { useMypageDispatch } from '../../../context/mypageContext';

import '../../mainStyle.scss';

const SucceedPopUp = () => {
  const { setSucced } = useMypageDispatch();
  const handleClick = () => setSucced(false);

  return (
    <div className="success">
      <div>
        <div className="success-wrap">
          <strong style={{ fontSize: '24px' }}>
            <span style={{ color: '#BAA2FF' }}>비밀번호 변경</span>이
            완료되었습니다.
          </strong>
          <button onClick={handleClick}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default SucceedPopUp;
