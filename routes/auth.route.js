const router = require('express').Router();
const {userRegSchema, userLoginSchema} = require('../schema/userSchema');
const ensureAuthenticatedLogin = require('connect-ensure-login')
const {
    Login,
    Register,
    LoginPost,
    RegisterPost,
    LogOut
} = require('../controller/auth');
const validateRequestSchema = require('../middleware/validate-request-schema');

router.get('/login', ensureAuthenticatedLogin.ensureLoggedOut({redirectTo: '/'}), Login);
router.post('/login', ensureAuthenticatedLogin.ensureLoggedOut({redirectTo: '/'}), userLoginSchema, validateRequestSchema, LoginPost);
router.get('/register', ensureAuthenticatedLogin.ensureLoggedOut({redirectTo: '/'}),  Register)
router.post('/register', ensureAuthenticatedLogin.ensureLoggedOut({redirectTo: '/'}),  userRegSchema, validateRequestSchema, RegisterPost);
router.get('/logout', ensureAuthenticatedLogin.ensureLoggedIn({redirectTo: '/auth/login'}), LogOut);


module.exports = router;