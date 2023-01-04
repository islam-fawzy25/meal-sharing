const express = require("express");
const router = express.Router();
const knex = require("../database");

// get available Reservations for Today date  For Single Meal 
router.get("/available-reservations-single-meal-today/:id", async (request, response) => {
  try {
    const mealId = Number(request.params.id);
    const newDate =  new Date().toISOString().split(["T"])
    const todayDate =newDate[0]
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
        const DD = obj.created_date.getDate().toString()
        const MM = (obj.created_date.getMonth() + 1).toString()
        const YYYY = obj.created_date.getFullYear().toString()
        const reservationDate = YYYY + "-" + MM + "-" + DD
        if (reservationDate == todayDate) { return obj }
      })
      availableReservationsToday.length === 0 ? response.status(200).json(mealById) :
        response.status(200).json(availableReservationsToday)
    }
  } catch (error) {
    return response.sendStatus(500)
  }
})



// get available Reservations For Single Meal in general // NOT IN USE
router.get("/availableReservationsForSingleMeal/:id", async (request, response) => {
  try {
    const mealId = Number(request.params.id);
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
      .then((res) => {
        const availableReservationsForsingleMeals = res[0].filter(obj => {
          if (obj.id == mealId) { return obj }
        })

        return response.sendStatus(200).json(res[0])
      });
  } catch (error) {
    return response.sendStatus(500)
  }
})

module.exports = router;