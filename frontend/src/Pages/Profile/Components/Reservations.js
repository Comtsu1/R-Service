import axios from "axios";
import React from "react"; 
import "./Reservations.css";
import {BackendLink} from "../../../Refferences/RefferencesFile";

function Reservations(reservation, setReservations, postProfile, setPostProfile, debounce, setDebounce){  //imported the variable from where it renders so no more errors
    if(debounce === false){
        reservation.map(
            (value) =>{
                
                const obj = postProfile;
                setDebounce(true);
                axios.get(`${BackendLink}/post/${value.postId}`).then(
                    (res)=> {
                        obj[value._id] = {
                            image: [res.data.postToShow[0].image[0]? res.data.postToShow[0].image[0]: ""],
                        }

                        setPostProfile(obj)
                    }
                )   
            }
        )
    }

    function acceptReq(e, value){
        e.preventDefault()
        axios.post(`${BackendLink}/reservation/accept`,{
            _id: value._id
        },
        {
            headers:{"x-auth-token": localStorage.getItem("token")}
        })

        const obj = reservation.map((val) =>
        {
            if(val._id == value._id){
                val.status = "Acceptat";
            }
            return val
        });
        setReservations(obj)
    }

    function declineReq(e, value){
        axios.post(`${BackendLink}/reservation/decline`,{
            _id: value._id
        },
        {
            headers:{"x-auth-token": localStorage.getItem("token")}
        })

        const obj = reservation.map((val) =>
        {
            if(val._id == value._id){
                val.status = "Refuzat";
            }
            return val
        });
        setReservations(obj)
    }


    function renderReservations(){
        const listOfReservations = reservation.map(
            (value) => 
                <div className="ReservationCard" key= {value._id} >
                    {
                        postProfile[value._id]?
                        <>
                            <div className="IncomingReservationWrapper">
                                <label> At </label>
                                <div className="IncomingProfileWrapper">
                                    {postProfile[value._id].image[0]?
                                        <>
                                            <img src={ postProfile[value._id].image} />
                                            <div className="Discover">
                                                <a href={`/post?id=${value.postId}`}>
                                                    <div className="DiscoverButton">Discover More</div>
                                                </a>
                                            </div>
                                        </>
                                    :null
                                    }
                                    
                                </div>
                                <div className="Name">
                                    <span className="FName">{postProfile[value._id].Fname}</span>
                                    <span className="SName">{postProfile[value._id].Sname}</span>
                                </div>
                            </div>
                            <div className="IncomingReservationWrapper">
                                <div className="Date">
                                    <span>{"On "}</span>
                                    <span>{value.date.day}/</span>
                                    <span>{value.date.month}/</span>
                                    <span>{value.date.year}</span>
                                </div>
                                <div className="IncomingReservationWrapper Btn">
                                        {value.status}
                                </div>
                            </div>
                        </>
                        :
                        null
                    }
                    
                </div>

        )
        
        return listOfReservations

    }

    


    return( 
        <>
            <div className="Reservations">
                {renderReservations()}
            </div> 
        </>
    )
}

export {Reservations}