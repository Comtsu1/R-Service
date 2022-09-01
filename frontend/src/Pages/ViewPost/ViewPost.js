import { useEffect } from "react";
import {Header} from "../../Pages/Home/Components/Header/Header"
import { Footer } from "../Home/Components/Footer";
import { useState } from "react";
import "./ViewPost.css"

function ViewPost(){

    const images=["https://i.ibb.co/HtVnSr5/Desert.jpg", "https://i.ibb.co/WBT3cnm/Lighthouse.jpg", "https://i.ibb.co/DCbD2MX/site-1552-0001-1200-630-20180219161055.jpg", "https://i.ibb.co/LS7TDjP/landscape-new-zealand-S-shape.jpg"];
    usePreloadImages(images)
    

    const [details, setDetails]= useState({currentImgIndex: 0});

    function navigateImages(event, direction = true){
        event.preventDefault()
        console.log("called")
        if (direction === true){
            var index = details.currentImgIndex+1
            if(index >(images.length - 1)){
                index = 0;
            }
            setDetails({...details, currentImgIndex: index})
        }else{
            var index = details.currentImgIndex-1
            if(index <0){
                index = (images.length - 1);
            }
            setDetails({...details, currentImgIndex: index})
        }
        console.log(details.currentImgIndex)
    }

    function RenderImgNav(){
        if(images.length>1){
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
                    <div className="Post">
                        <div id="sp1">
                            <div id="sp2">
                                <h1 className="Title">Cortana Landscapes</h1>
                                <div id="sp3">
                                    <span className="Author">by Cortana Services</span>
                                    <img className="AuthorImg" src="https://i.ibb.co/wdhr0HL/Capture.png" alt="AuthorImg"></img>
                                </div>

                            </div>
                            <div id="sp4">
                                <div id="sp6">
                                    <p className="Description">
                                    With these services, Cortana's millions of replicas around the world will work together to generate a unique landscape. 
                                    </p><p className="Description">
                                    The user has to enter some input data that will guide Cortana and her replicas on how to produce the image. The inputs will be some keywords like "rule of thirds" "stairway" "monolith structure" and so on.
                                    </p><p className="Description">
                                    With Cortana's lightning fast computations and super resolution of up to 16K you are guaranteed a fast and high quality result that is worth your time and money.
                                    </p>
                                </div>
                                <div id="sp5">
                                    <button id="Hire">Make Reservation</button>
                                    <button id="Contact">Contact Me</button>
                                </div>
                            </div>
                        </div>
                        <div className="ImgContainer">
                            <img className="PostImg" src={images[details.currentImgIndex]} alt="PostImg"/>
                            {RenderImgNav()}
                        </div>
                    </div>
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
