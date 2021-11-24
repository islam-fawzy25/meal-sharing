import { useParams } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { Data } from "../../App";
import ReservationForm from "../reservation/ReservationForm";

const MealById = () => {
  const { meals, idMeal, setIdMeal, availableMeals,availableSeats, setAvailableSeats } = useContext(Data);
  const param = useParams();
  

  useEffect(() => {
    (async () => {
      const mealByID = await meals.find((meal) => meal.id == Number(param.id));
      await setIdMeal(mealByID);
      const showHowManySeatsAvailable = await availableMeals.find(meal => meal.id == Number(param.id));
      await setAvailableSeats(showHowManySeatsAvailable.max_reservation - Number(showHowManySeatsAvailable.total_reservations));
    })();
  }, [availableMeals]);

  return (
    <div className='meal-by-id'>
      <Card style={{ width: "40rem" }} className="card1">
        {/* <Card.Img className="card-image" variant="top" src={ }/> */}
        <Card.Body>
          <Card.Title>{idMeal.title}</Card.Title>
          <Card.Text>{idMeal.description}</Card.Text>
          <Card.Title>Location: {idMeal.location}</Card.Title>
          <Card.Title>Available seats: {availableSeats}</Card.Title>
          <Card.Title>{idMeal.price} Kr</Card.Title>
        </Card.Body>
        <Card.Body>
          <ReservationForm />
        </Card.Body>
      </Card>
    </div>
  );
};

export default MealById;
