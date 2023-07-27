const { ProfileRepository } = require('../repository/index')
const  UserService  = require('../services/user-service');
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
            if (error.name == 'AppError') {
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = ProfileService;