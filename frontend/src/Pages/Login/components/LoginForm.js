import React, { useState } from "react";
import './LoginForm.css';
import visibility from "../Icons/visibility.png";
import unVisibility from "../Icons/visibility_slash.png";

class ForgotPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		if (this.state.email) {
			console.log("submitted password reset")
		}
		event.preventDefault();
	}

	handleChange(event) {
		this.setState({ email: event.target.value })
	}


	render() {
		return (
			<div className='Wrapper'>
				<h1>
					Reset Password
				</h1>
				<p id='Forgot-description'>
					Please enter your email address and we'll send you a link to reset your password. <br /> --false
				</p>
				<form id="ForgotForm" onSubmit={this.handleSubmit}>
					<input placeholder="Enter your email" type='email' value={this.state.email} onChange={this.handleChange}></input>
				</form>
			</div>
		)
	}

}

function LoginForm({ Login, error }) {
	const [details, setDetails] = useState({email: "", password: "", PasswordTextIsShown: false, ForgotPass: false });

	const submitHandler = e => {
		e.preventDefault();

		Login(details);
	}

	function toggleText() {
		setDetails({ ...details, PasswordTextIsShown: !details.PasswordTextIsShown })
	}

    function ToggleForgotPasswordForm(){
        setDetails({...details, ForgotPass: !details.ForgotPass})
    }

	function renderToggleButton() {
		if (details.password) {
			return (
				<button
					id="toggleText"
					type="button"
					onClick={toggleText}
				>
					<img src={details.PasswordTextIsShown ? unVisibility : visibility}
						className="eye-image"
						alt={details.PasswordTextIsShown ? "eye-slashed" : "eye"}
					></img>
				</button>
			);
		}
	}

	function textPassword() {
		if (!details.password && details.PasswordTextIsShown) {
			setDetails({ ...details, PasswordTextIsShown: false })
		}
		if (details.PasswordTextIsShown) {
			return ("text")
		} else {
			return ("password")
		}
	}


	if (details.ForgotPass) {
		return (
			<>
				<div className="Wrapper-bg">
					<div className="Wrapper">
						<ForgotPassword />
						<div className="Footer">
							<button type="button" onClick={ToggleForgotPasswordForm}>
								return
							</button>
						</div>
					</div>
				</div>
			</>
		)
	} else {
		return (
			<div className="Wrapper-bg">
				<div className="Wrapper">
					<form onSubmit={submitHandler}>
						<div className="form-inner">
							<h2>Login</h2>
							{(error !== "") ? (<div className="error">{error}</div>) : ""}
							<div className="form-group email">
								<label htmlFor="email">Email: </label>
								<input type={'email'} name='email' id='email' onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
							</div>
							<div className="form-group password">
								<label htmlFor="password">Password: </label>
								<div className="password-placeholder">
									<input
										className="password-input"
										type={textPassword()}
										name='password'
										id='password'
										onChange={e => setDetails({
											...details,
											password: e.target.value
										})
										}
										value={details.password}>
									</input>
									{renderToggleButton()}

								</div>
							</div>
							<input type={'submit'} value="LOGIN" />
						</div>
					</form>

					<div className="Footer">
						<button type="button" onClick={ToggleForgotPasswordForm}>
							Forgot Password?
						</button>
						<a href="register">
							<button>
								Register
							</button>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export { LoginForm };
