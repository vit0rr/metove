import { Meteor } from 'meteor/meteor';
import { WalletsCollection } from '/imports/db/WalletsCollection';

Meteor.publish('wallets', function publishWallets() {
  return WalletsCollection.find();
});
