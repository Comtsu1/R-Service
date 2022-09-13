import React from 'react';
import { Contact } from './Contact';
export class ContactList extends React.Component {

    handleClick(value) {
        console.log(value.target.id);
        this.props.onContactChanged(value.target.id)
    }

    render() {

        let list = `There is no contacts to show`;
        if (this.props.contacts) {            
            list = this.props.contacts.map(c => <Contact key={c.sender} id={c.sender} name={c.senderName} onClick={this.props.onContactChanged}></Contact>);
        }
        return (
            <div className='ContactList'>
                {list}
            </div>
            );
        }
    }