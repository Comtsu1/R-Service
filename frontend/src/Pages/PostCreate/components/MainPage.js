import React from "react"
import './MainPage.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";



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
        const listItems = this.state.imgs.map((item, index) =>
            <div className="PhotoAttachment">
                {item == "Loading"?
                <>
                    <div class="loader">
                        <div class="loader-inner">
                            <div class="loader-line-wrap">
                                <div class="loader-line"></div>
                            </div>
                            <div class="loader-line-wrap">
                                <div class="loader-line"></div>
                            </div>
                            <div class="loader-line-wrap">
                                <div class="loader-line"></div>
                            </div>
                            <div class="loader-line-wrap">
                                <div class="loader-line"></div>
                            </div>
                            <div class="loader-line-wrap">
                                <div class="loader-line"></div>
                            </div>
                        </div>
                        <div className="ShadowLoader">
                                <div class="loader-inner">
                                    <div class="loader-line-wrap">
                                        <div class="loader-line"></div>
                                    </div>
                                    <div class="loader-line-wrap">
                                        <div class="loader-line"></div>
                                    </div>
                                    <div class="loader-line-wrap">
                                        <div class="loader-line"></div>
                                    </div>
                                    <div class="loader-line-wrap">
                                        <div class="loader-line"></div>
                                    </div>
                                    <div class="loader-line-wrap">
                                        <div class="loader-line"></div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </>
                :
                <>
                    <img src={item} alt="image"m key={item}/>
                    <div className="RemoveImage">
                        <button className="RemoveLabel" onClick={
                            (e) => {
                                e.preventDefault()
                                const arr = this.state.imgs
                                const deleted = arr.splice(index, 1)
                                this.setState({imgs: arr})
                            }
                        } type="button">Remove Image</button>
                    </div>
                </>
                }
            </div>
        )
        return <>{listItems}</>
    }

    ImgSubmit(event) {
        
        event.preventDefault()
        let img = event.target.files[0];
        var ImgList = this.state.imgs
        ImgList.push("Loading")
        this.setState({imgs: ImgList})

        // send request to get link for photo
        var dataUrl
        if(img) {
            const fd = new FormData()
            fd.append('image', img)
            fd.append('key', "4af9c545bc82a3cd91982cd1549eb771")
            
            axios.post("https://api.imgbb.com/1/upload", fd)
            // callback (resposnse)
            .then ((res) => {
                const linkContainer = res;
                ImgList.pop()
                ImgList.push(linkContainer.data.data.url)
                this.setState({imgs: ImgList})
                })
            }
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
        console.log(event.target.value)
    }

    MobileChange(event){
        event.preventDefault()
        this.setState({mobile: event.target.value})
    }

    PriceChange(event){
        event.preventDefault()
        event.target.value = Math.abs(event.target.value)
        this.setState({price: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        const payload = {
            name: this.state.title,
            description: this.state.description,
            location: this.state.location,
            phoneNum: this.state.mobile,
            price: this.state.price,
            author: "a mystery",
            category: "to be added",
            image: this.state.imgs
        };

        const config = {
            headers:{
                'x-auth-token': localStorage.getItem("token")
            }
        };

        console.log(localStorage.getItem("token"));

        axios.post("http://localhost:8080/add-post", payload, config)
        .then((res) => {
                alert('submitted: ' + this.state);
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response.error);
            })

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
                            <input className="Title" onChange={e => this.TitleChange(e)} required="required"></input>
                        </div>
                    </div>
                    <div className="Form-Wrapper">
                        <div className="FormTitle">
                            <label>Description</label>
                        </div>
                        <div className="FormContent">
                            <textarea required="required" className="Description" onChange={e => this.DescChange(e)}
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
                        <div className="FormContent" id="ImgFormContent">
                            {numOfImgs===0?
                            <div className="PhotoAttachment First">
                                <label for="photo-attachment">Add images</label>
                                <input type="file" id="photo-attachment" accept=".jpg, .jpeg, .png, .gif" onChange={e => this.ImgSubmit(e)}></input>
                            </div>
                            :<>
                                {this.ShowImgs()}
                                <div className="PhotoAttachment" id="addCard">
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
                            {/* <input className="Location" onChange={e => this.LocationChange(e)}></input> */}
                            <select className="Location" onChange={e => this.LocationChange(e)} required="required">
                                <option value={"Alba"}>Alba</option>
                                <option value={"Arad"}>Arad</option>
                                <option value={"Arges"}>Arges</option>
                                <option value={"Bacau"}>Bacau</option>
                                <option value={"Bihor"}>Bihor</option>
                                <option value={"Bistrita-Nasaud"}>Bistrita-Nasaud</option>
                                <option value={"Botosani"}>Botosani</option>
                                <option value={"Braila"}>Braila</option>
                                <option value={"Brasov"}>Brasov</option>
                                <option value={"Bucharest"}>Bucharest</option>
                                <option value={"Buzau"}>Buzau</option>
                                <option value={"Calarasi"}>Calarasi</option>
                                <option value={"Caras-Severin"}>Caras-Severin</option>
                                <option value={"Cluj"}>Cluj</option>
                                <option value={"Constanta"}>Constanta</option>
                                <option value={"Covasna"}>Covasna</option>
                                <option value={"Dambovita"}>Dambovita</option>
                                <option value={"Dolj"}>Dolj</option>
                                <option value={"Galati"}>Galati</option>
                                <option value={"Giurgiu"}>Giurgiu</option>
                                <option value={"Gorj"}>Gorj</option>
                                <option value={"Harghita"}>Harghita</option>
                                <option value={"Hunedoara"}>Hunedoara</option>
                                <option value={"Ialomita"}>Ialomita</option>
                                <option value={"Iasi"}>Iasi</option>
                                <option value={"Ilfov"}>Ilfov</option>
                                <option value={"Maramures"}>Maramures</option>
                                <option value={"Mehedinti"}>Mehedinti</option>
                                <option value={"Mures"}>Mures</option>
                                <option value={"Neamt"}>Neamt</option>
                                <option value={"Olt"}>Olt</option>
                                <option value={"Prahova"}>Prahova</option>
                                <option value={"Salaj"}>Salaj</option>
                                <option value={"Satu Mare"}>Satu Mare</option>
                                <option value={"Sibiu"}>Sibiu</option>
                                <option value={"Suceava"}>Suceava</option>
                                <option value={"Teleorman"}>Teleorman</option>
                                <option value={"Timis"}>Timis</option>
                                <option value={"Tulcea"}>Tulcea</option>
                                <option value={"Valcea"}>Valcea</option>
                                <option value={"Vaslui"}>Vaslui</option>
                                <option value={"Vrancea"}>Vrancea</option>
                            </select>
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
                    <div className="Form-Wrapper">
                        <div className="FormTitle">
                            <label>Cost</label>
                            <p>Lastly, choose a fair price for you services</p>
                        </div>
                        <div className="FormContent">
                            <input type="number" min="0" className="Price" required="required" onChange={e => this.PriceChange(e)}></input>
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