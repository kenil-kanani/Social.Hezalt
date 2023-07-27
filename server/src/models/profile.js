const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required.'],
        unique: true
    },
    programming_languages: [
        {
            language: {
                type: String,
                required: true,
            },
            skill_level: {
                type: String,
                enum: ['Beginner', 'Intermediate', 'Advanced'],
                required: true,
            },
        },
    ],
    interests: {
        type: Array,
        required: [false, 'Interests are optional'],
        default: [],
    },
    location: {
        type: String,
        required: [false, 'Location field can be empty'],
        trim: true,
        maxlength: 200,
        minlength: 1,
    },
    avatar: {
        type: String,
    },
    bio: {
        type: String,
        maxlength: 500,
        minlength: 3
    },
    additional_fields: {
        github_username: {
            type: String,
        },
        linkedin_profile: {
            type: String
        },
        favorite_framework: {
            type: Array,
        },
        years_of_experience: {
            type: String,
            required: true
        }
    }

});

const ProfileModel = mongoose.model('profiles', profileSchema);
module.exports = ProfileModel;