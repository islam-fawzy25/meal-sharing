import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mealsById.css"

const MealById = ({mealById,availableReservations}) => {

  return (
      <Card className="meal-by-id-card">
        <Card.Body className="meal-by-id-card-body">
          <Card.Title className="meal-by-id-title"><b>{mealById.title}</b></Card.Title>
          <Card.Img className="meal-by-id-image" src={mealById.img_url} />
          <Card.Text className="meal-by-id-description">{mealById.description}</Card.Text>
          <Card.Title>Location: {mealById.location}</Card.Title>
          <Card.Title>Price: {mealById.price} Kr</Card.Title>
          <Card.Title>Avaliable: {availableReservations} meals</Card.Title>
        </Card.Body>
      </Card>
  );
};

export default MealById;
