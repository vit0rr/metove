import { Meteor } from 'meteor/meteor';

import { ContactsCollection } from '../../db/ContactsCollection';

Meteor.publish('myContacts', function publishContacts() {
  const { userId } = this;
  if (!userId) {
    throw new Meteor.Error('Not authorized.');
  }

  return ContactsCollection.find({ userId });
});
