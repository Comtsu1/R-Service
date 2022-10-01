import axios from "axios";
import React from 'react';
import { ContactList } from './ContactList';
import { MessagesPanel } from './MessagesPanel';
import "./Chat.css"
import { Header } from "../Home/Components/Header/Header";
import { Footer } from "../Home/Components/Footer";
import { BackendLink, checkToken } from "../../Refferences/RefferencesFile";
import socketIO from 'socket.io-client';
const socket = socketIO.connect(`${BackendLink}`);

export class Chat extends React.Component {

        fetchContactList() {
            axios.get(`${BackendLink}/contacts`, {
                headers:{"x-auth-token": localStorage.getItem("token")}
                })
                .then((res) => {
                    this.setState(prevState => ({
                        ...prevState,
                        contacts: res.data.users,
                        currentUser: res.data.currentUser
                    }))
                    socket.emit('newUser', {'userId': this.state.currentUser.userId})
                    console.log(res.data.currentUser)
                })
                .catch((err) => {
                    // TODO error handling
                });
        }

        fetchChatWithContact(contactId) {
            axios.get(`${BackendLink}/messages`, {
                headers:{"x-auth-token": localStorage.getItem("token")},
                params: {sender: contactId}
                })
                .then((res) => {
                    console.log(res.data)
                    this.setState(prevState => ({
                        ...prevState,
                        currentMessages: res.data
                    }))
                })
                .catch((err) => {
                    // TODO error handling
                });
        }

        componentDidMount() {
            this.fetchContactList();
            socket.on('message', (message) => {
                this.handleIncomingMessage(message)
            })
        }

        handleIncomingMessage(message) {
            console.log(this.state.currentUser.userId, this.state.currentContact)
            if ((message.sender == this.state.currentUser.userId && message.receiver == this.state.currentContact)
            || (message.receiver == this.state.currentUser.userId && message.sender == this.state.currentContact)) {
                const hasThisMessage = this.state.currentMessages.some(
                    element => {
                        if (element.id === message.id) {
                            return true;
                        }
                        
                        return false;
                    }
                )    
                if (!hasThisMessage) {
                    this.setState(prevState => ({
                        ...prevState,
                        currentMessages: [...this.state.currentMessages, message]
                    }))
                }
            } else {
                return;
            }
            
            
        }

        constructor() {
            super();
            this.state = {
                    contacts: [],
                    currentContact: "NONE",
                    CCname: "no one",
                    currentUser: {},
                    currentMessages: [],
                }
            };

        onContactChanged = (value) => {
            console.log(value.target)
            this.setState(prevState => ({
                ...prevState,
                currentContact: value.target.id,
                CCname: value.target.name,
            }))
            console.log(value.target.id)
            this.fetchChatWithContact(value.target.id)
        }
        render() {
            return (
                <div className="Chat">
                    <Header/>
                    <div className="Main-Content">
                        <ContactList 
                            contacts={this.state.contacts}
                            onContactChanged={this.onContactChanged}>
                        </ContactList>
                        <div className="Main-Chat">
                            <div className="CurrentChat">Currently chatting with {this.state.CCname}</div>
                            <MessagesPanel
                                currentContact={this.state.currentContact}
                                currentUser={this.state.currentUser}
                                messages={this.state.currentMessages}>
                            </MessagesPanel>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }