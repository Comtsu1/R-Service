import React from "react";
import './Footer.css';

class Footer extends React.Component{
    render(){
        return(
            <>
                <div className="FooterHitbox"></div>
                <div className={this.props.className? this.props.className:"Main-Footer"}></div>
            </>
        )
    }
}

export {Footer};
