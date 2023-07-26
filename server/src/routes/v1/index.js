const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user-controller')

router.post(
    '/signup',
    UserController.createUser
);

router.post(
    '/signin',
    UserController.signIn
);

router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
);

router.get(
    '/verify',
    UserController.activateAccount
);

router.patch(
    '/changepassword',
    UserController.changePassword
)

module.exports = router;