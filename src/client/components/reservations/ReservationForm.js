import React, { useState } from "react";
import "./reservations.css";
import { fetchFromDb } from "../../helper/fetch/fetch";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import GoHome from "../../helper/GoHomeComponent"

const ReservationForm = () => {
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [guestsNumber, setGuestsNumber] = useState();
  const [isReserved, setIsReserved] = useState(false);

  const param = useParams()
  const mealId = Number(param.id)

  const eraseReservationInputs = () => {
    setDate("")
    setEmail("")
    setGuestsNumber("")
    setName("")
    setPhone("")
  }

  const newReservation = async (e) => {
    try {
      e.preventDefault();
      const response = await fetchFromDb("/reservations", "post", { phone, name, email, mealId, date, guestsNumber })
      console.log(response);
      if(response.ok){
        setIsReserved(true)
        eraseReservationInputs()

      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className={`reservation-form-container`} >
        <div className="reservation-form" >
          <form onSubmit={newReservation}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              type="text"
              minLength="2"
              required
            />
            <hr />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              type="text"
              minLength="8"
              required
            />
            <hr />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your number"
              type="text"
              minLength="6"
              required
            />
            <hr />
            <br />
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              required
              pattern="\d{4}-\d{2}-\d{2}"
            />
            <hr />
            <input
              value={guestsNumber}
              onChange={(e) => setGuestsNumber(e.target.value)}
              placeholder="Number of reservation"
              type="number"
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

       {/* need functionality for this parts 
    {!available && <h1 className='no-reservation-message'> no available reservation </h1>
      } */}
      {isReserved && <div className="reservation-message">
        <div >Thanks for reservation</div> <br />
        <GoHome />
      </div>} 
    </>
  );
};

export default ReservationForm;

