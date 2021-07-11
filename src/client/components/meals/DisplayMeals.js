import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Data } from "../../App";
import "./meals.css";


// Rendering each meal  in detail into /path:id page
const DisplayMeals = ({ meal }) => {
  const { available, setAvailable, availableMeals, idMeal } = useContext(Data);

  const id = `/meals/${meal.id}`;

  const availableMealsById = async () => {
    const foundMeal = availableMeals.find((availablemeal) => {
      return availablemeal.id === meal.id;
    });
    if (foundMeal) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  };

  return (
    <div >

   
    <div className="mealCard">
      <Card style={{ width: "18rem" }} >
        <Card.Img  src="https://elements-video-cover-images-0.imgix.net/files/70a32ca9-6cae-4a1b-becc-22ce70cc1bf9/inline_image_preview.jpg?auto=compress&crop=edges&fit=crop&fm=jpeg&h=800&w=1200&s=d9e23f0660caef7c1bdccb6fc26b2bbe" />
        <Card.Body>
          <Card.Title>{meal.title}</Card.Title>
          <Card.Title>{meal.price} Kr</Card.Title>
        </Card.Body>

        <Card.Body>
          <Card.Link>
            <Link to={id}>
              <button
                onClick={() => {
                  availableMealsById();
                }}
              >
                Meal info
              </button>
            </Link>
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
    </div>
  );
};

export default DisplayMeals;
