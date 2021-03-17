import React from "react";

import "../../mainStyle.scss";
const handleClick = (e) => {
  let {
    offsetParent: { style },
  } = e.target;
  return (style.display = "none");
};
const SucceedPopUp = () => {
  return (
    <div className="success">
      <div>
        <div className="success-wrap">
          <strong style={{ fontSize: "24px" }}>
            <span style={{ color: "#BAA2FF" }}>비밀번호 변경</span>이
            완료되었습니다.
          </strong>
          <button
            onClick={(e) => {
              handleClick(e);
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SucceedPopUp;
