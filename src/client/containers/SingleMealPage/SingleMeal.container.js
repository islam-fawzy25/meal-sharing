import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singlePage.css"
import { fetchFromDb } from "../../helper/fetch/fetch";
import ReservationForm from "../../components/reservations/ReservationForm";
import MealById from "../../components/meals/mealById/MealById";

export default function SingleMealPage() {
    const [mealById, setMealById] = useState({})
    const [availableReservations, setAvailableReservations] = useState([])
    const [isAvailable, setIsAvailable] = useState(true)
    const param = useParams();

    const getMealById = async () => {
        try {
            const data = await fetchFromDb(`/meals/${Number(param.id)}`, "get")
            setMealById(data)


        } catch (err) { throw err }
    }
    const getAvailableReservationByMealId = async () => {
        try {
            const data = await fetchFromDb(`/meals/availableReservationsForSingleMeal/${Number(param.id)}`, "get")
            //    console.log(data[0].max_reservation - parseInt(data[0].total_reservations))
            await console.log(data[0]);
            if (data[0] == undefined) {
                 setIsAvailable(false)
                 setAvailableReservations(0)
            }
            if(data[0] != undefined){
                setAvailableReservations((data[0].max_reservation) - parseInt(data[0].total_reservations))

            }

        } catch (err) { throw err }
    }
    console.log(availableReservations);

    useEffect(() => {
        (async () => {
            await getMealById();
            await getAvailableReservationByMealId();
        })();
    }, []);


    return (
        <>
            <MealById mealById={mealById} availableReservations={availableReservations} />
            {isAvailable && <ReservationForm />}
            {!isAvailable && <div>No avalialble reservaions</div>}
        </>
    )
}