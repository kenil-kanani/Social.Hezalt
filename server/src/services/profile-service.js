const { ProfileRepository } = require('../repository/index')
const UserService = require('../services/user-service');
const { ServiceError } = require('../utils/errors/index');

class ProfileService {
    constructor() {
        this.profileRepository = new ProfileRepository();
        this.userService = new UserService();
    }

    async createProfile(token, profileDetail) {
        try {
            const user_id = await this.userService.isAuthenticated(token);
            profileDetail = { ...profileDetail, user_id };
            const profile = await this.profileRepository.createProfile(profileDetail);
            return profile;
        } catch (error) {
            if (error.name == 'RepositoryError') {
                throw error;
            }
            throw new ServiceError();
        }
    }

    async updateProfile(token, updateProfileDetail) {
        try {
            const user_id = await this.userService.isAuthenticated(token);
            const updatedProfile = this.profileRepository.updateProfile(user_id, updateProfileDetail);
            return updatedProfile;
        } catch (error) {
            if (error.name == 'RepositoryError') {
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = ProfileService;