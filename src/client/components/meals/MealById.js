import { useParams } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { Data } from "../../App";
import ReservationForm from "../reservation/ReservationForm";

const MealById = () => {
  const { meals, idMeal, setIdMeal, available } = useContext(Data);
  const param = useParams();
  //!!!!! which one better to use stat or variable for render meal by id !!!!
  useEffect(() => {
    (async () => {
      const mealByID = await meals.find((meal) => meal.id == Number(param.id));
      setIdMeal(mealByID);
    })();
  }, []);
  return (
    <div className='meal-by-id'>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="" />
        <Card.Body>
          <Card.Title>{idMeal.title}</Card.Title>
          <Card.Title>{idMeal.price} Kr</Card.Title>
          <Card.Text>{idMeal.description}</Card.Text>
          <Card.Title>Location: {idMeal.location}</Card.Title>
        </Card.Body>
        <Card.Body></Card.Body>
      </Card>
    </div>
  );
};

export default MealById;
