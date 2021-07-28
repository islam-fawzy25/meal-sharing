import React from "react";
import { useEffect, useState } from "react";

const AddNewMeal = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [maxReservation, setMaxReservation] = useState();
  const [price, setPrice] = useState();

  const newMeal = async () => {
    try {
      await fetch("/api/meals", {
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
          created_date:new Date(),
        }),
      });
    } catch (error) {
      throw error;
    }
  };

  // useEffect(() => {
  //   newMeal();
  // }, []);

  return (
    < div className='add-new-meal-container'>
      <div className='add-new-meal-fourm'>
      <h3>Add your meal here</h3>
      <form>

    
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        type="text"
        minLength="2"
        required
      />
      <hr />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
        type="text"
        minLength="8"
        required
      />
      <hr />
      <input
        value={location}
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
        value={maxReservation}
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
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
        type="number"
        minLength="2"
        min="10"

        required
      />
      <hr />
      <button onClick={newMeal}> Add </button>
      </form >
      </div>
    </div>
  );
};

export default AddNewMeal;
