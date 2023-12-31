import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ADD_TYPE, TRANSFER_TYPE, TransactionsCollection } from '../../db/TransactionsCollection';

Meteor.methods({
  'transactions.insert'(args) {
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const schema = new SimpleSchema({
      isTransferring: {
        type: Boolean,
      },
      sourceWalletId: {
        type: String,
      },
      destinationContactId: {
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

    const { isTransferring, sourceWalletId, destinationContactId, amount } = args;

    TransactionsCollection.insert({
      type: isTransferring ? TRANSFER_TYPE : ADD_TYPE,
      sourceWalletId,
      destinationContactId: isTransferring ? destinationContactId : null,
      amount,
      createdAt: new Date(),
      userId,
    });
  },

  'transactions.remove'(transactionId: string) {
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TransactionsCollection.remove(transactionId);
  },
});
