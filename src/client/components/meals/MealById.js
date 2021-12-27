import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./meals.css"

const MealById = ({mealById}) => {

  return (
    <div className='meal-by-id'>
      <Card className="meal-by-id-card">
        <Card.Body>
          <Card.Title>{mealById.title}</Card.Title>
          <Card.Text>{mealById.description}</Card.Text>
          <Card.Title>Location: {mealById.location}</Card.Title>
          <Card.Title>Price: {mealById.price} Kr</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MealById;
