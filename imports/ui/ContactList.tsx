import React from 'react';
import { useTracker } from "meteor/react-meteor-data";
import { ContactsCollection } from '../db/ContactsCollection';
import { Meteor } from 'meteor/meteor';

export const ContactList = () => {

    const { contacts, isLoading } = useTracker(() => {
        const noDataAvailable = { contacts: [] };

        const handler = Meteor.subscribe("contacts");
        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true }
        }

        const contacts = ContactsCollection.find().fetch();

        return { contacts };

    })

    return (
        <>
            <h3>Contact List</h3>
            {isLoading && <div>loading...</div>}

            {contacts.map((contact: { name: string; email: string; }) => (
                <li key={contact.email}>{contact.name} - {contact.email}</li>
            ))}
        </>
    )
}