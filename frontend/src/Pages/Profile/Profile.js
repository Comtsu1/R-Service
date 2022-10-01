import axios from "axios";
import { useEffect, useState } from "react"
import "./Profile.css"
import NoProfileImg from "./Components/user.png"
import {Header} from "../Home/Components/Header/Header";
import {Footer} from "../Home/Components/Footer";
import {BackendLink} from "../../Refferences/RefferencesFile"
import { useNavigate, Navigate } from 'react-router-dom';
import { Reservations } from "./Components/Reservations";

function Profile(){

    const navigate = useNavigate()
    const [profile, setProfile] = useState(null);
    const [PageDetails, setDetails] = useState({PostFocused: true, DescEditing: false, DescEdit: null})
    const [Services, setServices] = useState([])
    const [RentedServices, setRentedServices] = useState([])
    const [deboucnce, setDebounce] = useState(false);
    const [postProfile, setPostProfile] = useState({});

    
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
        axios.get(`${BackendLink}/profile`, {
            headers:{"x-auth-token": localStorage.getItem("token")}
            })
            .then((res) => {
                console.log("aa" + res.data.profile)
                setProfile(res.data.profile);
                setRentedServices(res.data.reservations_made);
                setServices(res.data.posts);
                if(res.data.profile.description === undefined){
                    setProfile(res.data.profile, {...profile, description: ""})
                }
                setDetails({...PageDetails, DescEdit: res.data.profile.description})
                var ReservationReq = [];
                res.data.reservations_made.map((value) =>{
                        ReservationReq.push(value)
                })
                console.log(ReservationReq, "a  ")
                setRentedServices(ReservationReq);

                ReservationReq.map(
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
            })
            .catch((err) => {
                // TODO error handling
            });
    }, [])

    function editDesc(){
        setDetails({...PageDetails, DescEditing: !PageDetails.DescEditing})
        if(PageDetails.DescEditing === true){
            setDetails({...PageDetails, DescEdit: profile.description ,DescEditing: !PageDetails.DescEditing})
        }
    }

    function RenderServices(){
        if (Services.length === 0){
            return(
            <div className="NoService">
                <label>You have no posts created</label>
            </div>
            )
        }
        const list = Services.map((value, key) => 
        <>
            
                <div key={key} className="Service">
                        <img className = "Image" src={value.image}></img>
                        <div className = "PostWrapper">
                            <a href={`/post?id=${value.postId}`}>

                                <label className="Title">{value.name}</label>
                            </a>
                            
                            <p className="Description">{value.description}
                                <div>
                                    <div className="Fader"></div>
                                </div>
                            </p>
                        </div>
                        <div className="Details">
                            <span className="Cost">{value.price}$</span>
                            <span className="Location">{value.location}</span>
                        </div>
                    </div>   
        
        </>
        )
        return <>{list}</>
    }
    function HandleDescSubmit(event){
        event.preventDefault()
        setDetails({...PageDetails, DescEditing:false})
    }

    function HandleDescChange(event){
        event.preventDefault()
        setProfile({...profile, description: event.target.value})
   
    }

    function RenderRentedServices(){
        if (RentedServices.length === 0){
            return(
            <div className="NoService">
                <label>You have no rented services</label>
            </div>
            )
        }else{
            
            return Reservations(RentedServices,setRentedServices, postProfile, setPostProfile, deboucnce, setDebounce)
        }
    }

    function OnDescEdit(event){
        event.preventDefault();
        setDetails({...PageDetails, DescEdit: event.target.value})
    }
    
    function SubmitDescriptionEdit(event){
        event.preventDefault();
        setProfile({...profile, description: PageDetails.DescEdit})
        setDetails({...PageDetails, DescEditing: false})

        const payload ={
            firstName: profile.firstName,
            secondName: profile.secondName,
            image:      profile.image,
            description:PageDetails.DescEdit,
            phoneNum:   profile.phoneNum,
        }

        const config = {
            headers:{
                'x-auth-token': localStorage.getItem("token")
            }
        };
        localStorage.removeItem("secondStageValidator")

        console.log(localStorage.getItem("token"));

        axios.post(`${BackendLink}/create-profile/modify`, payload, config)
    }

    function ChangeImage(event){
        event.preventDefault()

        let img = event.target.files[0];
        // ImgList.push("Loading")

        // send request to get link for photo
        if(img) {
            const fd = new FormData()
            fd.append('image', img)
            fd.append('key', "4af9c545bc82a3cd91982cd1549eb771")
            
            axios.post("https://api.imgbb.com/1/upload", fd)
            // callback (resposnse)
            .then ((res) => {
                const linkContainer = res;
                setProfile({...profile, image: linkContainer.data.data.url})

                //update the database
                const payload ={
                    firstName: profile.firstName,
                    secondName: profile.secondName,
                    image:      linkContainer.data.data.url,
                    description:profile.description,
                    phoneNum:   profile.phoneNum,
                }
        
                const config = {
                    headers:{
                        'x-auth-token': localStorage.getItem("token")
                    }
                };
                localStorage.removeItem("secondStageValidator")
        
                console.log(localStorage.getItem("token"));
        
                axios.post(`${BackendLink}/create-profile/modify`, payload, config)
                })
            }
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

    function GoBack() {
        navigate('/');
    }

    // Rendering
    return(
        <div className="Profile">
            <Header/>
            <div className="Main-Content">
                
                {profile ? 

                <div className="Wrapper">
                    <div className="Background">
                        <div className="ProfileBar">
                            <div className="ImgWrapper">
                                <div  type="file" className="ChangeImage" >
                                    <img className={profile.image?"ProfileImage":"NoProfileImage"} src={profile.image?profile.image:NoProfileImg} alt="profileImage"/>
                                    <div className="ChangeImgLabel">
                                        <label htmlFor={"ChngImg"} className="chngimglabel">Change<br/>image</label>
                                    </div>
                                    <input type={"file"} id="ChngImg" accept=".jpg, .jpeg, .png, .gif" onChange={(e) => ChangeImage(e)}></input>
                                </div>
                            </div>
                            <p className="ProfileName">{profile.firstName} {profile.secondName}</p>
                        </div>
                        <div className="ProfileDescription">
                            <div className="DescFlex"> 
                                <h2 className="ProfileDescLabel">Description</h2>
                                <button onClick={(e) => editDesc(e)}>Edit</button>
                            </div>
                            {PageDetails.DescEditing === false?
                            <p>
                                {profile.description}
                            </p>
                            :
                            <div className="DescEditWrapper">
                                <textarea className="ProfileDescriptionEdit" value={PageDetails.DescEdit} onChange={(e) => OnDescEdit(e)} >

                                </textarea>
                                <button className="SubmitDescriptionEdit" onClick={(e) => SubmitDescriptionEdit(e)}>Done</button>
                            </div>
                            }
                        </div>

                        <div className="ProfilePageMenu">
                            <div className="ServiceFocused">
                                <button className={PageDetails.PostFocused?"Focused":null} onClick={(e) => FocusPost(e)}>
                                    My Posts
                                </button>
                                {/* <div className={PageDetails.PostFocused?"Highlighter Focused":"Highlighter Unfocused"}/> */}
                            </div>
                            <div className="Divider"/>
                            <div className="ServiceUnfocused">
                                <button className={PageDetails.PostFocused?null:"Focused"} onClick={(e) => UnfocusPost(e)}>
                                    Rented Services
                                </button> 
                                {/* <div className={PageDetails.PostFocused?"Highlighter Unfocused":"Highlighter Focused"}/> */}

                            </div>
                        </div>

                        {PageDetails.PostFocused? RenderServices(): RenderRentedServices()}

                    </div>
                </div>

                :
                <div>data not loaded yet</div>
                // (<Navigate to="/" replace={true} />)
                }
            </div>
            <Footer/>
        </div>
    )
}

export {Profile}
