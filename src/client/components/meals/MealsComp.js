import React, { useContext } from "react";
import DisplayMeals from "./DisplayMeals";
import { Data } from "../../App";
const MealsComponent = () => {
const {
  meals,
  setMeals,
  available,
  setAvailable,
  availableMeals,
  setAvailableMeals,
  idMeal,
  setIdMeal,
  availableMealsById
} = useContext(Data)
  return (
    <div>
      {meals.map((meal) => (
        <div key={meal.id}>
          <DisplayMeals
            meal={meal}
          />
        </div>
      ))}
    </div>
  );
};

export default MealsComponent;
