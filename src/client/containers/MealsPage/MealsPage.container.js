import React, { useEffect, useState } from "react";
import "./MealsPage.style.css"
import { fetchFromDb } from "../../helper/fetch/fetch";
import MealsCard from "../../components/meals/mealsCard/MealsCard.component";
import SimpleRating from "../../components/reviews/getReviews/rating.component"

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
                        <MealsCard meal={meal} >
                            <SimpleRating mealId={meal.id} />
                        </MealsCard>
                    </div>
                ))}
            </div>
        </>
    )
}