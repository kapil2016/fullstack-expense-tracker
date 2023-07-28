const express = require('express')
const router = express.Router();
const expenseController = require('../controllers/expenses')

router.get('/',expenseController.getAllExpenses)
router.post('/',expenseController.createNewExpense)
router.delete('/:id',expenseController.deleteExpense)
router.put('/:id',expenseController.updateExpense)




module.exports = router ;