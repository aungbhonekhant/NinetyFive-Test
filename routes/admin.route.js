const { getAllUsers, getUser, updateUser, deleteUser, updateUserPost } = require('../controller/admin');
const ensureAuthenticatedLogin = require('connect-ensure-login');
const { userUpdateSchema } = require('../schema/userUpdateSchema');
const validateRequestSchema = require('../middleware/validate-request-schema');

const router = require('express').Router();


router.get('/users',ensureAuthenticatedLogin.ensureLoggedIn({redirectTo: '/auth/login'}), getAllUsers);

// router.post('/users',ensureAuthenticatedLogin.ensureLoggedIn({redirectTo: '/auth/login'}), getAllUsersPost);

router.get('/user/:id', ensureAuthenticatedLogin.ensureLoggedIn({redirectTo: '/auth/login'}), getUser);

router.get('/update-user/:id', ensureAuthenticatedLogin.ensureLoggedIn({redirectTo: '/auth/login'}), updateUser)

router.post('/update-user/:id', ensureAuthenticatedLogin.ensureLoggedIn({redirectTo: '/auth/login'}),userUpdateSchema, validateRequestSchema, updateUserPost)

router.post('/delete-user/:id', ensureAuthenticatedLogin.ensureLoggedIn({redirectTo: '/auth/login'}), deleteUser)


module.exports = router;