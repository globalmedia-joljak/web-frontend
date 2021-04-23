import React from 'react';
import ModalTemp from '../../../modal/ModalTemp';
import OccupationListForm from '../../../modal/OccupationListForm';

const WorkListModal = ({
  modalShow,
  handleSubmit,
  handleCancel,
  handleChoice,
}) => {
  return (
    <ModalTemp
      form="work-list"
      modalShow={modalShow}
      handleOk={handleSubmit}
      handleCancel={handleCancel}
      btnTxt="검색하기"
    >
      <li className="list r2">
        <h2>상세검색</h2>
        <p>검색할 작품의 카테고리와 작품연도를 선택하세요</p>
      </li>
      <li className="list r2">
        <h3>카테고리</h3>
        <OccupationListForm
          worktype="worksList"
          handleChoice={handleChoice}
          txt="전체선택"
        />
      </li>
      <li className="list r2">
        <h3>작품연도</h3>
        <OccupationListForm
          worktype="exhibitedYear"
          handleChoice={handleChoice}
        />
      </li>
    </ModalTemp>
  );
};

export default WorkListModal;
