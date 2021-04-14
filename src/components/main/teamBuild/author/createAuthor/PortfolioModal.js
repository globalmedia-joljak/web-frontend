import React from 'react';
import ModalTemp from '../../../../modal/ModalTemp';

const PortfolioModal = ({
  pfSubmit,
  pfChange,
  showModal,
  pfSetModalShow,
  data,
  pfLinks,
  setPfLinks,
}) => {
  const { title, id, link } = data;
  return (
    <ModalTemp
      modalShow={showModal}
      handleOk={pfSubmit}
      handleCancel={pfSetModalShow}
      form={'portfolio'}
      btnTxt="등록완료"
    >
      <li className="list r2">
        <h3>포트폴리오 설정</h3>
        <p>본인의 포트폴리오를 등록하세요</p>
      </li>
      <li className="list r2">
        <h2>제목</h2>
        <input
          name="title"
          placeholder="제목을 입력하세요"
          onChange={pfChange}
          value={title}
        />
      </li>
      <li className="list r2">
        <h2>링크</h2>
        <input
          name="link"
          placeholder="하이퍼링크를 입력하세요"
          onChange={pfChange}
          value={link}
        />
      </li>
    </ModalTemp>
  );
};

export default PortfolioModal;
