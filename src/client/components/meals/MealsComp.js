import React, { useContext} from "react";
import DisplayMeals from "./MealsCard";
import { Data } from "../../App";
import "./meals.css";
import useFetch from "../UseFetch";

// Looping inside meals array and send meal object to DisplayMeals component
const MealsComponent = () => {
  const { meals } = useContext(Data);

  return (
    <div className="mealCardContainer">
      {meals.map((meal) => (
        <div key={meal.id}>
          <DisplayMeals meal={meal} />
        </div>
      ))}
    </div>
  );
};

export default MealsComponent;
