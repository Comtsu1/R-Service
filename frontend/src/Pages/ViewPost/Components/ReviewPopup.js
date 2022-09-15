import React, {useState} from "react";
import './ReviewPopup.css'

function ReviewPopup() {

    return (
        <div className="Popup">
            <div className="star-wrapper">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
            </div>
        </div>
    );
}

export {ReviewPopup};