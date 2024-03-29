import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Pages/App';
import {Login} from './Pages/Login/Login'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Register, CreateProfile } from './Pages/Register/Register';

import { PostCreate, PostForm } from './Pages/PostCreate/PostCreate';
import { Reset } from './Pages/Reset Password/Register';
import { Profile } from './Pages/Profile/Profile';
import { ViewPost } from './Pages/ViewPost/ViewPost';
import { Chat } from './Pages/Chat/Chat';
import { Search } from './Pages/Search/Search';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
        <Route path='create_post/*' element={<PostCreate/>}/>
        <Route path='reset' element={<Reset/>} />
        <Route path='profile' element={<Profile/>}/>
        <Route path='post/*' element={<ViewPost/>}/>
        <Route path='set_profile' element={<CreateProfile/>}/>
        <Route path='chat' element={<Chat/>}/>
        <Route path='search/*' element={<Search/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
