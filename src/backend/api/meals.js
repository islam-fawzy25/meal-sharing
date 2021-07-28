
const express = require("express");
const { from, sum, as } = require("../database");
const router = express.Router();
const knex = require("../database");

//GET	Returns all meals
router.get("/", async (request, response) => {
  let meals = knex("meals");

  // knex syntax for selecting things. Look up the documentation for knex for further info

  // implementation of filtered meals with  Max pric
  if ("maxPrice" in request.query) {
    const maxPrice = parseInt(request.query.maxPrice);
    if (isNaN(maxPrice)) {
      return response.status(400).send({ error: "Max Price must be integers" });
    }
    meals = meals.where("price", "<=", maxPrice);
  }

  if ("title" in request.query) {
    const title = request.query.title.toLowerCase();
    meals = meals.where("meals.title", "like", "%" + title + "%");
  }

  // implementation of filtered meals with  limit
  if ("limit" in request.query) {
    const limit = parseInt(request.query.limit);
    if (isNaN(limit)) {
      return response.status(400).send("Limit must be integer");
    }
    meals = meals.limit(limit);
  }

  //Get meals that has been created after the date
  if ("createdAfter" in request.query) {
    const createdAfter = request.query.createdAfter;
    meals = meals.where("created_date", ">", createdAfter);
  }

  //Get meals that still has available reservations
  if ("availableReservations" in request.query) {
    let availableReservations = request.query.availableReservations == "true";
    if (availableReservations) {
     meals = await knex
        // .select([
        //   // sum('reservations.number_of_guests') as total_reservations,
        //   // "COALESCE(SUM(reservations.number_of_guests), 0) AS total_reservations",
        //   " meals.max_reservation",
        //   " meals.title",
        //   "  meals.id",
        // ])
        // .leftJoin("reservations", "reservations.meal_id", "=", "meals.id")
        // .groupBy("meals.id")
        // .having("max_reservation", ">", sum ('reservations.number_of_guests'))

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
      //  response.json(availableMeal);
    }
  }

  try {
    const recordMeals = await meals;
    response.json(recordMeals);
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
    location: request.body.location,
    max_reservation: request.body.maxReservation,
    price: request.body.price,
    created_date: new Date(request.body.created_date),
  });
  response.json(meals);
  console.log(meals);
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
