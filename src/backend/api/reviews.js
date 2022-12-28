const express = require("express");
const { on, count } = require("../database");
const router = express.Router();
const knex = require("../database");


router.get("/", async (request, response) => {
    try {
        const reviews = await knex("reviews");
        response.json(reviews);
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error." });
    }
})

router.post("/", async (request, response) => {
    try {
        const todayDate = new Date().toISOString().split(["T"])
        const getTodayDate = todayDate[0]
        const reviewsId = await knex("reviews")
        const insertedReviews = await knex("reviews")
            .insert({
                id: Math.max(0, ...reviewsId.map((item) => item.id)) + 1,
                title: request.body.reviewTitle,
                description: request.body.reviewDescription,
                meal_id: request.body.mealId,
                stars: request.body.reviewStars,
                created_date: getTodayDate,
                user_name: request.body.reviewUserName,
                user_email: request.body.reviewUserEmail
            })
        response.json(insertedReviews);
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error." });
    }
})

router.get("/:id", async (request, response) => {
    try {
        const reviewsId = Number(request.params.id);
        if (isNaN(reviewsId)) {
            response.status(400).json({ error: "Reviews Id must be an integer" })
            return
        }
        const reviewWithId = await knex.raw(`
        SELECT  
        COALESCE(SUM(stars), 0) AS total_stars,
        meal_id,
    count( meal_id) As total_reviewers
           FROM 
           reviews 
           Where meal_id= ${reviewsId}
           GROUP BY  meal_id;
        `)
        response.json(reviewWithId[0]);
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error." });
    }
})

router.put("/:id", async (request, response) => {
    try {
        const reviewsId = Number(request.params.id);
        if (isNaN(reviewsId)) {
            response.status(400).json({ error: "Review Id must be an integer" })
            return
        }
        const updateReview = await knex('reviews').where({ id: reviewsId })
            .update({
                title: request.body.title,
                description: request.body.description,
                meal_id: request.body.meal_id,
                stars: request.body.stars,
                created_date: request.body.created_date,
            })
        response.json(updateReview);
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error." });
    }
});

router.delete("/:id", async (request, response) => {
    try {
        const reviewsId = Number(request.params.id);
        if (isNaN(reviewsId)) {
            response.status(400).json({ error: "Review Id must be an integer" })
            return
        }
        const deleteReview = await knex('reviews')
            .where({ id: reviewsId })
            .del()

        response.json(deleteReview);
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error." });
    }
});


module.exports = router;