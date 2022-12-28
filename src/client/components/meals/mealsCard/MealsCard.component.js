import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./MealsCard.style.css";
import { Button } from "react-bootstrap";
// Rendering each meal  in detail into /path:id page
import { useNavigate } from 'react-router-dom';

const MealsCard = ({ meal, children }) => {
 // const navigate = useNavigate();

  return (
      <div className="meal-card">
        <Card style={{ width: "19rem" }} >
          <Card.Img className="meal-card-image" src={meal.img_url} />
          <Card.Body>
            <Card.Title>
              {children}
            </Card.Title>
            <Card.Title><b>{meal.title}</b></Card.Title>
            <Card.Title>{meal.price} Kr</Card.Title>
          </Card.Body>

          <Card.Body>
            <Card.Link>
              <Link to={`/meal/${meal.id}`}>
                <Button variant="secondary">
                  Meal info
                </Button>
              </Link>
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
  );
};

export default MealsCard;