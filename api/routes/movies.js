const router = require("express").Router();
const Movie = require("../models/Movie");
const response = require("express");
const verify = require("../verifyToken");
const { update } = require("../models/User");

// Create
router.post("/", verify, async (request, response) => {
    if (request.user.isAdmin) {
        const newMovie = new Movie(request.body)

        try {
            const savedMovie = await newMovie.save();

            response
                .status(201)
                .json(savedMovie);

        } catch (err) {
            response  
                .status(500)
                .json(err);
        }
    } else {
        response
            .status(403)
            .json("You can't add new movies")
    }
});

// Update
router.put("/:id", verify, async (request, response) => {
    if (request.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(
                request.params.id,
                {
                    $set: request.body,
                },
                {
                    new: true
                }
            );

            response
                .status(200)
                .json(updatedMovie);
                
        } catch (err) {
            response  
                .status(500)
                .json(err);
        }
    } else {
        response
            .status(403)
            .json("You can't update movie info")
    }
});

// Delete
router.delete("/:id", verify, async (request, response) => {
    if (request.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(request.params.id);

            response
                .status(200)
                .json("The movie is successfully deleted !");
                
        } catch (err) {
            response  
                .status(500)
                .json(err);
        }
    } else {
        response
            .status(403)
            .json("You can't delete movies !")
    }
});

// Get
router.get("/find/:id", verify, async (request, response) => {
    try {
        const movie = await Movie.findById(request.params.id);

        response
            .status(200)
            .json(movie);
                
    } catch (err) {
        response  
            .status(500)
            .json(err);
    } 
});

// Get All
router.get("/", verify, async (request, response) => {
    if (request.user.isAdmin) {
        try {
            const movies = await Movie.find();
    
            response
                .status(200)
                .json(movies.reverse());
                    
        } catch (err) {
            response  
                .status(500)
                .json(err);
        } 
    } else {
        response
            .status(403)
            .json("You are not allowed !");
    }
});

// Get Random
router.get("/random", verify, async (request, response) => {
    const type = request.query.type;
    let movie;

    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: {size: 1 } }
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: {size: 1 } }
            ]);
        }

        response
            .status(200)
            .json(movie);
                
    } catch (err) {
        response  
            .status(500)
            .json(err);
    } 
});

module.exports = router;
