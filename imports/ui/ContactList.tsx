import React from 'react';
import { useTracker } from "meteor/react-meteor-data";
import { ContactsCollection } from '../db/ContactsCollection';

export const ContactList = () => {
    const { contacts } = useTracker(() => {
        const contacts = ContactsCollection.find().fetch();
        
        return { contacts }
    })

    console.log("fon", contacts)

    return (
        <>
            <h3>Contact List</h3>
            {contacts.map(contact => (
                <li>{contact.name} - {contact.email}</li>
            ))}
        </>
    )
}