const express = require('express');
const { addTransaction, getAllTransanction, editTransaction, deleteTransaction } = require('../controllers/transactionCtrl');


//router object
const router = express.Router()

//routes
//add transaction post
router.post('/add-transaction', addTransaction)

//edit transaction post
router.post('/edit-transaction', editTransaction)

//delet transaction post
router.post('/delete-transaction', deleteTransaction)

//get transactions
router.post('/get-transaction', getAllTransanction)

module.exports = router;