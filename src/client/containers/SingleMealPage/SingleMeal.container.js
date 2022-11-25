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
            console.log(response);
            if (response.ok) {
                setIsReserved(true)
                eraseReservationInputs()
            }
        } catch (error) {
            throw error;
        }
    };
    const  handleOnClick =()=>{setIsReserved(false)}
    useEffect(() => {
        (async () => {
            await getMealById();
            await getAvailableReservationByMealId();
        })();
    }, [isReserved]);

    return (
        <>
            <MealById mealById={mealById} availableReservations={availableReservations} />
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
            />}
            {!isAvailable && <div>No avalialble reservaions</div>}
        </>
    )
}