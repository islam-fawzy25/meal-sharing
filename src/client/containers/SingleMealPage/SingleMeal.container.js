// new feature// new endpoint for checking the available reservation for choosen date for single meal
// if not available reservation return error message frontend and avalible number of meals on that day

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SinglePage.style.css"
import { fetchFromDb } from "../../helper/fetch/fetch";
import ReservationForm from "../../components/Reservations/ReservationForm.component";
import MealById from "../../components/meals/MealById/MealById.component";
import SimpleRating from "../../components/reviews/getReviews/rating.component"
import PostReviewForm from "../../components/reviews/postReview/reviewPostForm/ReviewPostForm.component"

export default function SingleMealPage() {
    const param = useParams();
    const mealId = Number(param.id)
    const [mealById, setMealById] = useState({})

    // reservation form
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [date, setDate] = useState();
    const [guestsNumber, setGuestsNumber] = useState();
    const [isReserved, setIsReserved] = useState(false);
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
            const response = await fetchFromDb("/reviews", "post", {
                reviewTitle, reviewDescription,reviewUserEmail, mealId, reviewUserName, reviewStars
            })
            if (response.ok) {
                setIsReviewed(true)
                eraseReviewsInputs()
            }
        } catch (error) {
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
            await getMealById();
            await getAvailableReservationByMealId();

        })();
    }, [setIsReserved, isReserved]);

    return (
        <div className="single-meal-container">
            <div className="meal-by-id-card">
                <MealById mealById={mealById} availableReservations={availableReservations} >
                    <div className="rating-component">
                        <SimpleRating mealId={Number(param.id)} />
                    </div>
                </MealById>
            </div>
            <div>
                <div>
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
                <div>
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
                    />
                </div>
            </div>
        </div>
    )
}