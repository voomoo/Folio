const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String
    },
    name: {
        type: String,
        required: [true, "User must have a name"],
        minLength: [3, "Name must have at least 3 characters"]
    },
    title: {
        type: String
    },
    email: {
        type: String,
        required: [true, "User must have an email"],
        unique: [true, "This email already exists, please login"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ],
    },
    phone: {
        type: String
    },
    about: {
        type: String
    },
    address: {
        type: String
    },
    linkedIn: {
        type: String
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    },
    portfolio: {
        type: String
    },
    educations: [{
        instituteName: {
            type: String
        },
        from: {
            type: Date
        },
        to: {
            type: Date
        },
        department: {
            type: String
        },
        cgpa: {
            type: Number
        }
    }],
    works: [{
        instituteName: {
            type: String
        },
        from: {
            type: Date
        },
        to: {
            type: Date
        },
        position: {
            type: String
        },
        description: {
            type: String
        },
        currentlyWorking: {
            type: Boolean,
            default: false
        }
    }],
    skills: [{
        name: {
            type: String
        },
        proficiency: {
            type: String
        },
        description: {
            type: String
        }
    }],
    languages: [{
        name: {
            type: String
        },
        proficiency: {
            type: String
        },
        description: {
            type: String
        }
    }],
});

module.exports = mongoose.model("UserProfile", ProfileSchema);