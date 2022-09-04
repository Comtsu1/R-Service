import { useEffect, useCallback, useRef } from "react";
import {Header} from "../../Pages/Home/Components/Header/Header"
import { Footer } from "../Home/Components/Footer";
import { useState } from "react";
import "./ViewPost.css"
import axios from "axios";
import {BackendLink} from "../../Refferences/RefferencesFile"

function ViewPost(){
    const [post, setPost] = useState(null);
    const [profile, setProfile] = useState(null);
    const urlParams = new URLSearchParams(window.location.search);
    console.log("id = ", urlParams.get("id"))
    const id = urlParams.get("id");

    const [details, setDetails]= useState({currentImgIndex: 0});

    const {current: deboucnce} = useRef(["one", "two"]);
    function preloadImage(url)
{
    var img=new Image();
    img.src=url;
}

    useEffect(() => {
        axios.get(`${BackendLink}/posts/${id}`, {
            headers:{"x-auth-token": localStorage.getItem("token")}
            })
            .then((res) => {
                setPost(res.data.postToShow[0]);
                console.log(res.data.postToShow[0]);
                res.data.postToShow[0].image.forEach((img) => {
                    preloadImage(img)
                });
            })
            .catch((err) => {
                // TODO error handling
            });

            // axios.get(`${BackendLink}/profile`, {
            //     headers:{"x-auth-token": localStorage.getItem("token")}
            // })
            // .then((res) => {
            //     setProfile(res.data.profile);
            //     if (res.data.profile.image){
            //         preloadImage(res.data.profile.image)
            //     }
            // })
    }, [])

    function navigateImages(event, direction = true){
        event.preventDefault()
        console.log("called")
        if (direction === true){
            var index = details.currentImgIndex+1
            if(index >(post.image.length - 1)){
                index = 0;
            }
            setDetails({...details, currentImgIndex: index})
        }else{
            var index = details.currentImgIndex-1
            if(index <0){
                index = (post.image.length - 1);
            }
            setDetails({...details, currentImgIndex: index})
        }
        console.log(details.currentImgIndex)
    }

    function RenderImgNav(){
        if(post.image.length>1){
            return(
                <div className="ImgNav">
                    <button onClick={(e) => navigateImages(e, false)}>
                        <div className="buttonBody">
                            <div>{"<"}</div>    
                        </div>
                    </button>
                    <button onClick={(e) => navigateImages(e, true)}>
                        <div className="buttonBody" id="right">
                            <div>{">"}</div>
                        </div>
                        </button>
                </div>
            )
        }
    }


    // rendering
    return(
        <div className="ViewPost">
            <Header/>
            <div className="Main-Content">
                <div className="Wrapper">
                    {post /*&& profile}*/? 
                    <>
                        <div className="Post">
                            <div id="sp1">
                                <div id="sp2">
                                    <h1 className="Title">{post.name}</h1>
                                    <div id="sp3">
                                        <span className="Author">by Cortana Services
                                        {/* needs work */}
                                        </span>
                                        <img className="AuthorImg" src="https://i.ibb.co/wdhr0HL/Capture.png" alt="AuthorImg"></img>
                                    </div>

                                </div>
                                <div id="sp4">
                                    <div id="sp6">
                                        <p className="Description">
                                            {post.description}
                                        </p>
                                    </div>
                                    <div id="sp5">
                                        <button id="Hire">Make Reservation</button>
                                        <button id="Contact">Contact Me</button>
                                    </div>
                                </div>
                            </div>
                            <div className="ImgContainer">
                                <img className="PostImg" src={post.image[details.currentImgIndex]} alt="PostImg"/>
                                {RenderImgNav()}
                            </div>
                        </div>
                    </>
                    :<div>Loading</div>}
                </div>
            </div>

            <Footer/>

        </div>
    )
}


export {ViewPost}
export const usePreloadImages = (imageSrcs) => {
    useEffect(() => {
      const randomStr = Math.random().toString(32).slice(2) + Date.now();
      window.usePreloadImagesData = window.usePreloadImagesData ?? {};
      window.usePreloadImagesData[randomStr] = [];
      for (const src of imageSrcs) {
        const img = new Image();
        img.src = src;
        window.usePreloadImagesData[randomStr].push(img);
      }
      return () => {
        delete window.usePreloadImagesData?.[randomStr];
      };
    }, [imageSrcs]);
  };
