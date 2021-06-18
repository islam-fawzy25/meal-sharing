import React from "react";
import { useEffect, useState } from "react";

const AddNewMeal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location,setLocation] = useState('')
  const [maxReservation, setMaxReservation] = useState(0);
  const [price, setPrice] = useState(0);

  const newMeal = async () => {
    try {
      await fetch("http://localhost:5000/api/meals", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          location:location,
          maxReservation: maxReservation,
          price: price,
        }),
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    newMeal();
  }, []);

  return (
    <>
      <h3>Add your meal here</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        type="text"
      />
      <hr />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
        type="text"
      />
      <hr />
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        type="text"
      />
      <hr />
      <label id="maxReservation">Maximum Reservation: </label>
      <br />
      <input
        for="maxReservation"
        value={maxReservation}
        onChange={(e) => setMaxReservation(e.target.value)}
        placeholder="max reservation"
        type="number"
      />
      <hr />
      <label id="pric">Price: </label> <br />
      <input
        for="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
        type="number"
      />
      <hr />
      <button onClick={newMeal}> Add </button>
    </>
  );
};

export default AddNewMeal;
