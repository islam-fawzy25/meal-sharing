import { useHistory } from "react-router-dom";
import React from "react";

function GoHome() {
  const history = useHistory();

  function handleClick() {
    history.push(`/${endpoint}`);
  }

  return (
    <>
      <button type="button" onClick={handleClick}>
        Go home
      </button>
    </>
  );
}
export default GoHome;