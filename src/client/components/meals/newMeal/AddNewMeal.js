import React, { useEffect, useState } from "react";
import "./addNewMeal.css"
import { fetchFromDb } from "../../../helper/fetch/fetch";
import { Button } from "react-bootstrap";

const AddNewMeal = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [location, setLocation] = useState();
  const [maxReservation, setMaxReservation] = useState();
  const [price, setPrice] = useState();
  const [date, setDate] = useState(new Date())
  const [isAddNewMeal, setIsAddNewMeal] = useState(true);

  const newMeal = async (e) => {
    try {
      e.preventDefault();

      const res = await fetchFromDb("/meals", "post",
        { title, description, location, maxReservation, price, date, imageUrl }
      )
      if(res.ok)console.log("OOOOKKKK");
      console.log("clicked" + title);
      console.log(res);
      eraseInputs()
    } catch (error) {
      throw res.statusText;
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

  return (
    <>
      {isAddNewMeal &&
        < div className='add-new-meal-container'>
          <h3>Add your meal here</h3>

          <div className='add-new-meal-fourm'>
            <form onSubmit={newMeal} >
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
                type="text"
                minLength="2"
                required
              />
              <hr />
              <textarea
              value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="description"
                rows="4"
                cols="23"
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
              <input
              value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image Url"
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
              <div className="d-grid gap-2">
                <Button type="submit" variant="secondary" size="lg">
                  Add New Meal
                </Button>
              </div>
            </form >
          </div>
        </div>
      }
      {/* Miss functionality for this part */}

      {/* {!isAddNewMeal && <div className="add-meal-message">Thanks for adding new meal
        <GoHome />
      </div>} */}
    </>
  );
};

export default AddNewMeal;
