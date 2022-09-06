import React from "react";
import './Profile.css';
import { useNavigate } from "react-router-dom";



// class Profile extends React.Component{

function Profile() {
    // temporary

    const nav = useNavigate();

    const Logout = () => {
        localStorage.removeItem("token");
        console.log("logged out");
        nav('/');
        window.location.reload();
    }

        return(
            <aside className="Dropdown-Profile">
                <div className="Profile-Menu-Holder">
                    <div className="Profile-Placeholder">
                        <label className="Profile-Placeholder-Text">Placeholder Image</label>

                    </div>
                    <div className="ProfileWrapper">
                        <ul className="Profile-Menu">
                            <li><a href="/create_post">Create Post</a></li>
                            <li><a href="/profile">Profile</a></li>
                            <li><a>Messages</a></li>
                            <li className="Divider"></li>
                            <li onClick={Logout} className="Log-Out">Logout</li>
                            <li className="Divider"></li>
                        </ul>
                    </div>
                </div>
            </aside>
        );
}

export {Profile}
