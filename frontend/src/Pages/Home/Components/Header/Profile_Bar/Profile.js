import React from "react";
import './Profile.css';

class Profile extends React.Component{
    render(){
        return(
            <aside className="Dropdown-Profile">
                <div className="Profile-Menu-Holder">
                    <div className="Profile-Placeholder">
                        <label className="Profile-Placeholder-Text">Placeholder Image</label>

                    </div>
                    <div className="Wrapper">
                        <ul className="Profile-Menu">
                            <li>option1</li>
                            <li>option2</li>
                            <li>option3</li>
                            <li>option4</li>
                            <li className="Divider"></li>
                        </ul>
                    </div>
                </div>
            </aside>
        )
    }
}

export {Profile}
