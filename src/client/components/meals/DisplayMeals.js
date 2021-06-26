import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";
import { Data } from "../../App";

const DisplayMeals = ({ meal }) => {
  const { available, setAvailable, availableMeals, idMeal } = useContext(Data);
  const id = `/meals/${meal.id}`;

  const availableMealsById = async () => {
    await availableMeals.filter((meals) => {
      if (meals.id === meal.id) {
        return setAvailable(true);
      } else {
        return setAvailable(false);
      }
    });
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>{meal.title}</Card.Title>
        <Card.Title>{meal.price} Kr</Card.Title>

        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
      </Card.Body>

      <Card.Body>
        <Card.Link>
          <Link
            to={id}
            role="button"
            onClick={() => {
              availableMealsById();
            }}
          >
            Meal info
          </Link>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default DisplayMeals;
