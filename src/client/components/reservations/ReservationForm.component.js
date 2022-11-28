import React, { useState } from "react";
import "./ReservationsForm.style.css";
import { fetchFromDb } from "../../helper/fetch/fetch";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import GenaricButton from "../GenericButton/GenericButton.component"

const ReservationForm = ({ newReservation, phone, setPhone,
  email, setEmail,
  name, setName,
  date, setDate,
  guestsNumber, setGuestsNumber,
  isReserved, setIsReserved,
  handleOnClick,
  availableReservations
}) => {


  const newDate = new Date()
  const DD = newDate.getDate().toString()
  const MM = (newDate.getMonth() + 1).toString()
  const YYYY = newDate.getFullYear().toString()
  const todayDate = YYYY + "-" + MM + "-" + DD

  return (
    <div className={`reservation-form-container`} >
      {isReserved && <div className="reservation-message">
        <div >Thanks for reservation</div> <br />
        <GenaricButton title="Make new reservation" handleOnClick={handleOnClick} />
      </div>}
      {!isReserved &&
        <div className="reservation-form" >
          <form onSubmit={newReservation}>
            <h3>Make reservation</h3>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              type="text"
              minLength="2"
              maxLength="25"

              required
            />
            <hr />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              type="email"
              required
            />
            <hr />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your number"
              type="text"
              minLength="6"
              maxLength="15"
              required
            />
            <hr />
            <br />
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              required
              min={todayDate}
            />
            <hr />
            <input
              value={guestsNumber}
              onChange={(e) => setGuestsNumber(e.target.value)}
              placeholder="Number of reservation"
              type="number"
              min="1"
              max={availableReservations}
              required
            />
            <hr />
            <div className="d-grid gap-2 ">
              <Button type="submit" variant="secondary" size="lg">
                Book your seat
              </Button>
            </div>
          </form >
        </div>
      }


    </div>
  );
};

export default ReservationForm;

