var express=require('express');
var router=express.Router();
var candController=require('../controller/candController')

router.post("/register",candController.register);
router.post("/score",candController.score);
router.post('/averageandtotal',candController.averageAndTotal);
router.get('/details',candController.getDetails);
router.get('/highest',candController.getHighest);

module.exports=router;