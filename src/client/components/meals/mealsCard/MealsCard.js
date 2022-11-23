import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./mealsCard.css";
import { Button } from "react-bootstrap";

// Rendering each meal  in detail into /path:id page
const MealsCard = ({ meal }) => {
  console.log(meal.title);
  return (
    <div >
      <div className="meal-card">
        <Card style={{ width: "19rem" }} >
          <Card.Img className="meal-card-image" src={meal.img_url} />
          <Card.Body>
            <Card.Title><b>{meal.title}</b></Card.Title>
            <Card.Title>{meal.price} Kr</Card.Title>
          </Card.Body>

          <Card.Body>
            <Card.Link>
              <Link to={`/meals/${meal.id}`}>
                <Button variant="secondary">
                  Meal info
                </Button>
              </Link>
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default MealsCard;