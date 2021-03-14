import React, { useState, useEffect } from "react";
import styled from "styled-components";
import style from "./SignUp.scss";

const SignUp = (props) => {
	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		input: {},
	// 		errors: {},
	// 	};

	// 	this.handleChange = this.handleChange.bind(this);
	// }

	const [passwd, setPasswd] = useState("");
	const [confirmPasswd, setConfirmPasswd] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		passwd === confirmPasswd
			? setError("")
			: setError("비밀번호가 일치하지 않습니다.");
	});

	const handleChange = (event) => {
		const { value } = event.target;

		setPasswd(value);
		// name === "confirm_password" ?? setConfirmPasswd(value);

		// if (passwd !== "") {
		// 	passwd !== confirmPasswd
		// 		? setError("비밀번호가 일치하지 않습니다.")
		// 		: setError("");
		// }
		// if (
		// 	typeof input["password"] !== "undefined" &&
		// 	typeof input["confirm_password"] !== "undefined"
		// ) {
		// 	if (passwd != input["confirm_password"]) {
		// 		errors["password"] = "비밀번호가 일치하지 않습니다.";
		// 	}
		// }

		// this.setState({
		// 	input,
		// 	errors: errors,
		// });
	};

	const goToHome = () => {
		props.history.push(`/`);
	};

	return (
		<div className="signUp-container">
			<div className="el-main">
				<form>
					<div className="sub-info">
						<div className="info-title">계정정보</div>

						<div className="info-body">
							<div className="input-id group-start">
								<input
									type="text"
									name="student_code"
									id="student_code"
									placeholder="학번을 입력해주세요"
									onChange={handleChange}
									className="signUp-input"
								/>
								<div className="check-info"></div>
							</div>

							<div className="input-password">
								<div className="form1-input-password">
									<input
										type="password"
										name="password"
										id="password"
										value={passwd}
										placeholder="비밀번호를 입력하세요"
										onChange={(e) => setPasswd(e.target.value)}
										className="signUp-input passwrod1"
									/>
									<div className="check-info">{error}</div>
								</div>

								<div className="form2-input-password ">
									<input
										type="password"
										name="confirm_password"
										id="confirm_password"
										value={confirmPasswd}
										placeholder="비밀번호를 다시 확인하세요"
										onChange={(e) => setConfirmPasswd(e.target.value)}
										className="signUp-input"
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
									name="name"
									id="name"
									placeholder="이름을 입력해주세요"
									onChange={() => handleChange}
									className="signUp-input insert-name"
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

							<div className="input-phone">
								<input
									type="text"
									name="phone_number"
									id="phone_number"
									placeholder="핸드폰 번호를 입력하세요"
									onChange={() => handleChange}
									className="signUp-input"
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
									name="auth_number"
									id="auth_number"
									placeholder="인증번호를 입력하세요"
									onChange={() => handleChange}
									className="signUp-input"
								/>
							</div>
							<div className="check-info"></div>
						</div>
					</div>

					<button onClick={() => this.goToHome()} className="signUp-button">
						가입하기
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
