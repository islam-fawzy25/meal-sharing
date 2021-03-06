const express = require("express");
const { as } = require("../database");
const router = express.Router();
const knex = require("../database");


//GET	Returns all reservations
router.get("/", async (request, response) => {
  try {
    const reservations = await knex("reservations");
    response.json(reservations);
  } catch (error) {
    throw error;
  }
});

//POST	Add a new reservation
router.post("/", async (request, response) => {
   try {
  const resrvationId = await knex("reservations");
  const reservations = await knex("reservations").insert({
    id: Math.max(0, ...resrvationId.map((item) => item.id)) + 1,
    number_of_guests: request.body.guestsNumber,
    meal_id: request.body.mealId,
    created_date: new Date(request.body.date),
    contact_phonenumber: request.body.phone,
    contact_name: request.body.name,
    contact_email: request.body.email,
  });
  response.json(reservations);
  console.log("resv");
   } catch (error) {
     response.status(400).send({error:'Reservation faild try a gain '})
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

module.exports = router;
