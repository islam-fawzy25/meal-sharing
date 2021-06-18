import React from "react";
import { useEffect, useState } from "react";
import FetchAvaliableReservations from "./AvailableReservations";

const ReservationForm = ({
  idMeal,
  setAvailableMeals,
  availableMeals,
  available,
  setAvailable,
}) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const newReservation = async () => {
    try {
      await fetch("http://localhost:5000/api/reservations", {
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
        }),
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    newReservation();
  }, []);

  return (
    <div style={{ visibility: available ? "visible" : "hidden" }}>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <hr />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <hr />
      <input
        type="number"
        placeholder="Phone"
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <hr />
      <button onClick={newReservation}>Make Reservation</button>
      <FetchAvaliableReservations
        newReservation={newReservation}
        availableMeals={availableMeals}
        setAvailableMeals={setAvailableMeals}
        idMeal={idMeal}
        available={available}
        setAvailable={setAvailable}
      />
    </div>
  );
};

export default ReservationForm;
