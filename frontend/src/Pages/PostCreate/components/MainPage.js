import React from "react"
import './MainPage.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';



class PostCreatePage extends React.Component{

    render(){
        return(
            <>
                <Header/>
                <div className='Main-Content'>
                    <div className="Wrapper">
                        <h2>Tell us about your bussiness!</h2>
                    </div>
                </div>
                <PostForm/>
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
    constructor(props){
        super(props)
        this.state = {
            imgs: [],
            title: "",
            description: "",
            location: "",
            mobile: "",
            price: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    ShowImgs() {
        const listItems = this.state.imgs.map((item) =>
            <div className="PhotoAttachment">
                <img src={item} alt="image"></img>
            </div>
        )
        return <>{listItems}</>
    }

    ImgSubmit(event) {
        event.preventDefault()

        console.log("Submitted img")
        // send request to get link for photo
        // callback (resposnse)
    }


    TitleChange(event){
        event.preventDefault()
        this.setState({title: event.target.value})
    }

    DescChange(event){
        event.preventDefault()
        this.setState({description: event.target.value})
    }

    LocationChange(event){
        event.preventDefault()
        this.setState({location: event.target.value})
    }

    MobileChange(event){
        event.preventDefault()
        this.setState({mobile: event.target.value})
    }

    PriceChange(event){
        event.preventDefault()
        this.setState({price: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        alert('submitted: ' + this.state);
    }

    render(){
        let numOfImgs = this.state.imgs.length;
        return(
            <form className="PostForm" onSubmit={this.handleSubmit}>
                <div className="Flex-Wrapper">
                    <div className="Form-Wrapper">
                        <div className="FormTitle">
                            <label>Title</label>
                            <p>Add a title for the bussiness so customers will now exactly what to expect.</p>
                        </div>
                        <div className="FormContent">
                            <input className="Title" onChange={e => this.TitleChange(e) }></input>
                        </div>
                    </div>
                    <div className="Form-Wrapper">
                        <div className="FormTitle">
                            <label>Description</label>
                        </div>
                        <div className="FormContent">
                            <textarea className="Description" onChange={e => this.DescChange(e)}
                            placeholder="Share a bit about the bussiness that you are selling, porjects you've completed, and area of expertise"
                            ></textarea>
                        </div>
                    </div>
                    {/* images */}
                    <div className="Form-Wrapper">
                        <div className="FormTitle">
                            <label>Images</label>
                            <p>Perhaps add some images, so customers know exactly what to expect</p>
                        </div>
                        <div className="FormContent">
                            {numOfImgs===0?
                            <div className="PhotoAttachment First">
                                <label for="photo-attachment">Add images</label>
                                <input type="file" id="photo-attachment" accept=".jpg, .jpeg, .png, .gif" onChange={e => this.ImgSubmit(e)}></input>
                            </div>
                            :<>
                                {this.ShowImgs()}
                                <div className="PhotoAttachment">
                                <label for="photo-attachment">+</label>
                                    <input type="file" id="photo-attachment" accept=".jpg, .jpeg, .png, .gif" onChange={e => this.ImgSubmit(e)}></input>
                                </div>
                            </>}
                        </div>
                    </div>
                    <div className="Form-Wrapper">
                        <div className="FormTitle">
                            <label>Location</label>
                            <p>Tell your location so you are not booked by a customer that is not in your area</p>
                        </div>
                        <div className="FormContent">
                            <input className="Location" onChange={e => this.LocationChange(e)}></input>
                        </div>
                    </div>
                    <div className="Form-Wrapper">
                        <div className="FormTitle">
                            <label>Mobile number</label>
                            <p>Add your mobile number so customers will have a way to contact you</p>
                        </div>
                        <div className="FormContent">
                            <input className="MobileNumber" onChange={e => this.MobileChange(e)}></input>
                        </div>
                    </div>
                    <div className="Form-Wrapper">
                        <div className="FormTitle">
                            <label>Cost</label>
                            <p>Lastly, choose a fair price for you services</p>
                        </div>
                        <div className="FormContent">
                            <input className="Price" onChange={e => this.PriceChange(e)}></input>
                        </div>
                    </div>
                </div>

                <div id="Continue-Button-Wrapper">
                    <button type="submit" id="Continue-Button">Add post!</button>
                </div>
            </form>
        )
    }


}
export {PostForm}