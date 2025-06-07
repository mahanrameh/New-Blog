const express = require("express");
const passport = require("passport");
const authController = require("./../controllers/authController");
const registerSchema = require("./../validators/registerValidator");
const loginSchema = require("./../validators/loginValidator");
const varlidate = require("./../middlewares/validate");


const router = express.Router();



router
    .route('/register')
    .post(varlidate(registerSchema), authController.register);

    
router
    .route('/login')
    .post(
        varlidate(loginSchema), 
        passport.authenticate('local',{session: false}), 
        authController.login);






module.exports = router;