const express = require("express");
const { as, where } = require("../database");
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
   } catch (error) {
     response.status(400).send({error:'Reservation faild try a gain '})
    }
});

// 	GET	Returns reservations by id
router.get("/:id", async (request, response) => {
  try{
  const id = parseInt(request.params.id);

  const reservations = await knex.raw(`
  SELECT *
  FROM
  reservations
  WHERE meal_id=${id}
  `);

  if (isNaN(id)) {
    return response.status(400).send({ error: "IDs must be integer" });
  } 
   if (reservations[0].length === 0) {
    return response
      .status(400)
      .send("There are no reservation for id = "+id);
  } else {
    return response.json(reservations[0]);
  }
}catch(error){
  response.status(500).send({ error: "Internal Server Error." });
}
});



 // get  Reservations For Single Meal per day
 router.get("/availableReservationsForSingleMealToday/:id", async (request, response) => {
  try {
    const mealId = Number(request.params.id);
    //
    const newDate = new Date()
    const DD = newDate.getDate().toString()
    const MM = (newDate.getMonth() + 1).toString()
    const YYYY = newDate.getFullYear().toString()
    const todayDate = YYYY + "-" + MM + "-" + DD
    const meals = await knex.raw(`
    SELECT
      reservations.created_date,
      COALESCE(SUM(reservations.number_of_guests), 0) AS total_reservations,
      meals.max_reservation,
      meals.title,
      meals.id as meal_id
  FROM
      meals
          LEFT JOIN
     reservations ON reservations.meal_id = meals.id
      where reservations.meal_id=${mealId} 
   GROUP BY  reservations.created_date;
     `)
      .then((res) => {
        const dailyReservationsForsingleMeals = res[0].filter(obj => {
          const DD = obj.created_date.getDate().toString()
          const MM = (obj.created_date.getMonth() + 1).toString()
          const YYYY = obj.created_date.getFullYear().toString()
          const reservationDate = YYYY + "-" + MM + "-" + DD

           if (reservationDate == todayDate) {
             return obj
           }
        })
        response.send(dailyReservationsForsingleMeals)
      });
  } catch (error) {
    response.status(500).send({ error: "Internal Server Error." });
  }
})




// get available Reservations For Single Meal in total
router.get("/availableReservationsForSingleMeal/:id", async (request, response) => {
  try {
    const mealId = Number(request.params.id);
    // const selectedMeal = await knex("meals").where("id", mealId);
    // response.send(selectedMeal[0]);

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
          console.log(obj.id == mealId);
          console.log(obj.id);
          console.log(mealId);

         if(obj.id == mealId){ return obj}
          
        })
        console.log(availableReservationsForsingleMeals);

        response.send(res[0])
      });
  } catch (error) {
    response.status(500).send({ error: "Internal Server Error." });
  }
})

module.exports = router;
