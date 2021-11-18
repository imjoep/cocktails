const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  glass: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  ingredients: {
    unit: String,
    amount: Number,
    ingredient: String,
    label: String,
    special: String,
    required: false
  },
  garnish: {
    type: String,
    required: false
  },
  preparation: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//module.exports = Item = mongoose.model('item', ItemSchema);
module.exports = Cocktails = mongoose.model('cocktail', ItemSchema);