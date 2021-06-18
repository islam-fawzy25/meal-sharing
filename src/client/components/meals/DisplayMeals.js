import React, { useEffect, useState } from "react";
import {  Link } from "react-router-dom";

const DisplayMeals = ({
 
  meal,
  available,
  setAvailable,
  availableMeals,
  idMeal,
}) => {
  const id = `/meals/${meal.id}`;
// i need help here to know how to make available state changes with if condition ??!!
  const availableMealsById = async () => {
    await availableMeals.map((meal) => {
      if (meal.id !== idMeal.id) {
        return setAvailable(!available);
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    availableMealsById();
  }, []);

  return (
    <div>
      <span>
        {meal.title}
        <li>{meal.price}</li>
        <Link to={id}>
          <button>More info</button>{" "}
        </Link>
        <hr></hr>
      </span>
    </div>
  );
};

export default DisplayMeals;
