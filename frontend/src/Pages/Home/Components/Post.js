import React from "react";
import "./Post.css";


class Post extends React.Component{
    constructor(props){
      super(props)
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
        <div key={this.props.value._id} className="LandingPageCard" onMouseEnter={(e) => this.MouseHandler(e)} onMouseLeave={(e) => this.MouseExit(e)}>
          <div className='ImgDescWrapper'>
            <div className='ImgWrapper'>
                <img src={this.props.value.image[0]} alt="post Image"></img>
                <div className="Discover">
                    <a href={`/post?id=${this.props.value.postId}`}>
                        <div className="DiscoverButton">Discover More</div>
                    </a>
                </div>
            </div>
            <a href={`/post?id=${this.props.value.postId}`}>
              <span className='Title'>{this.props.value.name}</span>
              <span className="Cost">{this.props.value.price} btc</span>
            </a>
          </div>
          
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
  
  export {Post}