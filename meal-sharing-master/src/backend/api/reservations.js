const { request, response } = require("express");
const express = require("express");
const { as } = require("../database");
const router = express.Router();
const knex = require("../database");

//GET	Returns all reservations
router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const reservations = await knex("reservations");
    response.json(reservations);
  } catch (error) {
    throw error;
  }
});

//POST	Adds a new reservation
router.post("/", async (request, response) => {
  try {
    const reservations = await knex("reservations").insert(request.body);
    response.json(reservations);
  } catch (error) {
    throw error;
  }
});

// 	GET	Returns reservation by id
router.get("/:id", async (request, response) => {
  const reservations = await knex("reservations");
  const id = parseInt(request.params.id);
  if (isNaN(id)) {
    return response.status(400).send({ error: "IDs must be integer" });
  } else if (reservations[id - 1] === undefined) {
    return response
      .status(400)
      .send("This ID No matching any reservation ids ");
  } else {
    const reservationById = reservations.filter((obj) => obj.id === id);
    return response.json(reservationById);
  }
});

//PUT	Updates the reservation by id
router.put("/:id", async (request, response) => {
  try {
    const reservationById = parseInt(request.params.id);
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const reservation = await knex("reservations")
      .where({ id: reservationById })
      .update(request.body);
    response.json(reservation);
  } catch (error) {
    throw error;
  }
});

//Deletes the reservation by id
router.delete("/:id", async (request, response) => {
  try {
    const reservationById = parseInt(request.params.id);
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const reservation = await knex("reservations")
      .where({ id: reservationById })
      .delete();
    response.json(reservation);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
