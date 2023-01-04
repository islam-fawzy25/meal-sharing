const express = require("express");
const { as, where } = require("../database");
const router = express.Router();
const knex = require("../database");


//GET	Returns all reservations
router.get("/", async (request, response) => {
  try {
    const reservations = await knex("reservations");
    return response.status(200).json(reservations);
  } catch (error) {
    return response.sendStatus(500)
  }
});

//POST	Add a new reservation
router.post("/", async (request, response) => {
  try {
    const resrvationId= await knex("reservations");
    await knex("reservations").insert({
      id: Math.max(0, ...resrvationId.map((item) => item.id)) + 1,
      number_of_guests: request.body.guestsNumber,
      meal_id: request.body.mealId,
      created_date: request.body.date,
      contact_phonenumber: request.body.phone,
      contact_name: request.body.name,
      contact_email: request.body.email,
    });
    return response.sendStatus(201)
  } catch (error) {
    return response.sendStatus(500)
  }
});
//Update 	 reservation by id
router.put("/:id", async (request, response) => {
  try {
    const resrvationId = Number(request.params.id)
    if (isNaN(resrvationId)) {return response.sendStatus(404)}
    const resrvationById = await knex("reservations").where("id", resrvationId)
    if (!resrvationById) {return response.sendStatus(404)}
    await knex("reservations").where("id", resrvationId).update({
      number_of_guests: request.body.guestsNumber,
      contact_phonenumber: request.body.phone,
      contact_name: request.body.name,
      contact_email: request.body.email,
    });
    return response.sendStatus(201)
  } catch (error) {
    return response.sendStatus(500)
  }
});
// 	GET	 reservations by id
router.get("/:id", async (request, response) => {
  try {
    const id = Number(request.params.id);
    const reservations = await knex.raw(`
  SELECT *
  FROM
  reservations
  WHERE meal_id=${id}
  `);

    if (isNaN(id)) {return response.sendStatus(404)}
    if (reservations[0].length === 0) {
      return response.sendStatus(404)
    } else {
      return response.status(200).json(reservations[0]);
    }
  } catch (error) {
    response.sendStatus(500)
  }
});


module.exports = router;
