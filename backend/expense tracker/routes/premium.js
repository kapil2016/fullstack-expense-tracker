const express = require('express')
const router = express.Router();
const premium = require('../controllers/premium') ;
const userAuth = require('../utility/midilewares/authanticate')
router.get('/leaderboard',userAuth.authanticate , premium.getLeaderBoard) ;
router.get('/compare' , userAuth.authanticate ,premium.getCategory );
router.get('/expense-report' , userAuth.authanticate , premium.getExpenseReport);
router.get('/downloads',userAuth.authanticate,premium.getDownloads)


module.exports = router ;