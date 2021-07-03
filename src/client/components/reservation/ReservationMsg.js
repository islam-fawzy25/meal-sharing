import  { useHistory } from "react-router-dom";
import React from "react";


function ReservationMsg() {
  const history = useHistory();

  function handleClick() {
    history.push("/");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}

export default ReservationMsg