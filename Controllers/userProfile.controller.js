const UserProfile = require("../Models/userProfile.model");

//@desc create user profile
//@route POST api/v1/user-profile
//@access Private
exports.createUser = async (req, res, next) => {
    try {
        const payload = req.body;
        console.log(req.body)
        const userProfile = await UserProfile.create(payload);
        res.status(201).json({
            success: true,
            data: userProfile,
        });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

//@desc get single user profile
//@route POST api/v1/user-profile/:id
//@access Private
exports.getUserProfile = async (req, res, next) => {
    try {
        const userProfile = await UserProfile.find({email: req.user.email} );
        console.log(req.user)
        res.status(200).json({
            success: true,
            data: userProfile,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
        });
    }
};