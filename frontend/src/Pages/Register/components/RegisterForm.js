import React, {useState} from "react";
import './RegisterForm.css';




function RegisterForm({Register, error}) {
    const [details, setDetails] = useState({username: "", email: "", password: "", confirmPassword: "", passwordsMatching: false});

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

    function comparePasswords(value){
        if (details.password === value) {
            return("Passwords matching", true)
        }else{
            return("Passwords are not matching!", false)
        }
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
                            <label htmlFor="username">Username: </label>
                            <input type={'username'} name='username' id='username' onChange={e => setDetails({...details, username: e.target.value})} value={details.username} />
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
                            onChange={e => setDetails({
                                ...details, 
                                password: e.target.value})
                            } 
                            value={details.password}>
                            </input>
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