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
// !!! it's better here to use function not component right ???? 
// reusable function with url parameter
  const getAvailableMeals = async () => {
    const fetchFun = await fetch(
      "/api/meals?availableReservations=true"
    );
    const response = await fetchFun.json();
    console.log(response);
    setAvailableMeals(response);
  };

  useEffect(() => {
    getAvailableMeals();
  }, []);
console.log( availableMeals);
  return <></>;
};

export default FetchAvaliableReservations;
