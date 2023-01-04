import React from "react";
import "./MealsPage.style.css"
import MealsCard from "../../components/Meals/MealsCard/MealsCard.component"
import SimpleRating from "../../components/Reviews/GetReviews/Rating.component"
import useGet from "../../helper/useGet";

export default function MealsPage() {
    const { data: meals, error, loading } = useGet('/api/meals')
    return (
        <>
            <div className="meal-card-container">
                {error && <h1>Error!</h1>}
                {loading && <h1>Loading...</h1>}
                {meals && meals.map((meal) => (
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