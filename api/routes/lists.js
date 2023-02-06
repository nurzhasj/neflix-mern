const router = require("express").Router();
const List = require("../models/List");
const response = require("express");
const verify = require("../verifyToken");
const { update } = require("../models/User");

// Create
router.post("/", verify, async (request, response) => {
    if (request.user.isAdmin) {
        const newList = new List(request.body)

        try {
            const savedList = await newList.save();

            response
                .status(201)
                .json(savedList);

        } catch (err) {
            response  
                .status(500)
                .json(err);
        }
    } else {
        response
            .status(403)
            .json("You are not allowed !")
    }
});

// Delete
router.delete("/:id", verify, async (request, response) => {
    if (request.user.isAdmin) {
        try {
            await List.findByIdAndDelete(request.params.id);

            response
                .status(200)
                .json("The list is successfully deleted !");
                
        } catch (err) {
            response  
                .status(500)
                .json(err);
        }
    } else {
        response
            .status(403)
            .json("You are not allowed !")
    }
});

// Get
router.get("/", verify, async (request, response) => {
    const typeQuery = request.query.type;
    const genreQuery = request.query.genre;

    let lists = [];
    
    try {
        if (typeQuery) {
            if (genreQuery) {
                lists = await List.aggregate([
                    {
                        $sample : {size : 10}
                    },
                    {   
                        $match : {type : typeQuery, genre : genreQuery}
                    }
                ]);
            } else {
                lists = await List.aggregate([
                    {
                        $sample : {size : 10}
                    },
                    {   
                        $match : {type : typeQuery}
                    }
                ]);
            }
        } else {
            lists = await List.aggregate([
                {
                    $sample : {
                        size : 10
                    }
                }
            ]);
        }

        response
            .status(200)
            .json(lists);       
    } catch (err) {
        response  
            .status(500)
            .json(err);
    } 
});



module.exports = router;
