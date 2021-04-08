import React from 'react';
import ModalTemp from '../../../modal/ModalTemp';
import OccupationListForm from '../../../modal/OccupationListForm';

const SettingRole = ({
  handleRoleChoice,
  handleRoleSubmit,
  modalShow,
  setModalShow,
}) => {
  return (
    <ModalTemp
      modalShow={modalShow}
      handleOk={handleRoleSubmit}
      handleCancel={setModalShow}
      form={'signup'}
      btnTxt="선택완료"
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

const SettingPortfolio = ({
  handlePfSubmit,
  handlePfChoice,
  portfolioShow,
  setPortfolioShow,
}) => {
  return (
    <ModalTemp
      modalShow={portfolioShow}
      handleOk={handlePfSubmit}
      handleCancel={setPortfolioShow}
      form={'portfolio'}
      btnTxt="등록완료"
    >
      <li className="list r2">
        <h3>포트폴리오 설정</h3>
        <p>본인의 포트폴리오를 등록하세요</p>
      </li>
      <li className="list r2">
        <h2>제목</h2>
        <input placeholder="제목을 입력하세요" />
      </li>
      <li className="list r2">
        <h2>링크</h2>
        <input placeholder="하이퍼링크를 입력하세요" />
      </li>
    </ModalTemp>
  );
};

export { SettingRole, SettingPortfolio };
