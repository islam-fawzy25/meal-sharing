const express = require("express");
const router = express.Router();
const knex = require("../database");



router.get("/:id", async (request, response) => {
    try {
        const mealId = Number(request.params.id);
        if (isNaN(mealId)) { return response.sendStatus(404) }
        const reviewWithId = await knex.raw(`
        SELECT  
        COALESCE(SUM(stars), 0) AS total_stars,
        meal_id,
    count( meal_id) As total_reviewers
           FROM 
           reviews 
           Where meal_id= ${mealId}
           GROUP BY  meal_id;
        `)
        return response.status(200).json(reviewWithId[0][0]);
    } catch (error) {
        return response.sendStatus(500)
    }
})


module.exports = router;