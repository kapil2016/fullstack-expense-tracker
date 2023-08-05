const express = require('express')
const router = express.Router();
const premium = require('../controllers/premium') ;
const userAuth = require('../utility/midilewares/authanticate')
router.get('/leaderboard',userAuth.authanticate , premium.getLeaderBoard) ;
router.get('/compare' , userAuth.authanticate ,premium.getCategory )


module.exports = router ;