import { useState } from "react"
import "./Profile.css"

function Profile(){



    // Rendering
    return(
        <div className="Profile">
            <div className="Main-Header"></div>
            <div className="Main-Content">
                <div className="Wrapper">
                    <div className="Background">
                        <div className="ProfileBar">
                            <div className="ImgWrapper">
                                <img className="ProfileImage" src="https://i.ibb.co/wdhr0HL/Capture.png"/>
                            </div>
                            <p className="ProfileName">Cortana Assistant</p>
                        </div>
                        <div className="ProfileDescription">
                            <h2 className="ProfileDescLabel">Description</h2>
                            <p>
                            Nulla elementum nunc id fringilla rhoncus. Nullam enim ex, imperdiet lobortis massa eu, 
                            bibendum convallis felis. Nulla sodales mauris vitae purus commodo, et dignissim urna consectetur. 
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt posuere scelerisque. 
                            Morbi ipsum leo, accumsan et placerat vitae, blandit vitae libero. Cras eleifend ligula diam, 
                            nec tincidunt velit gravida quis.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="Main-Footer"></div>
        </div>
    )
}

export {Profile}