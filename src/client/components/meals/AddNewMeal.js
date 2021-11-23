import React from "react";
import { useEffect, useState } from "react";

const AddNewMeal = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [maxReservation, setMaxReservation] = useState();
  const [price, setPrice] = useState();
  const [isAddNewMeal, setIsAddNewMeal] = useState();

  const newMeal = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("/api/meals", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          location: location,
          maxReservation: maxReservation,
          price: price,
          created_date: new Date(),
        }),
      });
      setIsAddNewMeal(response.ok)
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {!isAddNewMeal &&
        < div className='add-new-meal-container'>
          <div className='add-new-meal-fourm'>
            <h3>Add your meal here</h3>
            <form onSubmit={newMeal}>
              <input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
                type="text"
                minLength="2"
                required
              />
              <hr />
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                placeholder="description"
                rows="4"
                cols="10"
                required
              />
              <hr />
              <input
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                type="text"
                minLength="4"
                required
              />
              <hr />
              <label id="maxReservation">Maximum Reservation: </label>
              <br />
              <input
                htmlFor="maxReservation"
                onChange={(e) => setMaxReservation(e.target.value)}
                placeholder="max reservation"
                type="number"
                min="1"
                required
              />
              <hr />
              <label id="pric">Price: </label> <br />
              <input
                htmlFor="price"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="price"
                type="number"
                minLength="2"
                min="10"
                required
              />
              <hr />
              <button > Add </button>
            </form >
          </div>
        </div>
      }
      {isAddNewMeal && <div className="add-meal-message">Thanks for adding new meal </div>}
    </>
  );
};

export default AddNewMeal;
