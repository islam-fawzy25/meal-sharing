// need to refactor this to be meal form dump component so i can use it for create and edit the meal too 
// Sumbit button component to update and create  forms
// date should be handle as today date  at backend endpoint
import React, { useEffect, useState } from "react";
import "./AddNewMeal.style.css"
import { Button } from "react-bootstrap";

const AddNewMeal = ({
  title, setTitle,
  description, setDescription,
  imageUrl, setImageUrl,
  location, setLocation,
  maxReservation, setMaxReservation,
  price, setPrice,
  date, newMeal,
  newMealCreated, setNewMealCreated,
  handleOnClick
}) => {

  return (
    <>
      < div className='add-new-meal-container'>
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

    </>
  );
};

export default AddNewMeal;
