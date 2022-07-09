import React from "react";
import logo from '../Icons/RServiceLogo_transparent.png';
import bell from '../Icons/bell.png';
import bellNotif from '../Icons/bell_notification.png';
import msg from '../Icons/email_small.png';
import msgNotif from '../Icons/email_small_unread.png';
import menu from '../Icons/menu.png';
import './Header.css';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:'',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        // search function here
        alert('a search has been made \n'+ this.state.value)
        event.preventDefault();
    }


    render(){

        return(
            <form onSubmit = {this.handleSubmit}>
                <input className="searchbarInput" type="text" value={this.state.value} onChange={this.handleChange} placeholder = "search" onSubmit={this.handleSubmit}/>
            </form>
        );
    }
}


class UserUtility extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            UserName: '',
            UserIcon: null,
            Notifications: 0,
            UnreadMsg: 0,
        }
    }

    render(){
        return(
            <>
                <div className="UserUtil">
                    <div id='Profile' className="UserUtil-Group">
                        <label id='ProfileText'>U</label>
                    </div>
                </div>
                <div className="UserUtil">
                    <div id='Notifications' className="UserUtil-Group">
                        <img src={this.state.Notifications>0?bellNotif:bell} alt='Notification Icon'></img>
                    </div>
                </div>
                <div className="UserUtil">
                    <div id='Messages' className="UserUtil-Group">
                        <img src={this.state.UnreadMsg>0?msgNotif:msg} alt='Message Icon'></img>
                    </div>
                </div>
                <div className="UserUtil">
                    <div id='Menu' className="UserUtil-Group">
                        <img src={menu}alt='Menu Icon'></img>
                    </div>
                </div>
            </>
        )
    }

}



class Header extends React.Component{

    render(){
        return(
            <div className='Main-Header'>
                <div className="ie Left">
                    <div id = 'ie7'>
                        <div id='topBannerLogo-placeholder'>
                            <img src={logo} alt='logo transparent' id='BannerLogo'></img>
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
