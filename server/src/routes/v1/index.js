const express = require('express');
const router = express.Router();

const { UserController, ProfileController } = require('../../controllers/index')

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

router.post(
    '/createprofile',
    ProfileController.createProfile
)

module.exports = router;