const { AppError } = require('../utils/errors/index');
const { StatusCodes } = require('http-status-codes');
const ProfileModel = require('../models/profile');

class ProfileRepository {
    async createProfile(profileData) {
        try {
            const profile = new ProfileModel(profileData);
            await profile.save();
            console.log("Profile",profile)
            return profile;
        } catch (error) {
            throw new AppError(
                'RepositoryError',
                'Not able to crete Profile',
                'Something went wrong with creating user profile , come back again',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}

module.exports = ProfileRepository;