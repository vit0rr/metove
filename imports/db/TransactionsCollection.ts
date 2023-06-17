import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const TransactionsCollection = new Mongo.Collection('transactions');

export const TRANSFER_TYPE = 'TRANSFER';
export const ADD_TYPE = 'ADD';

const TransactionsSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: [TRANSFER_TYPE, ADD_TYPE],
  },
  sourceWalletId: {
    type: String,
  },
  destinationWalletId: {
    type: String,
    optional: true,
  },
  amount: {
    type: Number,
    min: 1,
  },
  createdAt: {
    type: Date,
  },
});

// @ts-ignore
TransactionsCollection.attachSchema(TransactionsSchema);
