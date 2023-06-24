import { Meteor } from 'meteor/meteor';
import { WalletsCollection } from '/db/WalletsCollection';

Meteor.publish('wallets', function publishWallets() {
  return WalletsCollection.find();
});
