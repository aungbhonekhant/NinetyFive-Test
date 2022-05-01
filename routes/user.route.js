const router = require('express').Router();
const { Profile } = require('../controller/user');
const ensureAuthenticatedLogin = require('connect-ensure-login')

router.get('/profile',ensureAuthenticatedLogin.ensureLoggedIn({redirectTo: '/auth/login'}), Profile);

module.exports = router;