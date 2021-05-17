const { request, response } = require("express");
const express = require("express");
const { as } = require("../database");
const router = express.Router();
const knex = require("../database");

//GET	Returns all meals 
router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meals").select("title");
    const meals = await knex("meals");
    let filteredMeals = meals;

    // implementation of filtered meals with  Max pric 
    if ("maxPrice" in request.query) {
      const maxPrice = parseInt(request.query.maxPrice);
      if (isNaN(maxPrice)) {
        return response
          .status(400)
          .send({ error: "Max Price must be integers" });
      }
      filteredMeals = filteredMeals.filter((meal) => meal.price <= maxPrice);
    }

    // implementation of filtered meals with  title 
    if ("title" in request.query) {
      const title = request.query.title.toLowerCase();
      filteredMeals = filteredMeals.filter((meal) => {
        return meal.title.toLocaleLowerCase().includes(title);
      });
    }

    // implementation of filtered meals with  limit 
    if ("limit" in request.query) {
      const limit = parseInt(request.query.limit);
      if (isNaN(limit)) {
        return response.status(400).send("Limit must be integer");
      }
      filteredMeals.length = limit;
    }

    //Get meals that has been created after the date 
    if ("createdAfter" in request.query) {
      const createdAfter = request.query.createdAfter;
      filteredMeals = await knex("meals").where(
        "created_date",
        ">",
        createdAfter
      );
    }

    //Get meals that still has available reservations
    if ("availableReservations" in request.query) {
      const availableReservations =
        request.query.availableReservations == "true";
      if (availableReservations) {
        filteredMeals = await knex
          .raw(
            `
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
    
    `
          )
          .then((res) => response.send(res[0]));
        return;
      }
    }
    response.json(filteredMeals);
  } catch (error) {
    throw error;
  }
});

// POST	Adds a new meal 
router.post("/", async (request, response) => {
  const meals = await knex("meals").insert({
    title: "Kabab",
    description: "Maionated small pice of meat ",
    location: "Cairo,Egypt",
    max_reservation: 10,
    price: 120,
    created_date: new Date(),
  });
  response.json(meals);
});

//PUT	Updates the meal by id 
router.put("/:id", async (request, response) => {
  try {
    const mealById = parseInt(request.params.id);

    // knex syntax for selecting things. Look up the documentation for knex for further info
    const meal = await knex("meals").where({ id: mealById }).update({
      title: request.body.title,
      description: request.body.description,
      location: request.body.location,
      max_reservation: request.body.max_reservation,
      price: request.body.price,
      created_date: request.body.created_date,
    });
    response.json(meal);
  } catch (error) {
    throw error;
  }
});

//DELETE	Deletes the meal by id 
router.delete("/:id", async (request, response) => {
  try {
    const mealById = parseInt(request.params.id);
    const meal = await knex("meals").where({ id: mealById }).delete();
    response.json(meal);
  } catch (error) {
    throw error;
  }
});

// 	GET	Returns meal by id 
router.get("/:id", async (request, response) => {
  const meals = await knex("meals");
  const id = parseInt(request.params.id);
  let mealById = meals;
  if (isNaN(id)) {
    return response.status(400).send({ error: "IDs must be integer" });
  } else if (meals[id - 1] === undefined) {
    return response.status(400).send("This ID No matching any meal ids ");
  } else {
    mealById = mealById.filter((obj) => obj.id === id);
    return response.json(mealById);
  }
});

module.exports = router;