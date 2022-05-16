const User = require("../Models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@desc register user
//@route POST api/v1/auth/register
//@access Public
exports.registerUser = async (req, res, next) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res
                .status(422)
                .json({ success: false, message: "All input is required" });
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res
                .status(409)
                .json({ success: false, message: "User Already Exist. Please Login" });
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "24h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        return res.status(201).json({ success: true, user });
    } catch (err) {
        console.log(err);
    }
};

//@desc login users
//@route POST api/v1/auth/login
//@access Public
exports.loginUser = async (req, res, next) => {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res
                .status(422)
                .json({ success: false, message: "All input required" });
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "24h",
                }
            );

            // save user token
            user.token = token;

            // user
            return res.status(200).json({ success: true, user });
        }
        return res
            .status(401)
            .json({ success: false, message: "Invalid Credentials" });
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
};