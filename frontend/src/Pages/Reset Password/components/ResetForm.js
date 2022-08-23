import React, {useState} from "react";
import './ResetForm.css';




function ResetForm({Reset}) {
    const [details, setDetails] = useState({email: "some email", password: "", confirmPassword: "", passwordsMatching: false});

    const submitHandler = e => {
        /// I need to get somehow the mail it was redirected from (the account mail) 
        e.preventDefault();

        details.passwordsMatching && details.email? 
        Reset(details):
        console.log("didn't send data")
    }

    function comparePasswords(value, modifier=false){
        if (modifier){
            if (details.confirmPassword === value) {
                return("Passwords matching", true)
            }else{
                return("Passwords are not matching!", false)
            }
        }else{
            if (details.password === value) {
                return("Passwords matching", true)
            }else{
                return("Passwords are not matching!", false)
            }
        }
    }

    function confirmPasswordChangeHandler(event){
        var resultText, result = comparePasswords(event.target.value)
        setDetails({...details, 
            confirmPassword: event.target.value,
            passwordsMatching: result
        });
        console.log(details.password, event.target.value)
    }

    function passwordChangeHandler(event){
        var resultText, result = comparePasswords(event.target.value, true)
        setDetails({...details, 
            password: event.target.value,
            passwordsMatching: result
        });
        console.log(event.target.value, details.confirmPassword)
    }


    return (
        <div className="Wrapper-bg">
            <div className="Wrapper">
                <form onSubmit={submitHandler}>
                    <div className="form-inner">
                        <h2>Reset</h2>
                        <div className="form-group password">
                            <label htmlFor="password">Password: </label>
                            <input 
                            className="password-input"
                            type='password'
                            name='password' 
                            id='password' 
                            onChange={
                                e => passwordChangeHandler(e)
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
                        <input type={'submit'} value="Reset Password" />
                    </div>
                </form>

            </div>
        </div>
    );
}


export {ResetForm};