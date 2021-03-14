import React from "react";
import Signinbackground from "./image/SigninbackgroundHalf.png";
import GlobalMediaLogo from "./image/GlobalMedia_Logo.png";
import style from "./SignIn.scss";

const SignIn = () => {
	return (
		<div className="login-container">
			<div className="login-left login">
				<div className="GlobalMedia-logo">
					<img
						src={GlobalMediaLogo}
						alt="My dongho"
						className="GlobalMediaLogo"
					/>
				</div>
				<div className="login-form-div">
					<form className="login-form">
						<input
							className="login-input"
							type="text"
							name="query"
							placeholder="학번"
						/>
						<div className="check-info"></div>
						<input
							className="login-input"
							type="password"
							name="query"
							placeholder="비밀번호"
						/>
						<div className="check-info"></div>

						<label className="remember-id-container">
							아이디 기억하기
							<input type="checkbox" />
							<span className="remember-id-checkmark"></span>
						</label>

						<button className="log-button" type="submit">
							로그인
						</button>
					</form>
				</div>
				<p className="url-signUp">
					<a href="/signup" className="signUp">
						회원가입
					</a>
				</p>
			</div>

			<div className="login-right login">
				<img
					src={Signinbackground}
					alt="My dongho"
					className="Signinbackground"
				/>
				<p className="url-signUp">
					<a href="/signup" className="signUp">
						회원가입
					</a>
				</p>
			</div>
		</div>
	);
};

export default SignIn;
