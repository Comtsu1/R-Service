import React from 'react';
import axios from "axios";
import { Message } from './Message';
import { BackendLink } from '../../Refferences/RefferencesFile';
export class MessagesPanel extends React.Component {

    constructor(props) {
        super(props);
        // currentContact
        // messages
        this.state = {
            inputValue: ''
        };
        this.reset();
    }

    sendMessageToCloud() {
        let data = {receiver: this.props.currentContact,
            message: this.state.inputValue,
            date: Date.now()}
        axios.post(`${BackendLink}/sendMessage`, data, {
            headers:{"x-auth-token": localStorage.getItem("token")}})
            .then((res) => {
                console.log("message sent", res)
            })
            .catch((err) => {
                // TODO error handling
            });
    }

    reset() {
        this.setState({
            inputValue: ''
        });
    }

    sendMessage = () => {
        console.log(this.props.currentContact !== "NONE")
        if(this.props.currentContact!== "NONE" && this.state.inputValue !== ""){
            console.log('Sending message:', this.state.inputValue)
            this.sendMessageToCloud();
            this.reset()
        }
    }

    updateInputValue(evt) {
        const val = evt.target.value;
        this.setState({
            inputValue: val
        });
    }

    render() {

        let list = <div className="no-content-message">There is no messages to show</div>;
        if (this.props.messages) {
            list = this.props.messages.map(m => <Message key={m.id} id={m.sender} senderName    ={m.senderName} text={m.message}>;</Message>)
        }
        return(
            <div className="messages-panel">
                <div className="meesages-list">{list}
                </div>
                <div className="messages-input">
                    <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} type="text"></input>
                    <button onClick={this.sendMessage}>Send</button>
                </div>

            </div>
            );
        }
}