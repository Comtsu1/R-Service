import React, {useState} from "react";
import '../components-css/LoginForm.css'

function LoginForm({Login, error}) {
    const [details, setDetails] = useState({name: "", email: "", password: "", PasswordTextIsShown: false});
    var PasswordTextIsShown = false;

    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    }

    function toggleText(){
        setDetails({...details, PasswordTextIsShown: !details.PasswordTextIsShown})
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
                        type={details.PasswordTextIsShown?"text":"password"} 
                        name='password' 
                        id='password' 
                        onChange={e => setDetails({
                            ...details, 
                            password: e.target.value})} 
                        value={details.password}>

                        </input>
                        <i>
                            
                        </i>
                        <button
                        id="toggleText"
                        type="button"
                        onClick={toggleText}
                        >
                            show
                        </button>   

                    </div>
                </div>
                <input type={'submit'} value="LOGIN" />
            </div>
        </form>
    );
}

export default LoginForm;