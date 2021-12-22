import React, { useEffect, useState } from "react";
import { fetchFromDb } from "../fetch/fetch";
import MealsCard from "../../components/meals/MealsCard";

export default function MealsPage() {
    const [meals, setMeals] = useState([]);

    const getMeals = async () => {
        try {
            const data = await fetchFromDb("/meals", "get")
            setMeals(data)
        } catch (err) { throw err }
    }

    useEffect(() => {
        (async () => {
            await getMeals();
        })();
    }, []);
    return (
        <>
    <div className="meal-card-container">
      {meals.map((meal) => (
        <div key={meal.id}>
          <MealsCard meal={meal} />
        </div>
      ))}
    </div>
        </>
    )
}