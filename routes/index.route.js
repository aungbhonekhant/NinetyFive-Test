const router = require('express').Router();
const ensureAuthenticatedLogin = require('connect-ensure-login')

const {Home} = require('../controller/main')

router.get('/',ensureAuthenticatedLogin.ensureLoggedIn({redirectTo: '/auth/login'}), Home);

module.exports = router;