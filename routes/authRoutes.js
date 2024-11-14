

// const express=require('express')
// const { registerController } = require('../controllers/authControllers')

// const router=express.Router()
// router.post('/register',registerController)
// router.post('/register',registerController)


// module.exports=router




const express = require("express");
const { registerController,loginController,currentUserController } = require('../controllers/authControllers');
const authMiddelware = require("../middlewares/authMiddelware");

// const authMiddelware = require("../middlewares/authMiddelware");
// const authMiddelware =require('../middlewares/authMiddelware')
const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//GET CURRENT USER || GET
router.get("/current-user", authMiddelware,currentUserController);

module.exports = router;
