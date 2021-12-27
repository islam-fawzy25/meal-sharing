import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./mealsCard.css";
import imagesArray from "../../../helper/mealsImages";

// Rendering each meal  in detail into /path:id page
const MealsCard = ({ meal }) => {
  const [mealImg, setMealImg] = useState();

  const setImag = async () => {
    try {
      const isImage = await imagesArray.find(imag => imag.id == meal.id)
      if (!isImage) {
        return setMealImg("https://images.unsplash.com/photo-1635452065975-c0bc1af6bb48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80")
      }
      return setMealImg(isImage.image)
    } catch (err) { throw err }
  }

  useEffect(() => {
    (async()=>{
      await setImag()
    })()
  }
    , [])

  return (
    <div >
      <div className="meal-card">
        <Card style={{ width: "19rem" }} >
          <Card.Img className="meal-card-image" src={mealImg} />
          <Card.Body>
            <Card.Title>{meal.title}</Card.Title>
            <Card.Title>{meal.price} Kr</Card.Title>
          </Card.Body>

          <Card.Body>
            <Card.Link>
              <Link to={`/meals/${meal.id}`}>
                  Meal info 
              </Link>
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default MealsCard;
