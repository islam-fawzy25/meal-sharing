import React, { useState, useEffect ,useContext} from "react";
import { Data } from "../../App";
import useFetch from "../UseFetch";
const FetchAvaliableReservations = () => {
const  {
    setAvailableMeals,
    availableMeals,
 
  } = useContext(Data)


  const {data,error,ispending}=useFetch("/api/meals?availableReservations=true")

  useEffect(() => {
    // getAvailableMeals();
       setAvailableMeals(data);

  }, [data]);

  return (

    <div>
  {error && <div>{error}</div>}
  {ispending && <div>Loading...</div>}

    </div>
  )

};

export default FetchAvaliableReservations;
