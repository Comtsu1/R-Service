import {RegisterForm} from './components/RegisterForm';
import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ProfileForm} from './components/CreateProfileForm'
import {Footer} from "../Home/Components/Footer"
import { BackendLink } from '../../Refferences/RefferencesFile';

function Register(){

      const navigate = useNavigate();
      const [error, setError] = useState("");

      const SendRegisterDB = (details) => {
        axios.post(`${BackendLink}/user/register`, details)
            .then(res => {ManageResponse(res, details);})
            .catch(err => {
              console.log(err);
              console.log(err.response.data.error);
              console.log(err.response.status);
              //testing
              setError(err.response.data.error + " (" + err.response.status + ")");
              return;
            })
      }
      
      const ManageResponse = (res, details) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("secondStageValidator", res.data.token)
        
        // const config = {
        //     headers:{
        //         'x-auth-token': localStorage.getItem("token")
        //     }
        // };
        //axios.post("http://localhost:8080/create-profile", details, config)
        //  .then(() => navigate('/'))
        //  .catch(err => {setError(err.response.data.error); return;})
        navigate('/profile');
      }

      const Register = details => {
        console.log(details);
        
        ///if username exists block request
        ///connect back-end: doing rn chief
        
        if(!details.email || !details.password || !details.firstName || !details.secondName || !details.confirmPassword){
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

// Profile Creator

function CreateProfile(){


  return (
    <>
      <div className='Main-Header'></div>
      <div className='Main-Content'>
        <div className='CreateProfile'>
          <ProfileForm/>
        </div>
      </div>
      <Footer/>
    </>
  )
}
export {CreateProfile}
