const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Registration Process
router.post("/register", async (request, response) => {
    const newUser = new User({
        username: request.body.username,
        email: request.body.email,
        password: CryptoJS.AES.encrypt(request.body.password, process.env.SECRET_KEY).toString()
    });

    try {
        const user = await newUser.save();

        response
            .status(201)
            .json(user);
    } catch (err) {
        response
            .status(500)
            .json(err);
    } 
});

// Login Process
router.post("/login", async (request, response) => {
    try {
        const user = await User.findOne({
            email: request.body.email
        });

        ! user && response.status(401).json("Wrong password or username!");

        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);   

        originalPassword !== request.body.password && 
            response.status(401).json("Wrong password or username!");
        
        // JWT Token Generation
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            }, 
                process.env.JWT_SECRET_KEY, 
            {
                expiresIn: "3d"
            }
        );

        const {password, ...info}  = user._doc;

        response
            .status(200)
            .json({...info, accessToken});    
    } catch(err) {
        response
            .status(500)
            .json(err)
    } 
});

module.exports = router;