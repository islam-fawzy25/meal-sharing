// const { request, response } = require("express");
const express = require("express");
const { as } = require("../database");
const router = express.Router();
const knex = require("../database");
router.use(express.json());
var cors = require("cors");

router.use(cors());

//GET	Returns all reservations
router.get("/", async (request, response) => {
  try {
    const reservations = await knex("reservations");
    response.json(reservations);
  } catch (error) {
    throw error;
  }
});

//POST	Adds a new reservation
router.post("/", async (request, response) => {
  try {
    const resrvationId = await knex("reservations");
    let reservations = await knex("reservations").insert({
      id: Math.max(0, ...resrvationId.map((item) => item.id)) + 1,
      number_of_guests: 1,
      meal_id: request.body.mealId,
      created_date: new Date(request.body.created_date), // here i have to make today date method
      contact_phonenumber: request.body.phonenumber,
      contact_name: request.body.name,
      contact_email: request.body.email,
    });
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
    const reservation = await knex("reservations")
      .where({ id: reservationById })
      .delete();
    response.json(reservation);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
