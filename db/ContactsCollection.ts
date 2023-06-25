import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const ContactsCollection = new Mongo.Collection('contacts');

const ContactsSchema = new SimpleSchema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  imageUrl: {
    type: String,
    optional: true,
  },
  walletId: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  userId: {
    type: String,
  },
});

// @ts-ignore
ContactsCollection.attachSchema(ContactsSchema);
