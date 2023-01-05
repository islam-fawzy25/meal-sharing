const express = require("express");
const { on, count } = require("../database");
const router = express.Router();
const knex = require("../database");


router.get("/", async (request, response) => {
    try {
        const reviews = await knex("reviews");
        return response.status(200).json(reviews);
    } catch (error) {
        return response.sendStatus(500)
    }
})

router.post("/", async (request, response) => {
    try {
        const todayDate = new Date().toISOString().split(["T"])
        const getTodayDate = todayDate[0]
        const reviewsId = await knex("reviews")
        await knex("reviews")
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
        return response.sendStatus(201)
    } catch (error) {
        return response.sendStatus(500)
    }
})

router.put("/:id", async (request, response) => {
    try {
        const reviewsId = Number(request.params.id);
        if (isNaN(reviewsId)) {
            return response.status(400).json({ error: "Review Id must be an integer" })
           
        }
        await knex('reviews').where({ id: reviewsId })
            .update({
                title: request.body.title,
                description: request.body.description,
                meal_id: request.body.meal_id,
                stars: request.body.stars,
                created_date: request.body.created_date,
            })
        return response.sendStatus(201)
    } catch (error) {
        return response.sendStatus(500)
    }
});

router.delete("/:id", async (request, response) => {
    try {
        const reviewsId = Number(request.params.id);
        if (isNaN(reviewsId)) {
            return response.status(400)
        }
        await knex('reviews').where({ id: reviewsId }).del()
        return response.sendStatus(200)
    } catch (error) {
        return response.sendStatus(500)
    }
});


module.exports = router;