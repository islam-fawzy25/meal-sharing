import React, {useEffect, useState,useContext } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Data } from "../../App";
import "./mealsCard.css";
import imagesArray from "./mealsImages";

// Rendering each meal  in detail into /path:id page
const MealsCard = ({ meal}) => {
  const [mealImg, setMealImg] = useState();

  const {  setAvailable, availableMeals } = useContext(Data);

  const id = `/meals/${meal.id}`;

  const availableMealsById = async () => {
    const findMeal = await availableMeals.find((availablemeal) => {
      return availablemeal.id === meal.id;
    });
    if (findMeal) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  };
 

 
  const setImag =async ()=>{
    const isImage = await imagesArray.find(imag => imag.id == meal.id)
    if(!isImage){
     return setMealImg( "https://images.unsplash.com/photo-1635452065975-c0bc1af6bb48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80")
    }
    return setMealImg(isImage.image)
    } 

 useEffect(()=>{
     setImag()
 }
,[]
 )

  return (
    <div >
      <div className="meal-card">
        <Card style={{ width: "18rem" }} >
          <Card.Img className="meal-card-image" src={mealImg} />
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

export default MealsCard;
