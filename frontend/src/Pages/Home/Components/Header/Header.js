import React from "react";
import logo from '../../Icons/RServiceLogo_transparent.png';
import './Header.css';
import {Profile} from './Profile_Bar/Profile.js';
import {Navigate} from "react-router-dom";
import axios from "axios";
import {BackendLink} from "../../../../Refferences/RefferencesFile"
import notifIcon from "../../Icons/bell_white.png";
import {Notifications} from "./Profile_Bar/Notifications.js"


class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:'',
            redirect: false,
            first: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        const url = window.location.href.split('?')[0]
        console.log(url.search("search"))
        // search function here
        event.preventDefault()
        // if(url.search("search") === -1){
            if(this.state.first == true){
                // return <Navigate to={`/search?srch=${this.state.value}`} replace={true}/> 
                // this.setState({redirect: true})
                window.location.replace(`/search?srch=${this.state.value}`)
                // window.location.reload()
            }
        // }
    }


    componentDidMount(){
        if(!this.state.first){
            this.setState({first: true})
        }
    }

    render(){
        
        
        return(
            <>
                <form onSubmit = {this.handleSubmit}>
                    <input className="searchbarInput" type="text" value={this.state.value} onChange={this.handleChange} placeholder = "caută" onSubmit={this.handleSubmit}/>
                </form>
                { 
                
                    this.state.redirect && <Navigate to={`/search?srch=${this.state.value}`} replace={true}/>   
                

                }
            </>
        );
    }
}


class UserUtility extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            UserName: 'Conectat ca',
            UserIcon: null,
            NotifIsOpen: false,
            ProfileIsOpen: false,
        }
    }

    OpenProfile= () => {
        this.setState({ProfileIsOpen: !this.state.ProfileIsOpen});
    }

    openNotif= () =>{
        this.setState({NotifIsOpen: !this.state.NotifIsOpen});
    }

    componentDidMount(){
        axios.get(`${BackendLink}/profile`, {headers:{"x-auth-token": localStorage.getItem("token")}
    }).then((res) => {
        this.setState({UserName: `${res.data.profile.firstName} ${res.data.profile.secondName}`, UserIcon: res.data.profile.image})
    })
    }

    render(){
        // if(this.state.UserName){
        if(localStorage.getItem('token') !== null) {

            var ProfileVar = null;
            var NotifVar = null;
            if(this.state.NotifIsOpen){
                NotifVar = <Notifications/>;
            }
            if(this.state.ProfileIsOpen){
                ProfileVar = <Profile icon={this.state.UserIcon} />;
            }else{
                ProfileVar = null;
            }
    
            return(
                <>
                    <div className="UserUtil">
                        <button id="Notifications" className="UserUtil-Group" onClick={this.openNotif}>
                            <img src={notifIcon} alt="NotifIcon"/>
                        </button>
                        {NotifVar}
                    </div>

                    <div className="UserUtil">
                        <button id='Profile' className="UserUtil-Group" 
                        onClick={this.OpenProfile}>
                            {
                                this.state.UserIcon?
                                <img src={this.state.UserIcon} alt="ProfileImage"/>
                                :
                                <label id='ProfileText'>U</label>
                            }
                        </button>
                        {ProfileVar}
                    </div>
                    <label className="UserName">{this.state.UserName}</label>
                </>
            )
        }else{
            return(
                <>
                    <div className="UserUtil">
                        <a href="login">
                            <button id='LoginButton'>Intră în cont</button>
                        </a>
                    </div>
                    <div className="UserUtil">
                        <a href="register">
                            <button id='SignUpButton'>înregistrează-te</button>
                        </a>
                    </div>
                </>
            )
        }


    }

}


class Header extends React.Component{

    nav(path){
        // this.history.push(path)
    }

    render(){
        return(
            <div className='Main-Header'>
                <div className="ie Left">
                    <div id = 'ie7'>
                        <div id='topBannerLogo-placeholder' onClick={this.nav("/")}>
                            <a href="/">
                                <img src={logo} alt='logo transparent' id='BannerLogo'></img>
                            </a>
                        </div>
                    </div>
                    <div id = 'searchBar-placeholder'>
                        <SearchBar/>
                    </div>
                </div>
                <div className="ie Right">
                    <UserUtility/>
                </div>
            </div>
        );


    }
};

export {Header};
