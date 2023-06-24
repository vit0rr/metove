import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ADD_TYPE, TRANSFER_TYPE, TransactionsCollection } from '/db/TransactionsCollection';

Meteor.methods({
  'transactions.insert'(args) {
    const schema = new SimpleSchema({
      isTransferring: {
        type: Boolean,
      },
      sourceWalletId: {
        type: String,
      },
      destinationWalletId: {
        type: String,
        optional: !args.isTransferring,
      },
      amount: {
        type: Number,
        min: 1,
      },
    });

    const cleanArgs = schema.clean(args);
    schema.validate(cleanArgs);

    const { isTransferring, sourceWalletId, destinationWalletId, amount } = args;

    TransactionsCollection.insert({
      type: isTransferring ? TRANSFER_TYPE : ADD_TYPE,
      sourceWalletId,
      destinationWalletId: isTransferring ? destinationWalletId : null,
      amount,
      createdAt: new Date(),
    });
  },
});
