import React from 'react';

export class Message extends React.Component {
    render() {
        return (
            <div className="message-item">
                <div><b>{this.props.senderName} - {this.props.date}</b></div>
                <span>{this.props.text}</span>
            </div>
        )
    }
}