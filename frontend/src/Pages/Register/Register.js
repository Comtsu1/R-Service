import {RegisterForm} from './components/RegisterForm';
import React, {useState} from 'react';
import axios from 'axios';

function Register(){

      const [error, setError] = useState("");

      const SendRegisterDB = (details) => {
        axios.post("https:localhost:8080/user/register", details)
            .then(res => console.log(res))
            .catch(err => (err) => {
              // clientside error
              
              //testing
              setError(err.response.data);
              console.log(err.response.data);
              console.log(err.response.status);
            })
      }

      const Register = details => {
        console.log(details);
        
        ///if username exists block request
        ///connect back-end: doing rn chief
        
        if(!details.email || !details.password || !details.username || !details.confirmPassword){
          setError("Please complete all available slots!");
          return;
        }

        SendRegisterDB(details);
      }
    
    
      return (
        <div className="Register">
          <RegisterForm Register={Register} error = {error}/>
        </div>
      );
}



export {Register};