import {RegisterForm} from './components/RegisterForm';
import React, {useState} from 'react';
import axios from 'axios';

function Register(){

      const [error, setError] = useState("");
      const [result, setResult] = useState(null);

      const Register = details => {
        // console.log(details);
    
        if( !details.passwordsMatching || !details.email )
        {
          setError("Please complete all available slots!")
          return;
        }
        else{
          ///connect back-end
          RegisterDB(details);
        }
      }
    
      const RegisterDB = (details) => {
        const payload = {
          username: details.username,
          email: details.email,
          password: details.password
        };
        

        axios.post('http://localhost:8080/user/register', payload)
          .then((res) => {
            setResult(res.data);
          })
          .catch(err => {
            if(err.response) {
              //client side error
              console.log(err.response.data);
              setError(err.response.data.error);
            }
          });

      }
    
      return (
        <div className="Register">
          <RegisterForm Register={Register} error={error} />
        </div>
      );
}



export {Register};