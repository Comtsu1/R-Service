import axios from "axios";
import React, {useState} from "react";
import { BackendLink } from "../../../Refferences/RefferencesFile";
import './ReviewPopup.css'

function ReviewPopup({Close}) {

    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState("");

    const Rate = (e, cnt) => {
        e.preventDefault();
        if(cnt === rating) setRating(0);
        setRating(cnt);
    }

    const Submit = (e) => {
        e.preventDefault();

        const payload = {
            rating: rating,
            commnet: comment
        };     

        const config = {
            'x-auth-token': localStorage.getItem('token')
        };

        if(config["x-auth-token"] == null) return;
        axios.post(`${BackendLink}/review`, payload, config)
            .then((res) => {
                alert("Review made!")
                Cancel();
            })
            .catch((err) => {
                // handle error 
            })
    }

    const Cancel = (e) => {
        e.preventDefault();
        Close();
    }

    return (
        <div className="Popup-Background">
            <div className="Popup" id="popup">
                <p className="rating-text">How would you rate your experience?</p>
                <div className="star-wrapper">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    {/* <span className={rating <== 5 ? "fa fa-star focused": "fa fa-star"} ></span> */}
                    <span className={rating >= 5 ? "fa fa-star focused" : "fa fa-star"} onClick={(e) => Rate(e, 5)}></span>
                    <span className={rating >= 4 ? "fa fa-star focused" : "fa fa-star"} onClick={(e) => Rate(e, 4)}></span>
                    <span className={rating >= 3 ? "fa fa-star focused" : "fa fa-star"} onClick={(e) => Rate(e, 3)}></span>
                    <span className={rating >= 2 ? "fa fa-star focused" : "fa fa-star"} onClick={(e) => Rate(e, 2)}></span>
                    <span className={rating >= 1 ? "fa fa-star focused" : "fa fa-star"} onClick={(e) => Rate(e, 1)}></span>
                </div>
                {rating > 0 ?
                <div className="comment-wrapper">
                    <textarea className="comment-area" onChange={(e) => {setComment(e.target.value)}}></textarea>
                </div>
                :
                null    
                }
                <button type="submit" className="submit-button" onClick={(e) => Submit(e)}>Submit</button>
                <button type="submit" className="cancel-button" onClick={(e) => Cancel(e)}>Close</button>
            </div>
        </div>
    );
}

export {ReviewPopup};