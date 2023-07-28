const { ProfileService } = require('../services/index');

const profileService = new ProfileService();

const createProfile = async (req, res) => {
    try {
        const token = req.body.token;
        const response = await profileService.createProfile(token, {
            name: req.body.name,
            programming_languages: req.body.programming_languages,
            interests: req.body.interests,
            location: req.body.location,
            avatar: req.body.avatar,
            bio: req.body.bio,
            additional_fields: req.body.additional_fields
        });
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new profile',
            data: response,
            err: {}
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went while creating profile',
            data: {},
            success: false,
            err: error
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        const token = req.body.token;
        const response = await profileService.updateProfile(token, req.body.updateProfileDetail);
        return res.status(201).json({
            success: true,
            message: 'Successfully updated a profile',
            data: response,
            err: {}
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went while updating profile',
            data: {},
            success: false,
            err: error
        })
    }
}

module.exports = {
    createProfile,
    updateProfile
}