const express = require('express');
const router = express.Router();
const TransactionItem = require('../models/Transaction');

isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
}

router.get('/transaction/',
  isLoggedIn,
  async (req, res, next) => {
    let items = await TransactionItem.find({}).sort({date:1});
    res.render('Transaction',{items});
 });

router.post('/transaction',
  isLoggedIn,
  async (req, res, next) => {
    const transaction = new TransactionItem({
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
      date: new Date(req.body.date).toDateString()
    })
    await transaction.save();
    res.redirect('/transaction')
});

router.get('/transaction/remove/:itemId',
  isLoggedIn,
  async (req, res, next) => {
    console.log("inside /todo/remove/:itemId")
    await TransactionItem.deleteOne({_id:req.params.itemId});
    res.redirect('/transaction')
});

router.get('/transaction/editTransaction/:itemId',
  isLoggedIn,
  async (req, res, next) => {
    console.log("inside /transaction/editTransaction/:itemId")
    const item = await TransactionItem.findById(req.params.itemId);
    res.locals.item = item;
    res.render('editTransaction');
});

router.post('/transaction/updateTransaction',
  isLoggedIn,
  async (req, res, next) => {
    const {itemId,description,amount,category} = req.body;
    console.log("inside /transaction/updateTransaction/:itemId");
    await TransactionItem.findOneAndUpdate(
      {_id:itemId},
      {$set: {description,amount,category}} );
    res.redirect('/transaction')
});

module.exports = router;
