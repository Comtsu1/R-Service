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
        
        console.log("UrlList", this.state.imgs)
        const listItems = this.state.imgs.map((item) =>
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
                    :<img src={item} alt="image"m key={item}></img>
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
                                <option value={"AB"}>Alba</option>
                                <option value={"AR"}>Arad</option>
                                <option value={"AG"}>Arges</option>
                                <option value={"BC"}>Bacau</option>
                                <option value={"BH"}>Bihor</option>
                                <option value={"BN"}>Bistrita-Nasaud</option>
                                <option value={"BT"}>Botosani</option>
                                <option value={"BR"}>Braila</option>
                                <option value={"BV"}>Brasov</option>
                                <option value={"B"}>Bucharest</option>
                                <option value={"BZ"}>Buzau</option>
                                <option value={"CL"}>Calarasi</option>
                                <option value={"CS"}>Caras-Severin</option>
                                <option value={"CJ"}>Cluj</option>
                                <option value={"CT"}>Constanta</option>
                                <option value={"CV"}>Covasna</option>
                                <option value={"DB"}>Dambovita</option>
                                <option value={"DJ"}>Dolj</option>
                                <option value={"GL"}>Galati</option>
                                <option value={"GR"}>Giurgiu</option>
                                <option value={"GJ"}>Gorj</option>
                                <option value={"HR"}>Harghita</option>
                                <option value={"HD"}>Hunedoara</option>
                                <option value={"IL"}>Ialomita</option>
                                <option value={"IS"}>Iasi</option>
                                <option value={"IF"}>Ilfov</option>
                                <option value={"MM"}>Maramures</option>
                                <option value={"MH"}>Mehedinti</option>
                                <option value={"MS"}>Mures</option>
                                <option value={"NT"}>Neamt</option>
                                <option value={"OT"}>Olt</option>
                                <option value={"PH"}>Prahova</option>
                                <option value={"SJ"}>Salaj</option>
                                <option value={"SM"}>Satu Mare</option>
                                <option value={"SB"}>Sibiu</option>
                                <option value={"SV"}>Suceava</option>
                                <option value={"TR"}>Teleorman</option>
                                <option value={"TM"}>Timis</option>
                                <option value={"TL"}>Tulcea</option>
                                <option value={"VL"}>Valcea</option>
                                <option value={"VS"}>Vaslui</option>
                                <option value={"VN"}>Vrancea</option>
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