import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import ReservationForm from "../reservations/ReservationForm";
import "./meals.css"
import { fetchFromDb } from "../../helper/fetch/fetch";

const MealById = () => {
  const [mealById, setMealById] = useState({})
  const param = useParams();

  const getMealById = async () => {
    try {
      const data = await fetchFromDb(`/meals/${Number(param.id)}`, "get")
      setMealById(data)
    } catch (err) { throw err }
  }


  useEffect(() => {
    (async () => {
      await getMealById()
    })();
  }, []);

  return (
    <div className='meal-by-id'>
      <Card className="meal-by-id-card">
        <Card.Body>
          <Card.Title>{mealById.title}</Card.Title>
          <Card.Text>{mealById.description}</Card.Text>
          <Card.Title>Location: {mealById.location}</Card.Title>
          <Card.Title>Price: {mealById.price} Kr</Card.Title>
        </Card.Body>
        <Card.Body className="meal-by-id-reservation-form" >
          <ReservationForm />
        </Card.Body>
      </Card>
    </div>
  );
};

export default MealById;
