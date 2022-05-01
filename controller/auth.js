const User = require("../models/user.modal");
const passport = require('passport');
const Department = require("../models/department");


const Login = async (req, res) => {
    res.render('login')
}

/** 
* @description register page
* @render register.ejs file
* @return 
*/
const Register = async (req, res, next) => {
    try {
        const depatrments = await Department.find();
        res.render('register', {depatrments})
    } catch (error) {
        next(error);
    } 
   
}


/** 
* @description User login
* @render profile.ejs file
* @return 
*/
const LoginPost = 
    passport.authenticate(
        'local', 
        {
            // successRedirect: "/",
            successReturnToOrRedirect: '/',
            failureRedirect: "/auth/login",
            failureFlash: true
        }
    )


/** 
* @description Rgister user || insert user
* @render login.ejs file
* @return success message with flash()
*/
const RegisterPost =  async (req, res, next) => {
    try {
        const {email} = req.body;
        const userExist = await User.findOne({email});

        if(userExist){
            req.flash('danger', `${user.email} already registered`)
            res.redirect('/auth/register');
        }

        const user = await User.create(req.body);
        req.flash('success', `${user.email} registered successfually, you can now login`)
        res.redirect('/auth/login')
        // const token = user.createJWT();
        // res.send(user);
    } catch (error) {
        next(error)
    }
    
}

const LogOut = async (req, res) => {
    req.logout();
    res.redirect('/auth/login');
}


module.exports = {
    Login,
    Register,
    LoginPost,
    RegisterPost,
    LogOut
}