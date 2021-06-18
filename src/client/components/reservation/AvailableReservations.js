import React,{ useEffect } from "react";


const FetchAvaliableReservations = ({
  setAvailableMeals,
}) => {
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
