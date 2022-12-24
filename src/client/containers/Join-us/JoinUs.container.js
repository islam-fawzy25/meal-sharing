import React, { useEffect, useState } from "react";
import AddNewMeal from "../../components/Meals/NewMeal/AddNewMeal.component";
import "./JoinUs.style.css"
import GenaricButton from "../../components/GenericButton/GenericButton.component";
import { fetchFromDb } from "../../helper/fetch/fetch";
export default function JoinUS() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [location, setLocation] = useState();
    const [maxReservation, setMaxReservation] = useState();
    const [price, setPrice] = useState();
    const [date, setDate] = useState(new Date())
    const [newMealCreated, setNewMealCreated] = useState(false);

    const newMeal = async (e) => {
        try {
            e.preventDefault();
            const res = await fetchFromDb("/meals", "post",
                { title, description, location, maxReservation, price, date, imageUrl }
            )
            if (res.ok) {
                setNewMealCreated(true)
                eraseInputs()
                return
            }
            return
        } catch (error) {
            throw error;
        }
    };

    const eraseInputs = () => {
        setTitle("")
        setDescription("")
        setImageUrl("")
        setLocation("")
        setMaxReservation("")
        setPrice("")
    }
    const handleOnClick = () => {
        setNewMealCreated(false)
    }
    return (
        <div className="join-us-container">
            <div className="why-you-join-us">
                <h2>Why You join us?</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nam eget velit vel nulla rutrum commodo. In mattis dolor in sem
                    tincidunt pulvinar. Morbi vestibulum dictum vulputate. Morbi et neque
                    vitae metus consequat feugiat. Vestibulum vestibulum feugiat convallis.
                    Morbi tempus risus in vulputate tempus. Curabitur sem neque, faucibus et
                    tincidunt non, lobortis eget velit. Quisque vel magna leo.
                    Duis odio erat, feugiat vel ipsum quis, pulvinar ornare dui.
                </p>
            </div>
            <div>
                {
                    newMealCreated &&
                    <div className="new-meal-created-message-container">
                        <div className="new-meal-created-message">Your new meal was created successfully </div> <br />
                        <div className="create-new-meal">
                            <GenaricButton title="Create new meal" handleOnClick={handleOnClick} />
                        </div>
                    </div>
                }

                {!newMealCreated &&
                    <AddNewMeal
                        title={title} setTitle={setTitle}
                        description={description} setDescription={setDescription}
                        imageUrl={imageUrl} setImageUrl={setImageUrl}
                        location={location} setLocation={setLocation}
                        maxReservation={maxReservation} setMaxReservation={setMaxReservation}
                        price={price} setPrice={setPrice}
                        date={date} newMeal={newMeal}
                        newMealCreated={newMealCreated} setNewMealCreated={setNewMealCreated}
                        handleOnClick={handleOnClick}
                    />
                }
            </div>
        </div>
    )
}