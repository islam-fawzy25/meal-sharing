import React from "react";
import DisplayMeals from "./DisplayMeals";

const MealsComponent = ({
  meals,
  setMeals,
  available,
  setAvailable,
  availableMeals,
  setAvailableMeals,
  idMeal,
  setIdMeal
}) => {
  return (
    <div>
      {meals.map((meal) => (
        <div key={meal.id}>
          <DisplayMeals
            meal={meal}
            available={available}
            setAvailable={setAvailable}
            availableMeals={availableMeals}
            setAvailableMeals={setAvailableMeals}
            idMeal={idMeal}
            setIdMeal={setIdMeal}
          />
        </div>
      ))}
    </div>
  );
};

export default MealsComponent;
