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
                axios.get(`${BackendLink}/profile/${value.from}`).then(
                    (res)=> {
                        obj[value._id] = {
                            Fname: res.data.profile.firstName,
                            Sname: res.data.profile.secondName,
                            image: [res.data.profile.image? res.data.profile.image: ""],
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
                                <label> From </label>
                                <div className="IncomingProfileWrapper">
                                    {postProfile[value._id].image[0]?
                                        <img src={ postProfile[value._id].image} />
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
                                    {value.status === "În așteptare"?
                                    <>
                                        <button className="IncomingResBtn" id="Accept" 
                                        onClick={(e) => acceptReq(e, value)}
                                        
                                        >Acceptă</button>
                                        <div className="BtnDivider"></div>
                                        <button className="IncomingResBtn" id="Decline"
                                        onClick={(e) => declineReq(e, value)}
                                        >Refuză</button>
                                    </>
                                        :
                                        [value.status]
                                    }
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