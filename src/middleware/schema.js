import { Schema, arrayOf } from 'normalizr';

const balanceSchema = new Schema('balances', { idAttribute: 'id'});

export const Schemas = {
  BALANCE: balanceSchema,
  BALANCE_ARRAY: arrayOf(balanceSchema)
};
