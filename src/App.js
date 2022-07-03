import React, {useState} from 'react';
import './App.css';
import LoginForm from './components/LoginForm';


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function App() {
  
  const adminUser = {
    email: "admin@admin.ro",
    password: "duckoff"
  }


  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if(details.email == adminUser.email && details.password == adminUser.password) {
      console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email
      });
    } else {
      setError("Go away!");
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
    <div className="App">
      {(user.email != "") ? (
        <div className='welcome'>
          <h2>welcome <span>{user.name}</span></h2>
          <button onClick={Logout} className='logout'>Logout</button>
        </div>
      ) :
      (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
