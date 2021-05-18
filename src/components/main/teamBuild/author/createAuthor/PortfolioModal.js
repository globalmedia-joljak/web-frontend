import React from 'react';
import ModalTemp from '../../../../modal/ModalTemp';

const PortfolioModal = ({
  pfSubmit,
  pfChange,
  pfModalShow,
  pfSetModalShow,
  data,
  checkURL,
}) => {
  const { title, link } = data;

  return (
    <ModalTemp
      modalShow={pfModalShow}
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
          onInput={pfChange}
          value={title}
        />
      </li>
      <li className="list r2">
        <h2>링크</h2>
        <input
          name="link"
          placeholder="하이퍼링크를 입력하세요"
          onInput={pfChange}
          value={link}
        />
        {!checkURL && (
          <p className="check-url">
            http, https 와 같이 url 형식에 맞게 작성 해주세요
          </p>
        )}
      </li>
    </ModalTemp>
  );
};

export default PortfolioModal;
