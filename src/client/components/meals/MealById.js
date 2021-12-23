import { useParams } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { Data } from "../../App";
import ReservationForm from "../reservations/ReservationForm";
import "./meals.css"
import { fetchFromDb } from "../../containers/fetch/fetch";

const MealById = () => {
  const [meals, setMeals] = useState()
  const { idMeal, setIdMeal, availableMeals, availableSeats, setAvailableSeats } = useContext(Data);
  const param = useParams();

  const getMeals = async () => {
    try {
      const data = await fetchFromDb("/meals", "get")
      setMeals(data)
    } catch (err) { throw err }
  }

  //needs to fix error max_res not found
  const showHowManySeatsAvailable = async () => {
    const meal = await availableMeals.find(meal => meal.id == Number(param.id));
    const totalAvailableSeats = await meal.max_reservation - Number(meal.total_reservations)
    await setAvailableSeats(totalAvailableSeats);
  }

  const getMealById = async () => {
    try {
      const mealByID = await meals.find((meal) => meal.id == Number(param.id));
      setIdMeal(mealByID);
    } catch (err) { throw err }
  }

  useEffect(() => {
    (async () => {
      await getMeals()
      await getMealById()
      await showHowManySeatsAvailable()
    })();
  }, [{ availableMeals, availableSeats, idMeal, meals }]);

  return (
    <div className='meal-by-id'>
      <Card className="meal-by-id-card">
        <Card.Body>
          <Card.Title>{idMeal.title}</Card.Title>
          <Card.Text>{idMeal.description}</Card.Text>
          <Card.Title>Location: {idMeal.location}</Card.Title>
          <Card.Title>Available seats: {availableSeats}</Card.Title>
          <Card.Title>{idMeal.price} Kr</Card.Title>
        </Card.Body>
        <Card.Body className="meal-by-id-reservation-form" >
          <ReservationForm />
        </Card.Body>
      </Card>
    </div>
  );
};

export default MealById;
