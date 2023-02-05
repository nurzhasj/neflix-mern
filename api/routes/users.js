const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const response = require("express");
const verify = require("../verifyToken");

// Update
router.put("/:id", verify, async (request, response) => {
    if (request.user.id === request.params.id || request.user.isAdmin) {
        if (request.body.password) {
            request.body.password = CryptoJS.AES.encrypt(
                request.body.password,
                process.env.SECRET_KEY
            ).toString();
        }

        try {
            const updateUser = await User.findByIdAndUpdate(
                request.params.id,
                {
                    $set: request.body,
                },
                {
                    new: true
                }
            );

            response.status(200).json(updateUser);
        } catch (err) {
            response
                .status(500)
                .json(err);
        }
    } else {
        response
            .status(403)
            .json("You can't update other account's info")
    }
});

// Delete
router.delete("/:id", verify, async (request, response) => {
    const userId = request.params.id;

    if (request.user.id === userId || request.user.isAdmin) {
        try {
            await User.findByIdAndDelete(userId);

            response
                .status(200)
                .json("User has been deleted");
        } catch (err) {
            response
                .status(500)
                .json(err);
        }
    } else {
        response
            .status(403)
            .json("You can't delete other accounts");
    }
});

// Get
router.get("/find/:id", async (request, response) => {
    const userId = request.params.id;

    try {
        const user = await User.findById(userId);

        const {password, ...info}  = user._doc;

        response
            .status(200)
            .json(info);
    } catch (err) {
        response
            .status(500)
            .json(err);
    } 
});

// Get All 
router.get("/", verify, async (request, response) => {
    const query = request.query.new;
    const userId = request.params.id;

    if (request.user.isAdmin) {
        try {
            const users = query 
                ? await User.find().limit(10) 
                : await User.find();
        
            response
                .status(200)
                .json(users);
        } catch(err) {
            response
                .status(500)
                .json(err);
        }
    } else {
        response
            .status(403)
            .json("You are not allowed to see all users !");
    }
});

// Get User Stats
router.get("/stats", async (request, response) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: {$month: "$createdAt"}
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum:1}
                }
            }
        ]);

        response
            .status(200)
            .json(data);
    } catch (err) {
        response
            .status(500)
            .json(err);
    }
});

module.exports = router;
