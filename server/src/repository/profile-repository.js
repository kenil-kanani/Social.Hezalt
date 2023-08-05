const { AppError } = require('../utils/errors/index');
const { StatusCodes } = require('http-status-codes');
const ProfileModel = require('../models/profile');

class ProfileRepository {
    async createProfile(profileData) {
        try {
            const profile = new ProfileModel(profileData);
            await profile.save();
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

    async updateProfile(userId, updateProfileData) {
        try {
            const updatedProfile = ProfileModel.updateOne({ user_id: userId }, updateProfileData);
            console.log(updatedProfile);
            console.log(updateProfileData);
            return updatedProfile;
        } catch (error) {
            throw new AppError(
                'RepositoryError',
                'Not able to update Profile',
                'Something went wrong with updating user profile , come back again',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}

module.exports = ProfileRepository;