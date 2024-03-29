// create new royter for get reservations by meal id -> meal-reservations/:mealid
const express = require("express");
const router = express.Router();
const knex = require("../database");

// get available Reservations for Today date  For Single Meal 
router.get("/available-reservations-single-meal-today/:id", async (request, response) => {
  try {
    const mealId = Number(request.params.id);
    const todayDate = new Date().toLocaleDateString().split("/").reverse().join().replace(/,/g, "-")
    const mealById = await knex("meals").where("id", mealId)

    const mealReservations = await knex.raw(`
      SELECT
        reservations.created_date,
        COALESCE(SUM(reservations.number_of_guests), 0) AS total_reservations,
        meals.max_reservation,
        meals.id as meal_id
    FROM
        meals
            LEFT JOIN
       reservations ON reservations.meal_id = meals.id
        where reservations.meal_id=${mealId} 
     GROUP BY  reservations.created_date;
       `)

    if (mealReservations[0].length === 0) { return response.status(200).json(mealById) } // if new meal with no reservations
    else {
      const availableReservationsToday = mealReservations[0].filter(obj => {
        const reservationDate = obj.created_date.toLocaleDateString().split("/").reverse().join().replace(/,/g, "-")
        if (reservationDate == todayDate) { return obj }
      })
      availableReservationsToday.length === 0 ? response.status(200).json(mealById) :
        response.status(200).json(availableReservationsToday)
    }
  } catch (error) {
    return response.sendStatus(500)
  }
})

module.exports = router;