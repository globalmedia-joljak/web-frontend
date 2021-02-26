import React, { useState, PureComponent } from "react";
import styled from "styled-components";
import style from "./SignOut1.scss";

const SignOut1 = () => {
	const [modalVisible, setModalVisible] = useState(false);

	const openModal = () => {
		setModalVisible(true);
	};
	const closeModal = () => {
		setModalVisible(false);
	};

	return (
		<>
			<div className="signout-container">
				<div className="el-main">
					<form action="/signout" method="post" id="signout">
						<div className="sub-info">
							<div className="info-title">계정정보</div>

							<div className="info-body">
								<div className="input-id group-start">
									<input
										type="text"
										placeholder="학번을 입력해주세요"
										className="signOut-input"
									/>
									<div className="check-info"></div>
								</div>

								<div className="input-password">
									<div className="form1-input-password">
										<input
											type="text"
											placeholder="비밀번호를 입력하세요"
											className="signOut-input"
										/>
										<div className="check-info"></div>
									</div>

									<div className="form2-input-password">
										<input
											type="text"
											placeholder="비밀번호를 다시 확인하세요"
											className="signOut-input"
										/>
										<div className="check-info"></div>
									</div>
								</div>
							</div>
						</div>

						<div className="sub-info">
							<div className="info-title">개인정보</div>

							<div className="info-body">
								<div className="input-name group-start">
									<input
										type="text"
										placeholder="이름을 입력해주세요"
										className="signOut-input"
									/>

									<select className="select-job">
										<option disabled="disabled" value>
											직군
										</option>
										<option value="designer">디자이너</option>
										<option value="dev">개발자</option>
										<option value="planner">기획자</option>
									</select>
								</div>
								<div className="check-info"></div>
								{/* <div onClick={openModal} className="Modal-job-selection">
									직군
								</div>
								{modalVisible && (
									<ModalInner
										visible={modalVisible}
										closable={true}
										maskClosable={true}
										onClose={closeModal}
									>
										Hello
									</ModalInner>
								)} */}
								<div className="input-phone">
									<input
										type="text"
										placeholder="핸드폰 번호를 입력하세요"
										className="signOut-input"
									/>
								</div>
								<div className="check-info"></div>
							</div>
						</div>

						<div className="sub-info">
							<div className="info-title">인증번호</div>

							<div className="info-body">
								<div className="input-auth-num group-start">
									<input
										type="text"
										placeholder="인증번호를 입력하세요"
										className="signOut-input"
									/>
								</div>
								<div className="check-info"></div>
							</div>
						</div>
					</form>

					<button
						type="submit"
						form="signout"
						value="Submit"
						className="signOut-button"
					>
						가입하기
					</button>
				</div>
			</div>
		</>
	);
};

const ModalInner = styled.div`
	box-sizing: border-box;
	position: relative;
	box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
	background-color: #fff;
	border-radius: 10px;
	width: 360px;
	max-width: 480px;
	top: 50%;
	transform: translateY(-50%);
	margin: 0 auto;
	padding: 40px 20px;
`;

export default SignOut1;
