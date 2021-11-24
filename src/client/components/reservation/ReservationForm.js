import React, { useState, useContext } from "react";
import { Data } from "../../App";
import "./reservations.css";
import GoHome from "./GoHomeComponent";

const ReservationForm = () => {
  const { available, idMeal } = useContext(Data);
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [resNumber, setResNumber] = useState();
  const [isReserv, setIsReserv] = useState();
console.log(idMeal);
  const newReservation = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("/api/reservations", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phonenumber: phone,
          name: name,
          email: email,
          mealId: idMeal.id,
          created_date: date,
          resNumber: resNumber,
        }),
      });
      setIsReserv(response.ok);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {available && !isReserv &&
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
                onChange={(e) => setResNumber(e.target.value)}
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
      {isReserv && <div className="reservation-message">
        <div >Thanks for reservation</div> <br/>
        <GoHome/>
      </div>}
    </>
  );
};

export default ReservationForm;

