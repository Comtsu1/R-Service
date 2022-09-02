import './Home.css';
import {Header} from "./Components/Header/Header";
import {Footer} from './Components/Footer';
import { Profile } from './Components/Header/Profile_Bar/Profile';
import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { renderMatches } from 'react-router-dom';

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

  
  useEffect(() => {
    axios.get("http://localhost:8080/posts", {
        headers:{"x-auth-token": localStorage.getItem("token")}
        })
        .then((res) => {
            const ResPosts = res.data.newest20Posts
            console.log("ha", ResPosts)
            setPosts(ResPosts)
        })
        .catch((err) => {
            // TODO error handling
        });
  }, [])


  function renderPosts(){
    const list = posts.map((value, index) => 
      <div key={value._id} className="Post" >
        <div>
          <div className='ImgWrapper'>
            <img src={value.image[0]} alt="post Image"></img>
          </div>
          <a href={`/post#id=${value._id}`}>
            <span className='Title'>{value.name}</span>
          </a>
        </div>
        <span className='Cost'><br/>{value.price + " btc"}</span>
      </div>
    )

    return list
  }

  return(
    <div className='Wrapper'>
      <div className='Background'>
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

  )  

}