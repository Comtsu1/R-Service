import axios from "axios";
import React, {useState} from "react";
import { BackendLink } from "../../../Refferences/RefferencesFile";
import './ReviewPopup.css'

function ReviewPopup({Close}) {

    const [rating, setRating] = useState(null);

    const Rate = (e, cnt) => {
        e.preventDefault();
        // console.log(cnt);
        setRating(cnt);
    }

    const Submit = (e) => {
        e.preventDefault();
        // axios.post(`${BackendLink}/something-todo-with-rating`)
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
                <button type="submit" className="submit-button" onClick={(e) => Submit(e)}>Submit</button>
                <button type="submit" className="cancel-button" onClick={(e) => Cancel(e)}>Close</button>
            </div>
        </div>
    );
}

export {ReviewPopup};