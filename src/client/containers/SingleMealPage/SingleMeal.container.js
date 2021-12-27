import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singlePage.css"
import { fetchFromDb } from "../../helper/fetch/fetch";
import ReservationForm from "../../components/reservations/ReservationForm";
import MealById from "../../components/meals/MealById";

export default function SingleMealPage() {
    const [mealById, setMealById] = useState({})
    const param = useParams();

    const getMealById = async () => {
        try {
            const data = await fetchFromDb(`/meals/${Number(param.id)}`, "get")
            setMealById(data)
        } catch (err) { throw err }
    }

    useEffect(() => {
        (async () => {
            await getMealById()
        })();
    }, []);

    //Idea for showing how many available seats in each meal 
    // const showHowManySeatsAvailable = async () => {
    //   try {
    //     const meal = await availableMeals.find(meal => meal.id == Number(param.id));
    //     const totalAvailableSeats = await meal.max_reservation - Number(meal.total_reservations)
    //     await setAvailableSeats(totalAvailableSeats);
    //   } catch (err) { throw err }
    // }
    return (
        <>
            <MealById mealById={mealById} />
            <ReservationForm />

        </>
    )
}