import {RegisterForm} from './components/RegisterForm';
import React, {useState} from 'react';


function Register(){
    
      const Register = details => {
        console.log(details);
    
        ///connect back-end
      }
    
    
      return (
        <div className="Register">
          <RegisterForm Register={Register}/>
        </div>
      );
}



export {Register};