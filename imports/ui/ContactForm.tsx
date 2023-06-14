import React from 'react';
import { Meteor } from 'meteor/meteor';

export const ContactForm = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');

    const clearForm = () => {
        setName('');
        setEmail('');
        setImageUrl('');
    }

    const saveContact = () => {
        Meteor.call("contacts.insert", name, email, imageUrl)

        clearForm();
    }

    return (
        <form>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id='name'
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    type="text" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id='email'
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    type="email" />
            </div>
            <div>
                <label htmlFor="imageUrl">image URL</label>
                <input
                    id='imageUrl'
                    value={imageUrl}
                    onChange={(e) => { setImageUrl(e.target.value) }}
                    type="text" />
            </div>
            <div>
                <button type='button' onClick={saveContact}>Save Contact</button>
            </div>
        </form>
    )
}
