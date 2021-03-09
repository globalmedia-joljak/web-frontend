import React, { useReducer, useState } from "react";
import "./popUpStyle.scss";

const PopUpEvents = (name) => {
  const reducer = (state, { value, name }) => {
    return {
      ...state,
      [name]: value,
    };
  };
  const [choiceValue, FETCH_OCCUPATION] = useReducer(reducer, {
    Representative: "",
    Additional: "",
  });

  const HandleChange = (e) => FETCH_OCCUPATION(e.target);
  console.log(choiceValue);
  return { HandleChange };
};

const lists = (occupations, name) => {
  const className = name === "Representative" ? "repre" : "add";
  const { HandleChange } = PopUpEvents(name);

  return occupations.map((data, i, arr) => (
    <li key={i}>
      <input
        id={className + i}
        type="radio"
        name={name}
        value={data}
        onChange={(e) => HandleChange(e)}
      />
      <label htmlFor={className + i}>{data}</label>
    </li>
  ));
};

const SignUpPopUp = () => {
  const [modalView, setModalView] = useState(true);
  const occupations = ["미디어아트", "디자이너", "개발자", "기획자"];
  const handleSubmit = (e) => {};
  const handleCancel = (e) => {
    console.dir(e.target);
    setModalView(true);
  };
  const modalStyle = modalView ? "none" : "grid";
  return (
    <div className="modal-wrapper" style={{ display: modalStyle }}>
      <div className="modal-inr">
        <ul className="modal-lists">
          <li className={`list r2 `}>
            <h2>직군설정</h2>
            <p>
              자신의 직군을 설정하세요.
              <span>(대표 1개, 부가직군3개까지 설정 가능)</span>
            </p>
          </li>
          <li className="list r2">
            <h3>대표직군</h3>
            <ul>{lists(occupations, "Representative")}</ul>
          </li>
          <li className="list r2">
            <h3>부가직군</h3>
            <ul>{lists(occupations, "Additional")}</ul>
          </li>
          <li className="list alert">
            <p>회원가입 후 마이페이지에서 변경할 수 있습니다.</p>
          </li>
          <li className="list choice-btn">
            <button
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              선택완료
            </button>
          </li>
          <li id="cancel-btn">
            <button type="button" onClick={handleCancel}></button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SignUpPopUp;
