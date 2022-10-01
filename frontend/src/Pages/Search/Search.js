import './Search.css';
import {Header} from "../Home/Components/Header/Header";
import {Footer} from '../Home/Components/Footer';
import { Profile } from '../Home/Components/Header/Profile_Bar/Profile';
import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { renderMatches, resolvePath } from 'react-router-dom';
import { BackendLink } from '../../Refferences/RefferencesFile';

function Search() {
  return (
    <div className='Search'>
      <Header/>
      <div className='Main-Content'>
        {MainContent()}

      </div>
      <Footer/>
    </div>
  );
}

export {Search};


class Post extends React.Component{
  constructor(props){
    super(props)
    console.log(props)
    this.state={
      mouseHover: false,
      Focused: false,
      animated: false,
    }

    this.MouseHandler.bind(this);
    this.MouseExit.bind(this);
  }

  MouseHandler(event){
    this.setState({mouseHover: true})
    setTimeout(() => {
      if(this.state.mouseHover === true){
        this.setState({Focused: true})
        console.log("Succes")
      }else{
        console.log("exited fast")
      }
    }, 500);

  }

  MouseExit(event){
    this.setState({mouseHover: false,
      Focused: false,
      animated: false,
    })
  }
  
  render(){
    return(
      <div key={this.props.value._id} className="Post" onMouseEnter={(e) => this.MouseHandler(e)} onMouseLeave={(e) => this.MouseExit(e)}>
        <div className='ImgDescWrapper'>
          <div className='ImgWrapper'>
            <img src={this.props.value.image[0]} alt="post Image"></img>
          </div>
          <a href={`/post?id=${this.props.value.postId}`}>
            <span className='Title'>{this.props.value.name}</span>
          </a>
        </div>
        <span className='Cost'><br/>{this.props.value.price + " btc"}</span>
        
        {/* {this.state.Focused?
        <aside className='Mask'>
          <p>{this.props.value.description}</p>
        </aside>
        :
        null
        } */}
      </div>
    )
    }
}


function MainContent(){

  const [posts, setPosts] = useState([])
  const urlParams = new URLSearchParams(window.location.search);  
  const search = urlParams.get("srch");


  
  useEffect(() => {
    axios.get(`${BackendLink}/posts/${search}`, {
        headers:{"x-auth-token": localStorage.getItem("token")}
        })
        .then((res) => {
            const ResPosts = res.data.postsMatching
            console.log("ha", ResPosts)
            if(ResPosts.length === 0){
                setPosts("no result")
            }
            else{
                setPosts(ResPosts)
            }
        })
        .catch((err) => {
            // TODO error handling
        });
  }, [])


  function renderPosts(){
    console.log(posts)
    if(posts == "no result"){
        return <div>Nu s-au găsit rezultate</div>
    }else{
        const list = posts.map((value, index) => 
          <Post value={value} key={value._id}/>
        )
    
        return list
    }
  }

  return(
    <div className='HomeWrapper'>
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