import axios from "axios";
import React from 'react';
import { ContactList } from './ContactList';
import { MessagesPanel } from './MessagesPanel';


export class Chat extends React.Component {

        fetchContactList() {
            axios.get("http://localhost:8080/contacts", {
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
            axios.get("http://localhost:8080/messages", {
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
                <div className="chat-app">
                    <div>Current chat = {this.state.currentContact}</div>
                    <ContactList 
                        contacts={this.state.contacts}
                        onContactChanged={this.onContactChanged}></ContactList>
                    <MessagesPanel
                        currentContact={this.state.currentContact}
                        messages={this.state.currentMessages}>
                    </MessagesPanel>
                </div>
            );
        }
    }