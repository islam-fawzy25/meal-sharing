// need pop-up message aftrer unactivated function run => go back to meals page
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SinglePage.style.css"
import { fetchFromDb } from "../../helper/fetch/fetch";
import ReservationForm from "../../components/Reservations/ReservationForm.component";
import MealById from "../../components/Meals/MealById/MealById.component";
import SimpleRating from "../../components/Reviews/GetReviews/Rating.component"
import PostReviewForm from "../../components/Reviews/PostReview/ReviewPostForm/ReviewPostForm.component"
import { postMethod, getMethod } from "../../helper/fetch/fetchMethods";
import useGet from "../../helper/useGet";

export default function SingleMealPage() {
    const param = useParams();
    const mealId = Number(param.id)
    // reservation form
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState(); 
    const [name, setName] = useState();
    const [date, setDate] = useState();
    const [guestsNumber, setGuestsNumber] = useState();
    const [isReserved, setIsReserved] = useState(false);
    const [availableReservations, setAvailableReservations] = useState([])
    const [isAvailable, setIsAvailable] = useState(true)

    const { data: mealById, error, loading } = useGet(`/api/meals/${Number(param.id)}`)

        // need to handle after meal diactivated ->  go back to meals page
    const switchMealActivation = async () => {
        try {
            const response = await fetch(`/api/meals/${Number(param.id)}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            console.log(response);
            return response
        } catch (error) {
            throw error
        }
    }
    // need to handle after meal deleted ->  go back to meals page
    const deleteMeal = async () => {
        try {
            const response = await fetch(`/api/meals/${Number(param.id)}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            console.log(response);
            return response
        } catch (error) {
            throw error
        }
    }
    const getAvailableReservationByMealId = async () => {
        try {
            const { data, error, status } = await getMethod(`/api/meal-reservations/available-reservations-single-meal-today/${Number(param.id)}`)
            const maxReservation = data[0].max_reservation
            const totalReservations = data[0].total_reservations === undefined ? 0 : data[0].total_reservations
            maxReservation - totalReservations == 0 ? setIsAvailable(false) : setIsAvailable(true)
            return setAvailableReservations(maxReservation - totalReservations)
        } catch (err) { throw err }
    }

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
            const { data, error, status } = await postMethod("/api/reservations",
                { phone, name, email, mealId, date, guestsNumber })
            if (error) { return setIsReserved(false) }
            setIsReserved(true)
            return eraseReservationInputs()
        } catch (error) {
            setIsReserved(false)
            throw error;
        }
    };

    const handleOnClick = () => { setIsReserved(false) }
    // Review form
    const [reviewTitle, setReviewTitle] = useState();
    const [reviewDescription, setReviewDescription] = useState();
    const [reviewUserEmail, setReviewUserEmail] = useState();
    const [reviewUserName, setReviewUserName] = useState();
    const [reviewDate, setReviewDate] = useState();
    const [reviewStars, setReviewStars] = useState();
    const [isReviewed, setIsReviewed] = useState(false);

    const newReview = async (e) => {
        try {
            e.preventDefault();
            const { data: response, error, status } = await postMethod("/api/reviews", {
                reviewTitle, reviewDescription, reviewUserEmail, mealId, reviewUserName, reviewStars
            })
            if (error) { return setIsReviewed(false) }
            setIsReviewed(true)
            return eraseReviewsInputs()
        } catch (error) {
            setIsReviewed(false)
            throw error
        }
    }
    const eraseReviewsInputs = () => {
        setReviewTitle("")
        setReviewDescription("")
        setReviewUserEmail("")
        setReviewUserName("")
        setReviewStars("")
    }
    const handleReviewOnClick = () => { setIsReviewed(false) }

    useEffect(() => {
        (async () => {
            await getAvailableReservationByMealId();
        })();
    }, [isReserved]);

    return (
        <div className="single-meal-container">
            <div className="meal-by-id-card">
                {error && <h1>Error!</h1>}
                {loading && <h1>Loading...</h1>}
                {!error && mealById &&
                    <>
                        <MealById mealById={mealById} availableReservations={availableReservations} >
                            <div className="rating-component">
                                <SimpleRating mealId={Number(param.id)} />
                            </div>
                        </MealById>
                        <button >Edit</button>
                        <button onClick={() => { switchMealActivation() }}>Deactive</button>
                        <button onClick={() => { deleteMeal() }}>Delete</button>

                    </>
                }
            </div>
            <div>
                <div>
                    {!error && isAvailable && <ReservationForm
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
                    {!isAvailable && <h2>No avalialble reservaions</h2>}
                </div>
                <div>
                    {!error &&
                        <PostReviewForm
                            isReviewed={isReviewed}
                            setIsReviewed={setIsReviewed}
                            handleReviewOnClick={handleReviewOnClick}
                            newReview={newReview}
                            reviewTitle={reviewTitle}
                            setReviewTitle={setReviewTitle}
                            reviewDescription={reviewDescription}
                            setReviewDescription={setReviewDescription}
                            reviewUserEmail={reviewUserEmail}
                            setReviewUserEmail={setReviewUserEmail}
                            reviewUserName={reviewUserName}
                            setReviewUserName={setReviewUserName}
                            reviewStars={reviewStars}
                            setReviewStars={setReviewStars}
                        />}
                </div>
            </div>
        </div>
    )
}