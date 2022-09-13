import axios from "axios";
import React from 'react';
import { ContactList } from './ContactList';
import { MessagesPanel } from './MessagesPanel';
import "./Chat.css"
import { Header } from "../Home/Components/Header/Header";
import { Footer } from "../Home/Components/Footer";
import { BackendLink } from "../../Refferences/RefferencesFile";


export class Chat extends React.Component {

        fetchContactList() {
            axios.get(`${BackendLink}/contacts`, {
                headers:{"x-auth-token": localStorage.getItem("token")}
                })
                .then((res) => {
                    this.setState(prevState => ({
                        ...prevState,
                        contacts: res.data
                    }))
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
        }

        constructor() {
            super();
            this.state = {
                    contacts: [],
                    currentContact: "NONE",
                    currentMessages: []
                }
            };

        onContactChanged = (value) => {
            this.setState(prevState => ({
                ...prevState,
                currentContact: value.target.id
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
                            <div className="CurrentChat">Current chat = {this.state.currentContact}</div>
                            <MessagesPanel
                                currentContact={this.state.currentContact}
                                messages={this.state.currentMessages}>
                            </MessagesPanel>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }