import React, {Component, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProfile.css"
import axios from "axios";

class ProfileForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            firstName: "",
            secondName: "",
            image: "",
            description: "",
            phoneNum: "",
            confirmed: true,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.DescChange = this.DescChange.bind(this);
        this.MobileChange = this.MobileChange.bind(this);
        this.FnameChange = this.FnameChange.bind(this);
        this.SnameChange = this.SnameChange.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        const AuthToken = localStorage.getItem("secondStageValidator")
        if (AuthToken  === null || AuthToken === undefined){
            this.setState({confirmed: false})
        }else{
            if (AuthToken !== token){
                this.setState({confirmed: false})
            }
        }
    }

    MobileChange(event){
        event.preventDefault()
        this.setState({phoneNum: event.target.value})
    }

    ImgSubmit(event) {
        
        event.preventDefault()
        let img = event.target.files[0];
        this.setState({image: "Loading"})

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
                this.setState({image: linkContainer})
                })
            }
    }

    ShowImgs() {
        return(
            <div className="PhotoAttachment">
                {this.state.image == "Loading"?
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
                    <img src={this.state.image} alt="image" key={this.state.image}/>
                    <div className="RemoveImage">
                        <button className="RemoveLabel" onClick={
                            (e) => {
                                e.preventDefault()
                                this.setState({image: ""})
                            }
                        } type="button">Remove Image</button>
                    </div>
                </>
                }
            </div>
        )
    }


    FnameChange(e){
        e.preventDefault();
        this.setState({firstName: e.target.value})
    }

    SnameChange(e){
        e.preventDefault();
        this.setState({secondName: e.target.value})
    }

    DescChange(event){
        event.preventDefault()
        this.setState({description: event.target.value})
    }


    handleSubmit(event) {
        event.preventDefault();

        const payload = {
            firstName: this.state.firstName,
            secondName: this.state.secondName,
            image:      this.state.image,
            description:this.state.description,
            phoneNum:   this.state.phoneNum,

        };

        const config = {
            headers:{
                'x-auth-token': localStorage.getItem("token")
            }
        };
        localStorage.removeItem("secondStageValidator")

        console.log(localStorage.getItem("token"));

        axios.post("http://localhost:8080/create-profile", payload, config)
        .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response.error);
            })

    }

    render(){
        return(
            <form className="ProfileForm" onSubmit={this.handleSubmit}>
                {this.state.confirmed?
                <>
                <div className="Flex-Wrapper">
                    <div className="Form-Wrapper">
                        <div className="FormTitle">
                            <label>Name</label>
                            <p>Please insert your name</p>
                        </div>
                        <div className="FormContent">
                            <input className="Name First" onChange={e => this.FnameChange(e)} required="required" placeholder="First Name"></input>
                            <input className="Name Second" onChange={e => this.SnameChange(e)} required="required" placeholder="Second Name"></input>
                        </div>
                    </div>
                    <div className="Form-Wrapper">
                        <div className="FormTitle">
                            <label>Description</label>
                        </div>
                        <div className="FormContent">
                            <textarea required="required" className="Description" onChange={e => this.DescChange(e)}
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
                            {this.state.image === "" ?
                                <div className="PhotoAttachment First">
                                    <label htmlFor="photo-attachment">Add image</label>
                                    <input type="file" id="photo-attachment" accept=".jpg, .jpeg, .png, .gif" onChange={e => this.ImgSubmit(e)}></input>
                                </div>
                            :
                                this.ShowImgs()
                            }
                        </div>
                    </div>
                    <div className="Form-Wrapper">
                        <div className="FormTitle">
                            <label>Mobile number</label>
                            <p>Add your mobile number so customers will have a way to contact you</p>
                        </div>
                        <div className="FormContent">
                            <input type="tel" required="required" pattern="^[0-9]{3,45}$" className="MobileNumber" onChange={e => this.MobileChange(e)}></input>
                        </div>
                    </div>
                </div>

                <div id="Continue-Button-Wrapper">
                    <button type="submit" id="Continue-Button">Create Account!</button>
                </div>
                </>
                :
                <a href="/">You already have a profile created or you wasn't redirected here </a>
                }
            </form>
        )
    }


}

export {ProfileForm}