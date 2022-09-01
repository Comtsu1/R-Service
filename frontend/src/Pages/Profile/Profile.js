import axios from "axios";
import { useEffect, useState } from "react"
import "./Profile.css"

function Profile(){

    const [profile, setProfile] = useState(null);
    const [PageDetails, setDetails] = useState({PostFocused: true})
    const [Services, setServices] = useState([])
    const [RentedServices, setRentedServices] = useState([])
    
    function WordCount(str) { 
        return str.split(" ").length;
      }

    function descModifier(str){
        var desc = null
        if(WordCount(str)>30){
            var totalSoFar = 30;
            var currentLetter = 0;
            while (totalSoFar >0){
                if (str[currentLetter] === " "){
                    totalSoFar -= 1;
                }
                currentLetter += 1;
            }
            desc = str.substring(0,currentLetter).concat(" ...")
        }else{
            desc = str
        }
        return desc
    }

    useEffect(() => {
        axios.get("http://localhost:8080/profile", {
            headers:{"x-auth-token": localStorage.getItem("token")}
            })
            .then((res) => {
                setProfile(res.data.profile);
                setRentedServices(RentedServices, [...RentedServices, res.data.reservations]);
                setServices(Services, [...Services, res.data.posts]);
                console.log(Services);
                console.log("no you" + RentedServices);
            })
            .catch((err) => {
                // TODO error handling
            });
    }, [])

    function RenderServices(){

        if (Services.length === 0){
            return(
            <div className="NoService">
                <label>You have no posts created</label>
            </div>
            )
        }
        const list = Services.map((value) => 
        <>
            {
                Object.entries(value).map(([key, value]) =>
                    <div key={key} className="Service">
                        <img className = "Image" src={value.image}></img>
                        <div className = "PostWrapper">
                            <label className="Title">{value.firstName} {value.secondName}</label>
                            
                            <p className="Description">{value.description}</p>
                        </div>
                        <div className="Details">
                            <span className="Cost">{value.cost}$</span>
                            <span className="Location">{value.location}</span>
                            <div>
                                <div className="Fader"></div>
                            </div>
                        </div>
                    </div>   
                )
            }
        </>
        )
        return <>{list}</>
    }

    function RenderRentedServices(){
        if (RentedServices.length === 0){
            return(
            <div className="NoService">
                <label>You have no rented services</label>
            </div>
            )
        }
        const list = RentedServices.map((value) => 
        <>
        {
            Object.entries(value).map(([key, value]) =>
                <div key={key} className="Service">
                    <img className = "Image" src={value.Imagine}></img>
                    <div className = "PostWrapper">
                        <label className="Title">{value.Nume}</label>
                        
                        <p className="Description">{value.Descriptie}</p>
                    </div>
                    <div className="Details">
                        <span className="Cost">{value.Cost}$</span>
                        <span className="Location">{value.Locatie}</span>
                        <div>
                            <div className="Fader"></div>
                        </div>
                    </div>
                </div>   
            )
        }
        </>)
        return <>{list}</>
    }

    function FocusPost(event)
    {
        event.preventDefault()
        setDetails({...PageDetails, PostFocused: true})
    }

    function UnfocusPost(event)
    {
        event.preventDefault()
        setDetails({...PageDetails, PostFocused: false})
    }

    // Rendering
    return(
        <div className="Profile">
            <div className="Main-Header"></div>
            <div className="Main-Content">
                
                {profile ? 

                <div className="Wrapper">
                    <div className="Background">
                        <div className="ProfileBar">
                            <div className="ImgWrapper">
                                <img className="ProfileImage" src={profile.image}/>
                            </div>
                            <p className="ProfileName">{profile.firstName} {profile.secondName}</p>
                        </div>
                        <div className="ProfileDescription">
                            <h2 className="ProfileDescLabel">Description</h2>
                            <p>
                            {profile.description}
                            </p>
                        </div>

                        <div className="ProfilePageMenu">
                            <div className="ServiceFocused">
                                <button onClick={(e) => FocusPost(e)}>
                                    My Posts
                                </button>
                                <div className={PageDetails.PostFocused?"Highlighter Focused":"Highlighter Unfocused"}/>
                            </div>
                            <div className="Divider"/>
                            <div className="ServiceUnfocused">
                                <button onClick={(e) => UnfocusPost(e)}>
                                    Rented Services
                                </button> 
                                <div className={PageDetails.PostFocused?"Highlighter Unfocused":"Highlighter Focused"}/>

                            </div>
                        </div>

                        {PageDetails.PostFocused? RenderServices(): RenderRentedServices()}

                    </div>
                </div>

                :
                // data not loaded yet
                <div className="fuck-all"></div>
                }
            </div>
            <div className="Main-Footer"></div>
        </div>
    )
}

export {Profile}
