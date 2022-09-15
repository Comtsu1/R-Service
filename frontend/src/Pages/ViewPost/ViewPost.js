import React,{ useEffect, useCallback, useRef } from "react";
import {Header} from "../../Pages/Home/Components/Header/Header"
import { Footer } from "../Home/Components/Footer";
import { useState } from "react";
import "./ViewPost.css"
import axios from "axios";
import {BackendLink} from "../../Refferences/RefferencesFile";
import {Calendar1} from "./Components/Calendar";
import {Reservations} from "./Components/Reservations.js"  
import {ReviewPopup} from "./Components/ReviewPopup"

function ViewPost(){
    const [post, setPost] = useState(null);
    const [reserved, setReserved] = useState({value: false, status: "none"});
    const [reservedHere, setReservedHere] = useState([]);
    const [profile, setProfile] = useState(null);
    const [service_profile, SetServiceProf] = useState(null);
    const urlParams = new URLSearchParams(window.location.search);  
    const [selectedDay, setSelectedDay] = useState(null);
    const id = urlParams.get("id");
    const [postProfile, setPostProfile] = useState({});
    const [debounce, setDebounce] = useState(false);

    const [details, setDetails]= useState({currentImgIndex: 0, calendarOpened: false, disabledDays: [], loggedOut: false});

    const [rating, setRating] = useState(null);

    const {current: deboucnce} = useRef(["one", "two"]);
    function preloadImage(url)
{
    var img=new Image();
    img.src=url;
}

    useEffect(() => {
        axios.get(`${BackendLink}/post/${id}`, {
            headers:{"x-auth-token": localStorage.getItem("token")}
            })
            .then((res) => {
                setPost(res.data.postToShow[0]);
                res.data.postToShow[0].image.forEach((img) => {
                    preloadImage(img)
                });
                axios.get(`${BackendLink}/profile/${res.data.postToShow[0].author}`)
                .then(res => SetServiceProf(res.data.profile))
            })
            .catch((err) => {
                // TODO error handling
            });

        axios.get(`${BackendLink}/profile`, {
            headers:{"x-auth-token": localStorage.getItem("token")}
            })
            .then((res) => {
                setProfile(res.data.profile.user);
                res.data.reservations_made.map((value) =>{
                        if(value.postId === id){
                            setReserved({...reserved, value: true, status: value.status})
                        }
                })
                var ReservationReq = [];
                res.data.reservations.map((value) => {
                    if (value.postId == id){
                        ReservationReq.push(value)
                    }
                })
                setReservedHere(ReservationReq);
                
            })
    }, [])

    function navigateImages(event, direction = true){
        event.preventDefault()
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
    }

    function makeReservation(event){
        event.preventDefault()
        if(localStorage.getItem('token') !== null){
            setDetails({...details, calendarOpened: true})
            setReserved({...reserved, value:true, status: "pending"})
        }else{
            setDetails({...details, loggedOut: true})
        }
    }

    function giveRating(event){
        event.preventDefault();
        ReviewPopup();
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

    function RentReservation(date){
        axios.post(`${BackendLink}/reservation`,{
            // payload
            date: selectedDay,
            user: post.author,
            postId: post.postId,
        }, {
            // headers
            headers: {"x-auth-token": localStorage.getItem("token")},
        })
    }


    // rendering
    return(
        <div className="ViewPost">
            <Header/>
            <div className="Main-Content">
                <div className="Wrapper">
                    {post /*&& profile */&& service_profile? 
                    <>
                        <div className="Post">
                            <div id="sp1">
                                <div id="sp2">
                                    <h1 className="Title">{post.name}</h1>
                                    <div id="sp3">
                                        <span className="Author"> {service_profile ? service_profile.firstName + " " + service_profile.secondName : "Couldn't fetch data"}
                                        {/* needs work */}
                                        </span>
                                        <img className="AuthorImg" src={(service_profile && service_profile.image != "")? service_profile.image : "https://i.ibb.co/wdhr0HL/Capture.png"} alt="AuthorImg"></img>
                                    </div>

                                </div>
                                <div id="sp4">
                                    <div id="sp6">
                                        <p className="Description">
                                            {post.description}
                                        </p>
                                    </div>
                                    <div id="sp5">
                                        <div className="Buy">
                                        {details.calendarOpened?
                                            Calendar1(selectedDay, setSelectedDay, setDetails, details, RentReservation)
                                        :null
                                        }


                                        {profile === service_profile.user?
                                                <button className="button" id="Delete" onClick={null
                                                }>Remove Post</button>
                                            :
                                            <>
                                                {details.loggedOut?
                                                    <>
                                                        <div className="LoggedOut">
                                                            <div className="LoBox">
                                                                <p>You need to log in to make a reservation</p>
                                                            </div>
                                                            <div className="Appendice"></div>
                                                        </div>
                                                    </>
                                                    :
                                                    null
                                                }
                                                    {!reserved.value?
                                                    <>
                                                        <button className="button" id="Hire" onClick={
                                                            (e) => {makeReservation(e)}
                                                        }>Make Reservation</button>
                                                    </>
                                                    :
                                                    <div className="button" id="Pending">{reserved.status}</div>
                                                }
                                                
                                            </>
                                        }
                                        </div>
                                        {profile === service_profile.user?null:
                                        <button className="button" id="Contact" onClick={e => giveRating()}>Contact Me</button>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="ImgContainer">
                                <img className="PostImg" src={post.image[details.currentImgIndex]} alt="PostImg"/>
                                {RenderImgNav()}
                            </div>
                        </div>


                        {Reservations(reservedHere, setReservedHere, postProfile, setPostProfile, debounce, setDebounce)}
                    </>
                    :<div>Loading</div>}
                </div>
            </div>
            <Footer/>
            <ReviewPopup />
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
