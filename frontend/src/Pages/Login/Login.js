import {LoginForm} from './components/LoginForm';
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login(){
    const navigate = useNavigate();

    const adminUser = {
        email: "admin@admin.ro",
        password: "duckoff"
      } 
    
      // user is not used anywhere and the check if the user is signed in 
      // is not even in this class, its in Header.js from Home component
      // const [user, setUser] = useState({name: "", email: ""});

      const [error, setError] = useState("");
      
      const sendDataDB = (details) => {
        const payload = {
          email: details.email,
          password: details.password
        };
    
        axios.post('http://localhost:8080/user/login', payload)
          .then((res) => ManageResponse(res))
          .catch((err) => {
            if(err.response) {
              // means we have a successful error 
    
              console.log(err.response.data); // testing
              setError(err.response.data.error);
              console.log(err.response.status); // testing
              // console.log(err.response.headers); // testing headers
            }
          });
      }
      
      const ManageResponse = (res) => {
        console.log(res.data.token);
        localStorage.setItem("token", JSON.stringify(res.data.token));

        navigate('/');
      } 

      const Login = details => {
        if(!details.email || !details.password){
          setError("Please complete all available slots!")
          return;
        }

        sendDataDB(details);
      }    
      
      // doesnt do anything, 
      // everything is handled by Home component
      const Logout = () => {
        // setUser({
          // name: '',
          // email: ''
        // });
        localStorage.removeItem("token")
        console.log("Logout");
      }
    
      return (
        <div className="Login">
          <LoginForm Login={Login} error={error} />
        </div>
      );
}



export { Login };