import {LoginForm} from './components/LoginForm';
import React, {useState} from 'react';


function Login(){
    const adminUser = {
        email: "admin@admin.ro",
        password: "duckoff"
      } 
    
    
      const [user, setUser] = useState({name: "", email: ""});
      const [error, setError] = useState("");
    
      const Login = details => {
        console.log(details);
    
        if(details.email === adminUser.email && details.password === adminUser.password) {
          console.log("Logged in");
          setUser({
            name: details.name,
            email: details.email
          });
        } else {
          if(details.email && !details.password){
            setError("Please insert password")
          } else {
            if(details.email || details.password){
              setError("Username or password incorrect")
            } else {
              setError("Go away!");
            }
          }
        }
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



export {Login};