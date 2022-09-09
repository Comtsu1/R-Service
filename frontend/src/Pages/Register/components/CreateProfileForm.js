import React, {Component, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProfile.css";
import axios from "axios";
import {BackendLink} from "../../../Refferences/RefferencesFile";

//class ProfileForm extends React.Component{
function ProfileForm() {

    const [profile, setProfile] = useState({
            firstName: "",
            secondName: "",
            image: "",
            description: "",
            phoneNum: "",
            confirmed: true,
    }); 
    let navigate = useNavigate();

    const componentDidMount = () => {
        const token = localStorage.getItem("token");
        const AuthToken = localStorage.getItem("secondStageValidator")
        if (AuthToken  === null || AuthToken === undefined){
            setProfile({...profile, confirmed: false})
        }else{
            if (AuthToken !== token){
                setProfile({...profile, confirmed: false})
            }
        }
    }

    const MobileChange = (event) => {
        event.preventDefault()
        setProfile({...profile, phoneNum: event.target.value})
    }

    const ImgSubmit = (event) => {
        
        event.preventDefault()
        let img = event.target.files[0];
        setProfile({...profile, image: "Loading"})

        // send request to get link for photo
        var dataUrl
        if(img) {
            const fd = new FormData()
            fd.append('image', img)
            fd.append('key', "4af9c545bc82a3cd91982cd1549eb771")
            
            axios.post("https://api.imgbb.com/1/upload", fd)
            // callback (resposnse)
            .then ((res) => {
                const linkContainer = res.data.data.url;
                setProfile({...profile, image: linkContainer})
                })
            }
    }

    const ShowImgs = () => {
        return(
            <div className="PhotoAttachment">
                {profile.image == "Loading"?
                <>
                    <div className="loader">
                        <div className="loader-inner">
                            <div className="loader-line-wrap">
                                <div className="loader-line"></div>
                            </div>
                            <div className="loader-line-wrap">
                                <div className="loader-line"></div>
                            </div>
                            <div className="loader-line-wrap">
                                <div className="loader-line"></div>
                            </div>
                            <div className="loader-line-wrap">
                                <div className="loader-line"></div>
                            </div>
                            <div className="loader-line-wrap">
                                <div className="loader-line"></div>
                            </div>
                        </div>
                        <div className="ShadowLoader">
                                <div className="loader-inner">
                                    <div className="loader-line-wrap">
                                        <div className="loader-line"></div>
                                    </div>
                                    <div className="loader-line-wrap">
                                        <div className="loader-line"></div>
                                    </div>
                                    <div className="loader-line-wrap">
                                        <div className="loader-line"></div>
                                    </div>
                                    <div className="loader-line-wrap">
                                        <div className="loader-line"></div>
                                    </div>
                                    <div className="loader-line-wrap">
                                        <div className="loader-line"></div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </>
                :
                <>
                    <img src={profile.image} alt="image" key={profile.image}/>
                    <div className="RemoveImage">
                        <button className="RemoveLabel" onClick={
                            (e) => {
                                e.preventDefault()
                                setProfile({...profile, image: ""})
                            }
                        } type="button">Remove Image</button>
                    </div>
                </>
                }
            </div>
        )
    }


    const FnameChange = (e) => {
        e.preventDefault();
        setProfile({...profile, firstName: e.target.value})
    }

    const SnameChange = (e)=> {
        e.preventDefault();
        setProfile({...profile, secondName: e.target.value})
    }

    const DescChange = (event) => {
        event.preventDefault()
        setProfile({...profile, description: event.target.value})
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            firstName:  profile.firstName,
            secondName: profile.secondName,
            image:      profile.image,
            description:profile.description,
            phoneNum:   profile.phoneNum,
        };

        const config = {
            headers:{
                'x-auth-token': localStorage.getItem("token")
            }
        };
        localStorage.removeItem("secondStageValidator")

        console.log(localStorage.getItem("token"));

        axios.post(`${BackendLink}/create-profile`, payload, config)
        .then((res) => {
                console.log(res);
                navigate('/');
            })
            .catch((err) => {
                console.log(err.response.error);
            })

    }

    return(
        <form className="ProfileForm" onSubmit={handleSubmit}>
            {profile.confirmed?
            <>
            <div className="Flex-Wrapper">
                <div className="Form-Wrapper">
                    <div className="FormTitle">
                        <label>Name</label>
                        <p>Please insert your name</p>
                    </div>
                    <div className="FormContent">
                        <input className="Name First" onChange={e => FnameChange(e)} required="required" placeholder="First Name"></input>
                        <input className="Name Second" onChange={e => SnameChange(e)} required="required" placeholder="Second Name"></input>
                    </div>
                </div>
                <div className="Form-Wrapper">
                    <div className="FormTitle">
                        <label>Description</label>
                    </div>
                    <div className="FormContent">
                        <textarea required="required" className="Description" onChange={e => DescChange(e)}
                        placeholder="Tell us about you, and cool stuff like porjects you've completed and area of expertise"
                        ></textarea>
                    </div>
                </div>
                {/* images */}
                <div className="Form-Wrapper">
                    <div className="FormTitle">
                        <label>Image</label>
                        <p>Add an image to your profile so customers know exactly who they're dealing with</p>
                    </div>
                    <div className="FormContent" id="ImgFormContent">
                        {profile.image === "" ?
                            <div className="PhotoAttachment First">
                                <label htmlFor="photo-attachment">Add image</label>
                                <input type="file" id="photo-attachment" accept=".jpg, .jpeg, .png, .gif" onChange={e => ImgSubmit(e)}></input>
                            </div>
                        :
                            ShowImgs()
                        }
                    </div>
                </div>
                <div className="Form-Wrapper">
                    <div className="FormTitle">
                        <label>Mobile number</label>
                        <p>Add your mobile number so customers will have a way to contact you</p>
                    </div>
                    <div className="FormContent">
                        <input type="tel" required="required" pattern="^[0-9]{3,45}$" className="MobileNumber" onChange={e => MobileChange(e)}></input>
                    </div>
                </div>
            </div>

            <div id="Continue-Button-Wrapper">
                <button type="submit" id="Continue-Button">Create Account!</button>
            </div>
            </>
            :
            <a href="/">You already have a profilecreated or you wasn't redirected here </a>
            }
        </form>
    )

}

export {ProfileForm}