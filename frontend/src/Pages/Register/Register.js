import {RegisterForm} from './components/RegisterForm';
import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register(){

      const navigate = useNavigate();
      const [error, setError] = useState("");

      const SendRegisterDB = (details) => {
        axios.post("http://localhost:8080/user/register", details)
            .then(res => ManageResponse(res, details))
            .catch(err => (err) => {
              // clientside error
              
              //testing
              setError(err.response.data);
              console.log(err.response.data);
              console.log(err.response.status);
            })
      }
      
      const ManageResponse = (res, details) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        
        axios.post("http://localhost:8080/create-profile", { headers: { "x-auth-toke": localStorage.getItem("token"), data: details } })
          .catch(err => {setError(err.response.data.error); return;})
        navigate('/');
      }

      const Register = details => {
        console.log(details);
        
        ///if username exists block request
        ///connect back-end: doing rn chief
        
        if(!details.email || !details.password || !details.username || !details.confirmPassword){
          setError("Please complete all available slots!");
          return;
        }

        // html button handles this perfectly
        //if(!String(details.email).includes('@')) {setError("Email is not valid!"); return;}

        const hasNumber = /\d/
        function containsSpecialChars(str) {
            const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            return specialChars.test(str);
        }
        if(!hasNumber.test(details.password) || !containsSpecialChars(details.password)) {setError("Password must contain numbers and characters!"); return}

        SendRegisterDB(details);
      }
    
    
      return (
        <div className="Register">
          <RegisterForm Register={Register} error={error}/>
        </div>
      );
}



export {Register};
