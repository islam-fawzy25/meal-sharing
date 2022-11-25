import React, { useState } from "react";
import "./reservations.css";
import { fetchFromDb } from "../../helper/fetch/fetch";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import GoHome from "../../helper/GoHomeComponent"

const ReservationForm = ({newReservation,phone, setPhone,
  email, setEmail,
  name, setName,
  date,setDate,
  guestsNumber, setGuestsNumber,
  isReserved, setIsReserved
}) => {

  // Get today date to disable user for making reservations on date < todaydate
  const newDate = new Date()
  const DD = newDate.getDate().toString()
  const MM = (newDate.getMonth() + 1).toString()
  const YYYY = newDate.getFullYear().toString()
  const todayDate = YYYY + "-" + MM + "-" + DD


  console.log(todayDate);



  return (
    <>
          {isReserved && <div className="reservation-message">
        <div >Thanks for reservation</div> <br />
        <GoHome />
      </div>}
      {!isReserved && 
      <div className={`reservation-form-container`} >
        <div className="reservation-form" >
          <form onSubmit={newReservation}>
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
              min={new Date()}
            // pattern="\d{4}-\d{2}-\d{2}"
            />
            <hr />
            <input
              value={guestsNumber}
              onChange={(e) => setGuestsNumber(e.target.value)}
              placeholder="Number of reservation"
              type="number"
              min="1"
              // max="1" it should be the available reservations number
              required
            />
            <hr />
            <div className="d-grid gap-2">
              <Button type="submit" variant="secondary" size="lg">
                Book your seat
              </Button>
            </div>
          </form >
        </div>
      </div>
    }
      {/* need functionality for this parts 
    {!available && <h1 className='no-reservation-message'> no available reservation </h1>
      } */}

    </>
  );
};

export default ReservationForm;

