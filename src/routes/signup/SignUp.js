import React, { useState, PureComponent } from "react";
import styled from "styled-components";
import style from "./SignUp.scss";

class SignUp extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			input: {},
			errors: {},
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		let input = this.state.input;
		let errors = {};
		input[event.target.name] = event.target.value;

		if (
			typeof input["password"] !== "undefined" &&
			typeof input["confirm_password"] !== "undefined"
		) {
			if (input["password"] != input["confirm_password"]) {
				errors["password"] = "Passwords don't match.";
			}
		}

		this.setState({
			input,
			errors: errors,
		});
	}

	gotoHome() {
		this.props.history.push(`/`);
	}

	render() {
		return (
			<div className="signout-container">
				<div className="el-main">
					<form onSubmit={this.handleSubmit}>
						<div className="sub-info">
							<div className="info-title">계정정보</div>

							<div className="info-body">
								<div className="input-id group-start">
									<input
										type="text"
										name="student_code"
										id="student_code"
										value={this.state.input.student_code}
										placeholder="학번을 입력해주세요"
										onChange={this.handleChange}
										className="signOut-input"
									/>
									<div className="check-info">
										{this.state.errors.student_code}
									</div>
								</div>

								<div className="input-password">
									<div className="form1-input-password">
										<input
											type="password"
											name="password"
											id="password"
											value={this.state.input.password}
											placeholder="비밀번호를 입력하세요"
											onChange={this.handleChange}
											className="signOut-input passwrod1"
										/>
										<div className="check-info">
											{this.state.errors.password}
										</div>
									</div>

									<div className="form2-input-password password2">
										<input
											type="password"
											name="confirm_password"
											id="confirm_password"
											value={this.state.input.confirm_password}
											placeholder="비밀번호를 다시 확인하세요"
											onChange={this.handleChange}
											className="signOut-input"
										/>
										<div className="check-info">
											{this.state.errors.confirm_password}
										</div>
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
										value={this.state.input.name}
										placeholder="이름을 입력해주세요"
										onChange={this.handleChange}
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

								<div className="input-phone">
									<input
										type="text"
										name="phone_number"
										id="phone_number"
										value={this.state.input.phone_number}
										placeholder="핸드폰 번호를 입력하세요"
										onChange={this.handleChange}
										className="signOut-input"
									/>
								</div>
								<div className="check-info">
									{this.state.errors.phone_number}
								</div>
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
										value={this.state.input.auth_number}
										placeholder="인증번호를 입력하세요"
										onChange={this.handleChange}
										className="signOut-input"
									/>
								</div>
								<div className="check-info">
									{this.state.errors.auth_number}
								</div>
							</div>
						</div>

						<button onClick={() => this.gotoHome()} className="signOut-button">
							가입하기
						</button>
					</form>
				</div>
			</div>
		);
	}
}
export default SignUp;
