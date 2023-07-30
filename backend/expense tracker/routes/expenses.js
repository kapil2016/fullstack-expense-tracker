const express = require('express')
const router = express.Router();
const expenseController = require('../controllers/expenses')
const authanticateUser = require('../utility/midilewares/authanticate')

router.get('/',authanticateUser.authanticate ,expenseController.getAllExpenses)
router.post('/',authanticateUser.authanticate ,expenseController.createNewExpense)
router.delete('/:id',authanticateUser.authanticate ,expenseController.deleteExpense)
router.put('/:id',authanticateUser.authanticate ,expenseController.updateExpense)




module.exports = router ;