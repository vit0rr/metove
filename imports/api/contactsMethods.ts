import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "../db/ContactsCollection";

Meteor.methods({
    "contacts.insert"(name: string, email: string, imageUrl: string) {
        ContactsCollection.insert({
            name,
            email,
            imageUrl,
        })
    },
})