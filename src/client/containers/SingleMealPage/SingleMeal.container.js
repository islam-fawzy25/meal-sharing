// new feature// new endpoint for checking the available reservation for choosen date for single meal
// if not available reservation return error message frontend and avalible number of meals on that day

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SinglePage.style.css"
import { fetchFromDb } from "../../helper/fetch/fetch";
import ReservationForm from "../../components/Reservations/ReservationForm.component";
import MealById from "../../components/Meals/MealById/MealById.component";
import SimpleRating from "../../components/Reviews/getReviews/rating.component"

export default function SingleMealPage() {
    const param = useParams();
    const [mealById, setMealById] = useState({})
    const [availableReservations, setAvailableReservations] = useState([])
    const [isAvailable, setIsAvailable] = useState(true)

    const getMealById = async () => {
        try {
            const data = await fetchFromDb(`/meals/${Number(param.id)}`, "get")
            setMealById(data)
        } catch (err) { throw err }
    }

    const getAvailableReservationByMealId = async () => {
        try {
            const data = await fetchFromDb(`/reservations/availableReservationsForSingleMealToday/${Number(param.id)}`, "get")
            if (data[0] == undefined) {
                const data = await fetchFromDb(`/meals/${Number(param.id)}`, "get")
                setAvailableReservations(data.max_reservation)
            }
            if (data[0] != undefined) {
                setAvailableReservations((data[0].max_reservation) - parseInt(data[0].total_reservations))
            }
        } catch (err) { throw err }
    }

    // reservation form
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [date, setDate] = useState();
    const [guestsNumber, setGuestsNumber] = useState();
    const [isReserved, setIsReserved] = useState(false);
    const mealId = Number(param.id)

    const eraseReservationInputs = () => {
        setDate("")
        setEmail("")
        setGuestsNumber("")
        setName("")
        setPhone("")
    }

    const newReservation = async (e) => {
        try {
            e.preventDefault();
            const response = await fetchFromDb("/reservations", "post", { phone, name, email, mealId, date, guestsNumber })
            if (response.ok) {
                setIsReserved(true)
                eraseReservationInputs()
            }
        } catch (error) {
            throw error;
        }
    };

    const handleOnClick = () => { setIsReserved(false) }

    useEffect(() => {
        (async () => {
            await getMealById();
            await getAvailableReservationByMealId();

        })();
    }, [setIsReserved, isReserved]);

    return (
        <div className="single-meal-container">
            <div className="meal-card">
                <MealById mealById={mealById} availableReservations={availableReservations} >
                    <div className="rating-component">
                        <SimpleRating mealId={Number(param.id)} />
                    </div>
                </MealById>
            </div>

            {isAvailable && <ReservationForm
                newReservation={newReservation}
                phone={phone}
                setPhone={setPhone}
                email={email}
                setEmail={setEmail}
                name={name}
                setName={setName}
                date={date}
                setDate={setDate}
                guestsNumber={guestsNumber}
                setGuestsNumber={setGuestsNumber}
                isReserved={isReserved}
                setIsReserved={setIsReserved}
                handleOnClick={handleOnClick}
                availableReservations={availableReservations}
            />}
            {!isAvailable && <div>No avalialble reservaions</div>}
        </div>
    )
}