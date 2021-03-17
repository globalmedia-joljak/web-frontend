import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import './popUpStyle.scss';
import OccupationListForm from './OccupationListForm.js';

const SignUpPopUp = ({ show, setShow }) => {
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
    setShow(false);
    console.log('전송됐다');
  };
  const handleCancel = (e) => setShow(false);
  const modalStyle = !show ? 'none' : 'grid';

  return (
    <div className="modal-wrapper" style={{ display: modalStyle }}>
      <form className="modal-inr" onSubmit={handleSubmit}>
        <ul className="modal-lists">
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
            <OccupationListForm
              type="subProjectRole"
              handleChoice={handleChoice}
            />
          </li>
          <li className="list alert">
            <p>회원가입 후 작가등록 페이지에서 변경할 수 있습니다.</p>
          </li>
          <li className="list choice-btn">
            <button type="submit">선택완료</button>
          </li>
          <li id="cancel-btn">
            <button type="button" onClick={handleCancel}></button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default SignUpPopUp;
