const User = require("../model/User");
const bcrypt = require("bcryptjs");
require("dotenv").config()

exports.newAccount = async (req, res) => {
    try {
        // Destructure fields from the request body
        // console.log("New Account created : ", req.body);

        const {
            username,
            email,
            password,
        } = req.body
        // Check if All Details are there or not
        if (
            !username ||
            !email ||
            !password
        ) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            })
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists.",
            })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        //make an entry of new user in the database
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        })

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        })
    } catch (error) {
        console.log("error in account")
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        })
    }
}