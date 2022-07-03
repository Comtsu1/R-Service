import React, {useState} from "react";
import '../components-css/LoginForm.css';
import visibility from "../Icons/visibility.png";
import unVisibility from "../Icons/visibility_slash.png"


function LoginForm({Login, error}) {
    const [details, setDetails] = useState({name: "", email: "", password: "", PasswordTextIsShown: false});

    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    }

    function toggleText(){
        setDetails({...details, PasswordTextIsShown: !details.PasswordTextIsShown})
    }

    function renderToggleButton(){
        if(details.password){
            return(
                <button
                id="toggleText"
                type="button"
                onClick={toggleText}
                >
                    <img src={details.PasswordTextIsShown?unVisibility:visibility}
                    className = "eye-image"
                    alt={details.PasswordTextIsShown?"eye-slashed":"eye"}
                    ></img>
                </button>
            );
        }
    }

    function textPassword(){
        if(!details.password && details.PasswordTextIsShown){
            setDetails({...details, PasswordTextIsShown: false})
        }
        if(details.PasswordTextIsShown){
            return("text")
        }else{
            return("password")
        };
    }


    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Login</h2>
                {(error != "") ? (<div className="error">{error}</div>) : ""}
                <div className="form-group name">
                    <label htmlFor="name">Name: </label>
                    <input type={'text'} name='name' id='name' onChange={e => setDetails({...details, name: e.target.value})} value={details.name} />
                </div>
                <div className="form-group email">
                    <label htmlFor="email">Email: </label>
                    <input type={'email'} name='email' id='email' onChange={e => setDetails({...details, email: e.target.value})} value={details.email} />
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
                            password: e.target.value})
                        } 
                        value={details.password}>
                        </input>
                        {renderToggleButton()}

                    </div>
                </div>
                <input type={'submit'} value="LOGIN" />
            </div>
        </form>
    );
}

export default LoginForm;