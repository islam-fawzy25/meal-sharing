import React, { useState, useEffect ,useContext} from "react";
import { Data } from "../../App";

const FetchAvaliableReservations = () => {
const  {
    setAvailableMeals,
    availableMeals,
    setAvailable,
    available,
    idMeal,
  } = useContext(Data)

  const getAvailableMeals = async () => {
    const fetchFun = await fetch(
      "http://localhost:5000/api/meals?availableReservations=true"
    );
    const response = await fetchFun.json();
    setAvailableMeals(response);
  };

  useEffect(() => {
    getAvailableMeals();
  }, []);

  return <></>;
};

export default FetchAvaliableReservations;
