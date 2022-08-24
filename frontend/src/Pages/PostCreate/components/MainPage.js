import React from "react"
import './MainPage.css'



class PostCreatePage extends React.Component{
    render(){
        return(
            <>
                <Header/>
                <div className='Main-Content'>
                    <div className="Wrapper">
                        <h2>Tell us about your bussiness!</h2>
                        <PostForm/>
                    </div>
                </div>
            </>
        )
    }
}





// ==============Components================================================================== \\

class Header extends React.Component{

    render(){
        return(
            <div className='Main-Header'></div>
        )
    }
}

class Footer extends React.Component{
    render(){
        return(
            <div className="Main-Footer"></div>
        )
    }
}
export {PostCreatePage}


class PostForm extends React.Component{
    render(){
        return(
            <form className="PostForm">
                <div className="Flex-Wrapper">
                    <div className="Form-Wrapper">
                        <div className="FormTitle">
                            <label>Title</label>
                            <p>Add a title for the bussiness so customers will now exactly what to expect.</p>
                        </div>
                        <div className="FormContent">
                            <input className="Title"></input>
                        </div>
                    </div>
                    <div className="Form-Wrapper">
                        <div className="FormTitle">
                            <label>Description</label>
                        </div>
                        <div className="FormContent">
                            <textarea className="Description"
                            placeholder="Share a bit about the bussiness that you are selling, porjects you've completed, and area of expertise"
                            ></textarea>
                        </div>
                    </div>
                    <div className="Form-Wrapper">
                        <div className="FormTitle">
                            <label>Location</label>
                            <p>Tell your location so you are not booked by a customer that is not in your area</p>
                        </div>
                        <div className="FormContent">
                            <input className="Location"></input>
                        </div>
                    </div>
                </div>
                <div id="Continue-Button-Wrapper">
                    <button type="button" id="Continue-Button">Continue</button>
                </div>
            </form>
        )
    }


}