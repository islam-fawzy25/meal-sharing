import React, { useState, useContext, useEffect } from "react";
import { Data } from "../../App";
import "./reservations.css";
import GoHome from "../GoHomeComponent";
import postData from "../usePost";
import { fetchFromDb } from "../../containers/fetch/fetch";

const ReservationForm = () => {
  const { available, idMeal, availableSeats } = useContext(Data);
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [guestsNumber, setGuestsNumber] = useState();
  const mealId = idMeal.id
  const [isReserv, setIsReserv] = useState(true);

  const newReservation = async (e) => {
    try {
      // check if number of reservations is availabil or not 
      // if (availableSeats<resNumber) {  
      // }   

      const response = await postData("/api/reservations", { phone, name, email, mealId, date, guestsNumber })
      setIsReserv(response.ok);
     // const data = await fetchFromDb("/reservations", "post", { phone, name, email, mealId, date, guestsNumber })
      return e.preventDefault();
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {available && isReserv &&
        <div className={`reservation-form-container`} >
          <div className="reservation-form" >
            <form onSubmit={newReservation}>
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                type="text"
                minLength="2"
                required
              />
              <hr />
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                type="text"
                minLength="8"
                required
              />
              <hr />
              <input
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your number"
                type="text"
                minLength="6"
                required
              />
              <hr />
              <br />
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                required
                pattern="\d{4}-\d{2}-\d{2}"
              />
              <hr />
              <input
                onChange={(e) => setGuestsNumber(e.target.value)}
                placeholder="Number of reservation"
                type="number"
                required
              />
              <hr />
              <button > Book your seat</button>
            </form >
          </div>
        </div>
      }
      {!available && <h1 className='no-reservation-message'> no available reservation </h1>
      }
      {!isReserv && <div className="reservation-message">
        <div >Thanks for reservation</div> <br />
        <GoHome />
      </div>}
    </>
  );
};

export default ReservationForm;

