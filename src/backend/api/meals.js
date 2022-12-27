
const express = require("express");
const { from, sum, as ,andWhere} = require("../database");
const router = express.Router();
const knex = require("../database");

//GET	Returns all meals
router.get("/", async (request, response) => {
  try {

    // implementation of filtered meals with  Max pric
    if ("maxPrice" in request.query) {
      const maxPrice = parseInt(request.query.maxPrice);
      if (isNaN(maxPrice)) {
        return response.status(400).send({ error: "Max Price must be integers" });
      }
      const meals = await knex('meals').where("price", "<=", maxPrice);
      response.send(meals)
      return
    }

    if ("title" in request.query) {
      const title = request.query.title.toLowerCase();
      const meals = await knex('meals').where("meals.title", "like", "%" + title + "%");
      response.send(meals)
      return
    }

    // implementation of filtered meals with  limit
    if ("limit" in request.query) {
      const limit = parseInt(request.query.limit);
      if (isNaN(limit)) {
        response.status(400).send("Limit must be integer");
      }
      const meals = await knex('meals').limit(limit);
      response.send(meals)
      return
    }

    //Get meals that has been created after the date
    if ("createdAfter" in request.query) {
      const createdAfter = request.query.createdAfter;
      const meals = await knex('meals').where("created_date", ">", createdAfter);
      response.send(meals)
      return
    }

    //Get meals that still has available reservations
    if ("availableReservations" in request.query) {
      let availableReservations = request.query.availableReservations == "true";
      if (availableReservations) {
        const meals = await knex.raw(`
            SELECT
            COALESCE(SUM(reservations.number_of_guests), 0) AS total_reservations,
            meals.max_reservation,
            meals.title,
            meals.id
        FROM
            meals
                LEFT JOIN
            reservations ON reservations.meal_id = meals.id
        GROUP BY meals.id
        HAVING max_reservation > total_reservations;
            `)
          .then((res) => response.send(res[0]));
        return
      }

    }
    const meals = await knex('meals').where("isActive",true)
    response.status(200).send(meals)
    return
  } catch (error) {
    throw error;
  }
});

// POST	Adds a new meal
router.post("/", async (request, response) => {
  const idMeal = await knex("meals");
  const meals = await knex("meals").insert({
    id: Math.max(0, ...idMeal.map((item) => item.id)) + 1,
    title: request.body.title,
    description: request.body.description,
    img_url: request.body.imageUrl,
    location: request.body.location,
    max_reservation: request.body.maxReservation,
    price: request.body.price,
    created_date: new Date(request.body.date),
    isActive:true
  });
  response.json(meals);
});

// 	GET	Returns meal by id
router.get("/:id", async (request, response) => {
  try {
    const mealId = Number(request.params.id);
    const selectedMeal = await knex("meals").where("id", mealId);
    response.send(selectedMeal[0]);
  } catch (error) {
    throw error;
  }
})

// Update isActive to be false
router.put("/:id", async (request, response) => {
  try {
    const mealId = parseInt(request.params.id);
    if (isNaN(mealId)) {
      
      return response.status(400).json("id must be an integer");
    }
    const selectedMeal = await knex("meals").where("id", mealId).update("isActive",false);
    if (!selectedMeal) {
      return  response.status(400).send("Nothing found");
    }
    response.status(201).send(" successfully deleted");
  } catch (error) {
    throw error;
  }
});

module.exports = router;
