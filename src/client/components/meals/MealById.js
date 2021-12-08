import { useParams } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { Data } from "../../App";
import ReservationForm from "../reservations/ReservationForm";
import "./meals.css"

const MealById = () => {
  const { meals, idMeal, setIdMeal, availableMeals, availableSeats, setAvailableSeats } = useContext(Data);
  const param = useParams();
  //needs to fix error max_res not found
  const showHowManySeatsAvailable = async () => {
    const meal = await availableMeals.find(meal => meal.id == Number(param.id));
    const totalAvailableSeats = await meal.max_reservation - Number(meal.total_reservations)
    await setAvailableSeats(totalAvailableSeats);
  }

  useEffect(() => {
    (async () => {
      const mealByID = await meals.find((meal) => meal.id == Number(param.id));
      await setIdMeal(mealByID);
      await showHowManySeatsAvailable()
    })();
  }, [{ availableMeals, availableSeats, idMeal }]);

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
