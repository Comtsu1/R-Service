import React from "react";
import './Profile.css';
import { useNavigate } from "react-router-dom";



// class Profile extends React.Component{

function Profile({icon}) {
    // temporary

    const nav = useNavigate();

    const Logout = () => {
        localStorage.removeItem("token");
        console.log("logged out");
        nav('/');
        window.location.reload();
    }
    console.log(icon)

        return(
            <aside className="Dropdown-Profile">
                <div className="Profile-Menu-Holder">
                    <div className="Profile-Placeholder">
                        {icon?
                        <img src={icon} alt="profileIcon"/>
                        :
                        <label className="Profile-Placeholder-Text">Înlocuitor Imagine</label>
                        }

                    </div>
                    <div className="ProfileWrapper">
                        <ul className="Profile-Menu">
                            <li><a href="/create_post">Adaugă o Postare</a></li>
                            <li><a href="/profile">Profil</a></li>
                            <li><a href="/chat">Mesaje</a></li>
                            <li className="Divider"></li>
                            <li onClick={Logout} className="Log-Out">Deconectare</li>
                            <li className="Divider"></li>
                        </ul>
                    </div>
                </div>
            </aside>
        );
}

export {Profile}
