import React, { useEffect, useState, useContext } from "react";
import FetchAvaliableReservations from "./AvailableReservations";
import { Data } from "../../App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton, Form, Button } from "react-bootstrap";
import MealById from "../meals/MealById";
import ReservationMsg from "./ReservationMsg";
import "./reservations.css";

const ReservationForm = () => {
  const { available, idMeal, availableMeals } = useContext(Data);
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [resNumber, setResNumber] = useState();
  const [isReserv, setIsReserv] = useState();

  const newReservation = async () => {
    try {
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

      // if (isReserv.ok) {return (<div>thanks for reservation</div>)
      // } else {
      //   (" Reservation faild try a gain later");
      // }
      //

      console.log(response);
    } catch (error) {
      throw error;
    }
  };

  ///!!!!!! how to check if the reservation form is sent and render message
  // whatever message in newpage with back to meal or back home
  // we have error from backend reservation : " created_date cannot be null " ??
  const checkReservation = () => {
    if (newReservation) {
      alert("Thanks for your reservation");
    }
  };

  // useEffect(() => {
  //   newReservation();
  // }, []);

  return (
    <>
      {available ? (
        <div className="reservationForm-container">
          <div
            className="reservationForm"
            style={{ visibility: available ? "visible" : "hidden" }}
          >
            <Form>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  minLength="2"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  minLength="8"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your number"
                  onChange={(e) => setPhone(e.target.value)}
                  minLength="6"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Apartment, studio, or floor"
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Row>
                <Form.Group controlId="formGridCity">
                  <Form.Label>Number of gustes</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Number of reservation"
                    onChange={(e) => setResNumber(e.target.value)}
                    min="1"
                    minLength="1"
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  newReservation();
                }}
              >
                Make Reservation
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <h1 className='no-reservation-message'> no available reservation </h1>
      )}
    </>
  );
};

export default ReservationForm;

// in future i want make that user can check his reservation
//and can delete it or confirm it
// i want improve this Go home
