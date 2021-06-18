import { useParams } from "react-router-dom";

import React from "react";

const MealById = ({ meals, idMeal, setIdMeal }) => {
  const param = useParams();

  const mealByID = meals.find((meal) => meal.id == Number(param.id));
  setIdMeal(mealByID);

  return (
    <div>
      <h3>{idMeal.title}</h3>
      <li>{idMeal.price} .Kr</li>
      <p>{idMeal.description}</p>
      <div>Location: {idMeal.location}</div>
      <br />
    </div>
  );
};

export default MealById;
