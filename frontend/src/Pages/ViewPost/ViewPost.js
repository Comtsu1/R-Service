import {Header} from "../../Pages/Home/Components/Header/Header"
import { Footer } from "../Home/Components/Footer";
import "./ViewPost.css"

function ViewPost(){

    const images=["https://i.ibb.co/3zwwr2B/Desert.jpg","https://i.ibb.co/C6PLcyf/Lighthouse.jpg"];

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
                            <img className="PostImg" src={images[0]} alt="PostImg"></img>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>

        </div>
    )
}
export {ViewPost}
