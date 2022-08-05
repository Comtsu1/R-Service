import {LoginForm} from './components/LoginForm';
import React, {useState} from 'react';
import axios from 'axios';

function Login(){
    const adminUser = {
        email: "admin@admin.ro",
        password: "duckoff"
      } 
    
    
      const [user, setUser] = useState({name: "", email: ""});
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
              // means we have a successful error, sever connected. client-side error
    
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
      } 

      const Login = details => {
        if(!details.email || !details.password){
          setError("Please complete all available slots!")
          return;
        }

        sendDataDB(details);
      }    

      const Logout = () => {
        setUser({
          name: '',
          email: ''
        });
        console.log("Logout");
      }
    
      return (
        <div className="Login">
          <LoginForm Login={Login} error={error} />
        </div>
      );
}



export { Login };