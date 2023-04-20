'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var TransactionSchema = Schema({
  description: String,
  amount: Number,
  category: String,
  date: Date,
} );

module.exports = mongoose.model( 'TransactionItem', TransactionSchema );