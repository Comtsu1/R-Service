import React, {useState} from "react";
import './RegisterForm.css';
import visibility from "../../Login/Icons/visibility.png";
import unVisibility from "../../Login/Icons/visibility_slash.png";




function RegisterForm({Register, error}) {
    const [details, setDetails] = useState({firstName: "", secondName: "", email: "", password: "", confirmPassword: "", passwordsMatching: false,
PasswordTextIsShown: false, PasswordTextIsShown2: false});

    function toggleText() {
		setDetails({ ...details, PasswordTextIsShown: !details.PasswordTextIsShown })
	}
    function toggleText2() {
		setDetails({ ...details, PasswordTextIsShown2: !details.PasswordTextIsShown2 })
	}

    function renderToggleButton() {
		if (details.password) {
			return (
				<button
					id="toggleText"
					type="button"
					onClick={toggleText2}
				>
					<img src={details.PasswordTextIsShown ? unVisibility : visibility}
						className="eye-image"
						alt={details.PasswordTextIsShown ? "eye-slashed" : "eye"}
					></img>
				</button>
			);
		}
	}

    function renderToggleButton2() {
		if (details.confirmPassword) {
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

    const submitHandler = e => {
        e.preventDefault();

        Register(details);

        return;

        // invalidated
        if(details.passwordsMatching && details.email)
        {
            Register(details);
        }
        else
        {
            error = "Please complete all available slots!";
            console.log('fuck you')
        }
    }

    function comparePasswords(value, modifier=false){
        if(modifier){
            if (details.confirmPassword === value) {
                return("Passwords matching", true)
            }else{
                return("Passwords are not matching!", false)
            }
        }else{
            if(details.password === value) {
                return("Passwords matching", true)
            }else{
                return("Passwords are not matching!", false)
            }
        }
    }

    function confirmPasswordChangeHandler2(event){
        var resultText, result = comparePasswords(event.target.value, true)
        setDetails({...details, 
            password: event.target.value,
            passwordsMatching: result
        });
    }

    function confirmPasswordChangeHandler(event){
        var resultText, result = comparePasswords(event.target.value)
        setDetails({...details, 
            confirmPassword: event.target.value,
            passwordsMatching: result
        });
    }


    return (
        <div className="Wrapper-bg">
            <div className="Wrapper">
                <form onSubmit={submitHandler}>
                    <div className="form-inner">
                        <h2>Register</h2>

                        {/* Error div */}
                        {(error !== "") ? (<div className="error">{error}</div>) : ""}

                        <div className="form-group username">
                            <label htmlFor="username">First Name: </label>
                            <input type={'text'} name='firstName' id='username' onChange={e => setDetails({...details, firstName: e.target.value})} value={details.firstName} />
                        </div>
                        <div className="form-group username">
                            <label htmlFor="username">Second Name: </label>
                            <input type={'text'} name='secondName' id='username' onChange={e => setDetails({...details, secondName: e.target.value})} value={details.secondName} />
                        </div>
                        <div className="form-group email">
                            <label htmlFor="email">Email: </label>
                            <input type={'email'} name='email' id='email' onChange={e => setDetails({...details, email: e.target.value})} value={details.email} />
                        </div>
                        <div className="form-group password">
                            <label htmlFor="password">Password: </label>
                            <input 
                            className="password-input"
                            type='password'
                            name='password' 
                            id='password' 
                            onChange={e => confirmPasswordChangeHandler2(e)} 
                            value={details.password}>
                            </input>
                            {renderToggleButton()}
                        </div>
                        <div className="form-group confirm-password">
                            <label htmlFor="confirm-password">Confirm password:</label>
                            <input 
                            className="confirm-password-input"
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            onChange={(e) => confirmPasswordChangeHandler(e)}
                            value={details.confirmPassword}>
                            </input>
                            {details.confirmPassword? 
                                details.passwordsMatching?
                                <label id='Passwords-matching'>
                                    Passwords matching
                                </label>:
                                <label id='Passwords-mismatching'>
                                Passwords are not matching!
                                </label>
                             : null}
                             {renderToggleButton2()}
                        </div>
                        <input type={'submit'} value="REGISTER" />
                    </div>
                </form>

                <div className="Footer">
                    <a href="login">
                        <button>
                            Already have an account?
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}


export {RegisterForm};