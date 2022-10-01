import './Home.css';
import {Header} from "./Components/Header/Header";
import {Footer} from './Components/Footer';
import { Profile } from './Components/Header/Profile_Bar/Profile';
import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { renderMatches, resolvePath } from 'react-router-dom';
import logo from './Icons/RServiceLogo_transparent.png';
import FocusImage from './Icons/ryan-stone-OlxJVn9fxz4-unsplash.jpg';

import {Post} from './Components/Post';
import { BackendLink } from '../../Refferences/RefferencesFile';

function Home() {
  return (
    <div className='Home'>
      <Header/>
      <div className='Main-Content'>
        {MainContent()}

      </div>
      <Footer/>
    </div>
  );
}

export {Home};



function MainContent(){

  const [posts, setPosts] = useState([])
  const [desktop, setDesktop] = useState(window.innerWidth < 1300)

  
  useEffect(() => {
    axios.get(`${BackendLink}/posts`, {
        headers:{"x-auth-token": localStorage.getItem("token")}
        })
        .then((res) => {
            const ResPosts = res.data.newest20Posts
            setPosts(ResPosts)
        })
        .catch((err) => {
            // TODO error handling
        });
  }, [])

  const updateMedia = () => {
    setDesktop(window.innerWidth < 1300);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  })


  function renderPosts(){
    let imgList = posts.map((val) => {return val});
    if (desktop){
      imgList.splice(6, 14);
    }else{
      imgList.splice(16, 4);
    }
    const list = imgList.map((value, index) => 
      <Post value={value} key={value._id}/>
    )

    return list
  }

  return(
    <>
    <div className='FocusHolder'>
      <img src={FocusImage} alt="focus image"/>
      <div className='FocusContent'>
        <div className='CatchLineBg'>
          <div className='CatchLine'> 
            <h2>Need a <br/> problem <br/> solved in <br/> no-time?</h2>
            <p>Find the right service for you now</p>
          </div>
        </div>
      </div>
    </div>
    <div className='HomeWrapper'>
      <h3>Find the latest servcices <br/> using the platform RService</h3>
        
      <div className={desktop?'Background' :'Background Big'}>
        {
          posts.length?
          <>
            {renderPosts()}
          </>
          :
          <div>Loading</div>
        }
      </div>
    </div>
    </>
  )  

}