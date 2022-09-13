import React from 'react';
export class Contact extends React.Component {
    render() {
        return (
            <div className='Contact'>
                <button id={this.props.id} onClick={this.props.onClick}>{this.props.name}</button>
            </div>
        )
    }
}