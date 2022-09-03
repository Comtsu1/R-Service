import './Home.css';
import {Header} from "./Components/Header/Header";
import {Footer} from './Components/Footer';
import { Profile } from './Components/Header/Profile_Bar/Profile';
import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { renderMatches, resolvePath } from 'react-router-dom';

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
          <a href={`/post?id=${this.props.value._id}`}>
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
      <Post value={value} key={value._id}/>
    )

    return list
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