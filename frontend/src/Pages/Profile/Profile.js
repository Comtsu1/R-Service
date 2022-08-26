import { useState } from "react"
import "./Profile.css"

function Profile(){
    const Services = [
        // {"id123": 
        // {
        //     "Imagine": "https://i.ibb.co/wdhr0HL/Capture.png",
        //     "Nume": "Cortana Services",
        //     "Descriptie": 
        //     "Lorem ipsum dolor sit amet Quisque in venenatis nibh, faucibus convallis diam. Aliquam erat volutpat. Nullam elementum turpis id dolor bibendum, sed venenatis quam porta. Nunc tristique non leo sit amet luctus. Sed placerat quam ac sapien iaculis sodales. Maecenas iaculis molestie risus, eget mollis nunc ullamcorper ac. Quisque lacus tellus, malesuada vitae nunc convallis, mollis maximus justo. Aenean rutrum libero et quam ornare, ac vestibulum sem tincidunt. Mauris dapibus mattis elit at faucibus. Praesent in commodo ipsum. In porttitor nisl non molestie tempus. Donec neque ipsum, maximus non turpis at, congue fringilla ipsum. Etiam vel auctor eros. Donec rutrum metus eget sem accumsan, sed fermentum metus cursus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        //     "Locatie": "B",
        //     "Cost": 169,
        // }},
        // {"id124": 
        // {
        //     "Imagine": "https://i.ibb.co/wdhr0HL/Capture.png",
        //     "Nume": "Cortana Services",
        //     "Descriptie": "Lorem ipsum dolor sit amet",
        //     "Locatie": "B",
        //     "Cost": 169,
        // }}
    ];

    const RentedServices = [
        // {"id125": 
        // {
        //     "Imagine": "https://i.ibb.co/rvbm0J9/ShibaInu.png",
        //     "Nume": "Dodge Services",
        //     "Descriptie": 
        //     "Lorem ipsum dolor sit amet Quisque in venenatis nibh, faucibus convallis diam. Aliquam erat volutpat. Nullam elementum turpis id dolor bibendum, sed venenatis quam porta. Nunc tristique non leo sit amet luctus. Sed placerat quam ac sapien iaculis sodales. Maecenas iaculis molestie risus, eget mollis nunc ullamcorper ac. Quisque lacus tellus, malesuada vitae nunc convallis, mollis maximus justo. Aenean rutrum libero et quam ornare, ac vestibulum sem tincidunt. Mauris dapibus mattis elit at faucibus. Praesent in commodo ipsum. In porttitor nisl non molestie tempus. Donec neque ipsum, maximus non turpis at, congue fringilla ipsum. Etiam vel auctor eros. Donec rutrum metus eget sem accumsan, sed fermentum metus cursus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        //     "Locatie": "B",
        //     "Cost": 169,
        // }},
        // {"id126": 
        // {
        //     "Imagine": "https://i.ibb.co/rvbm0J9/ShibaInu.png",
        //     "Nume": "Dodge Services",
        //     "Descriptie": "Lorem ipsum dolor sit amet",
        //     "Locatie": "B",
        //     "Cost": 169,
        // }}
    ];

    const [PageDetails, setDetails] = useState({PostFocused: true})

        

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
            </div>
            <div className="Main-Footer"></div>
        </div>
    )
}

export {Profile}