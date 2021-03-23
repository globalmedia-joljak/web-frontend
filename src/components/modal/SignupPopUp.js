import React, { useEffect, useState } from 'react';
import './popUpStyle.scss';
import OccupationListForm from './OccupationListForm.js';
import { useAppDispatch, useAppState } from '../../context/appContext';
import ModalTemp from './ModalTemp.js';
import CancelBtn from './CancelBtn.js';
import Button from './Button';

const SignUpPopUp = () => {
  const { modalShow } = useAppState();
  const { setModalShow } = useAppDispatch();

  const [role, setRolse] = useState({
    mainProjectRole: '',
    subProjectRole: '',
  });

  const [disabled, setDisabled] = useState(false);
  const { mainProjectRole, subProjectRole } = role;

  useEffect(() => {
    if (mainProjectRole === '' && subProjectRole === '') return;
    if (mainProjectRole === subProjectRole) setDisabled(true);
  });

  const handleChoice = (e) => {
    const { value, name, form } = e.target;

    setRolse({
      ...role,
      [name]: value,
    });

    const checkLists = Array.from(form).map((inputEl) => {
      if (inputEl.nodeName !== 'INPUT') return;
      inputEl.disabled = false;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 직군 선택 한후 데이터 PETCH해줘야 한다.
    setModalShow(false);
    console.log('전송됐다');
  };

  return (
    <ModalTemp handleSubmit={handleSubmit}>
      <li className={`list r2`}>
        <h2>직군설정</h2>
        <p>
          자신의 직군을 설정하세요.
          <span>(대표 1개, 부가직군1개까지 설정 가능)</span>
        </p>
      </li>
      <li className="list r2">
        <h3>대표직군</h3>
        <OccupationListForm
          type="mainProjectRole"
          handleChoice={handleChoice}
        />
      </li>
      <li className="list r2">
        <h3>부가직군</h3>
        <OccupationListForm type="subProjectRole" handleChoice={handleChoice} />
      </li>
      <li className="list alert">
        <p>회원가입 후 작가등록 페이지에서 변경할 수 있습니다.</p>
      </li>
      <li className="list choice-btn">
        <Button text="선택완료" />
      </li>
      <li id="cancel-btn">
        <CancelBtn />
      </li>
    </ModalTemp>
  );
};

export default SignUpPopUp;
