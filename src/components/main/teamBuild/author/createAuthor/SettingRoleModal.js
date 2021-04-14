import React from 'react';
import ModalTemp from '../../../../modal/ModalTemp';
import OccupationListForm from '../../../../modal/OccupationListForm';

const SettingRoleModal = ({
  handleRoleChoice,
  handleRoleSubmit,
  modalShow,
  setModalShow,
}) => {
  return (
    <ModalTemp
      modalShow={modalShow}
      handleOk={setModalShow}
      handleCancel={setModalShow}
    >
      <li className="list r2">
        <h2>직군설정</h2>
        <p>
          자신의 직군을 설정하세요.
          <span>(대표 1개, 부가직군1개까지 설정 가능)</span>
        </p>
      </li>
      <li className="list r2">
        <h3>대표직군</h3>
        <OccupationListForm
          // projectRole={mainProjectRole}
          type="mainProjectRole"
          handleChoice={handleRoleChoice}
        />
      </li>
      <li className="list r2">
        <h3>부가직군</h3>
        <OccupationListForm
          // projectRole={subProjectRole}
          type="subProjectRole"
          handleChoice={handleRoleChoice}
          txt="선택안함"
        />
      </li>
    </ModalTemp>
  );
};

export default SettingRoleModal;
