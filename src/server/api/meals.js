/*  Thoughts: 
- sort by lowest price - highest price - highest rating - by location
- highest rating last month 
-  highest reservations

*/
const express = require("express");
const { from, sum, as, andWhere } = require("../database");
const router = express.Router();
const knex = require("../database");

//GET	Returns all meals
router.get("/", async (request, response) => {
  try {
    // implementation of filtered meals with  Max pric
    if ("maxPrice" in request.query) {
      const maxPrice = Number(request.query.maxPrice);
      if (isNaN(maxPrice)) {
        return response.status(400).send({ error: "Max Price must be integers" });
      }
      const meals = await knex('meals').where("price", "<=", maxPrice);
      return response.status(200).json(meals)

    }

    if ("title" in request.query) {
      const title = request.query.title.toLowerCase();
      const meals = await knex('meals').where("meals.title", "like", "%" + title + "%");
      return response.status(200).json(meals)

    }

    // implementation of filtered meals with  limit
    if ("limit" in request.query) {
      const limit = Number(request.query.limit);
      if (isNaN(limit)) {
        response.status(400).send("Limit must be integer");
      }
      const meals = await knex('meals').limit(limit);
      return response.status(200).json(meals)

    }

    //Get meals that has been created after the date
    if ("createdAfter" in request.query) {
      const createdAfter = request.query.createdAfter;
      const meals = await knex('meals').where("created_date", ">", createdAfter);
      return response.status(200).send(meals)

    }

    const meals = await knex('meals').where("isActive", true)
    return response.status(200).json(meals)
  } catch (error) {
    return response.sendStatus(500)
  }
});


// POST	Adds a new meal
router.post("/", async (request, response) => {
  try {
    const newDate = new Date().toISOString().split(["T"])
    const todayDate = newDate[0]
    const idMeal = await knex("meals");
    await knex("meals").insert({
      id: Math.max(0, ...idMeal.map((item) => item.id)) + 5, // UUID  
      title: request.body.title,
      description: request.body.description,
      img_url: request.body.imageUrl,
      location: request.body.location,
      max_reservation: request.body.maxReservation,
      price: request.body.price,
      created_date: todayDate,
    });
    return response.sendStatus(201)
  } catch (error) {
    return response.status(500)
  }
});

// 	GET	Returns meal by id
router.get("/:id", async (request, response) => {
  try {
    const mealId = Number(request.params.id);
    if (isNaN(mealId)) { return response.sendStatus(400) }
    const selectedMeal = await knex("meals").where("id", mealId);
    if (!selectedMeal) { return response.sendStatus(404) }
    return response.status(200).json(selectedMeal[0]);
  }
  catch (error) { return response.sendStatus(500) }
})

// Update Active/ Deactive meal
router.put("/:id", async (request, response) => {
  try {
    const mealId = Number(request.params.id);
    if (isNaN(mealId)) {
      return response.sendStatus(400)
    }
    const selectedMeal = await knex("meals").where("id", mealId);
    if (!selectedMeal) {
      return response.sendStatus(400)
    }
    await knex("meals").where("id", mealId).update("isActive", !selectedMeal[0].isActive)
    return response.sendStatus(201)
  } catch (error) {
    return response.sendStatus(500)
  }
});
// Edit	meal
router.put("/edit-meal/:id", async (request, response) => {
  try {
    const idMeal = Number(request.params.id);
    await knex("meals").where("id", idMeal).update({
      title: request.body.title,
      description: request.body.description,
      img_url: request.body.imageUrl,
      location: request.body.location,
      max_reservation: request.body.maxReservation,
      price: request.body.price,
    });
    return response.sendStatus(200)
  } catch (error) {
    return response.sendStatus(500)
  }
});
// Delete  meal wiith reviews and reservations 
router.delete("/:id", async (response, request) => {
  try {
    const mealId = Number(request.req.params.id);
    if (isNaN(mealId)) {
      return response.sendStatus(400)
    }
    const selectedMeal = await knex("meals").where("id", mealId);
    if (!selectedMeal) {
      return response.sendStatus(400)
    }
    await knex("meals").where("id", mealId).del();
    return response.sendStatus(200)
  } catch (error) {
    return response.sendStatus(500)
  }
})

module.exports = router;
